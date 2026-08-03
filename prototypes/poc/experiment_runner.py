"""Config-driven runner for the M1-M6 validation scripts.

The runner stays intentionally small:
- CLI parsing selects single-run or multi-run mode.
- A human-readable JSON config provides shared runtime settings.
- Each selected method is launched as a separate run folder with full logs.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from dotenv import load_dotenv


METHOD_TO_SCRIPT: dict[str, str] = {
    "M1": "examples/navigation/m1_lerp_pipeline.py",
    "M2": "examples/navigation/m2_slerp_pipeline.py",
    "M3": "examples/navigation/m3_seed_trajectory_pipeline.py",
    "M4": "examples/navigation/m4_delta_walk_pipeline.py",
    "M5": "examples/callbacks/m5_time_window_edit_pipeline.py",
    "M6": "examples/semantic/m6_embedding_interpolation_pipeline.py",
}

VALID_METHODS = tuple(METHOD_TO_SCRIPT)
RUN_ID_PREFIX = "EX"
DEFAULT_OUTPUT_ROOT = "experiments/runs"
DEFAULT_MODEL_ID = "black-forest-labs/FLUX.2-klein-base-4B"
DEFAULT_DEVICE = "cuda"
ALLOWED_TOP_LEVEL_KEYS = {
    "output_root",
    "model_id",
    "device",
    "torch_dtype",
    "hf_home",
    "log_level",
    "pipeline",
    "methods",
    "metadata",
}


def _repo_root() -> Path:
    """Resolve the repo root, robust to nesting depth"""
    shallow = Path(__file__).resolve().parents[1]
    if (shallow / ".git").exists():
        return shallow
    return Path(__file__).resolve().parents[2]


load_dotenv(_repo_root() / ".env")


def _poc_root() -> Path:
    return Path(__file__).resolve().parent


def _resolve_path(path_value: str | Path, *, base: Path | None = None) -> Path:
    candidate = Path(path_value)
    if candidate.is_absolute():
        return candidate.resolve()
    resolved_base = base if base is not None else _repo_root()
    return (resolved_base / candidate).resolve()


def _timestamp_utc() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def _load_json_file(path: Path) -> dict[str, Any]:
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise ValueError(f"Config at {path} must be a JSON object")
    return data


def _write_json_file(path: Path, payload: dict[str, Any]) -> None:
    path.write_text(json.dumps(payload, indent=2, sort_keys=True), encoding="utf-8")


def _next_run_id(runs_root: Path) -> str:
    runs_root.mkdir(parents=True, exist_ok=True)
    pattern = re.compile(rf"^{re.escape(RUN_ID_PREFIX)}-(\d{{4}})$")
    max_index = 0

    for child in runs_root.iterdir():
        if not child.is_dir():
            continue
        match = pattern.match(child.name)
        if match is None:
            continue
        max_index = max(max_index, int(match.group(1)))

    return f"{RUN_ID_PREFIX}-{max_index + 1:04d}"


def _resolve_mode(args: argparse.Namespace) -> str:
    if args.single_run:
        return "single-run"
    if args.multi_run:
        return "multi-run"
    raise ValueError("One of --single-run/--sr or --multi-run/--mr is required")


def _validate_config(config: dict[str, Any], config_path: Path) -> None:
    missing = [
        key for key in ("output_root", "torch_dtype", "methods") if key not in config
    ]
    if missing:
        raise ValueError(
            f"Config {config_path} is missing required keys: {', '.join(missing)}"
        )

    for key in config:
        if key not in ALLOWED_TOP_LEVEL_KEYS:
            raise ValueError(
                f"Config {config_path} contains unsupported top-level key {key!r}. "
                f"Allowed keys: {sorted(ALLOWED_TOP_LEVEL_KEYS)}"
            )

    if not isinstance(config["methods"], dict):
        raise ValueError(f"Config {config_path} must set methods as an object")

    pipeline = config.get("pipeline")
    if pipeline is not None and not isinstance(pipeline, dict):
        raise ValueError(
            f"Config {config_path} must set pipeline as an object when present"
        )

    log_level = config.get("log_level", "full")
    if log_level not in {"silent", "minimal", "full"}:
        raise ValueError(
            f"Config {config_path} has invalid log_level={log_level!r}; "
            "expected silent, minimal, or full"
        )


def _resolve_runtime_settings(config: dict[str, Any]) -> dict[str, Any]:
    """Resolve optional runtime settings from config, env vars, or defaults."""
    resolved = dict(config)

    resolved["model_id"] = str(
        config.get("model_id") or os.getenv("MODEL_ID") or DEFAULT_MODEL_ID
    )
    resolved["device"] = str(
        config.get("device") or os.getenv("DEVICE") or DEFAULT_DEVICE
    )

    return resolved


def _resolve_selected_methods(mode: str, methods: list[str]) -> list[str]:
    if mode == "single-run" and len(methods) != 1:
        raise ValueError("Single-run mode requires exactly one method")
    if mode == "multi-run" and len(methods) < 1:
        raise ValueError("Multi-run mode requires at least one method")
    return methods


def _resolve_method_script(method: str) -> Path:
    try:
        relative_script = METHOD_TO_SCRIPT[method]
    except KeyError as exc:
        raise ValueError(
            f"Unsupported method {method!r}. Expected one of {sorted(METHOD_TO_SCRIPT)}"
        ) from exc
    return _poc_root() / relative_script


def _read_quick_log(path: Path) -> list[dict[str, Any]]:
    if not path.exists():
        return []

    raw_text = path.read_text(encoding="utf-8")
    stripped = raw_text.lstrip()
    if stripped.startswith("{") or stripped.startswith("["):
        try:
            parsed = json.loads(raw_text)
        except Exception:
            return []
        if isinstance(parsed, list):
            return [item for item in parsed if isinstance(item, dict)]
        if isinstance(parsed, dict):
            return [parsed]
        return []

    lines = raw_text.splitlines()
    records: list[dict[str, Any]] = []
    index = 0

    def _parse_scalar(text: str) -> Any:
        value = text.strip()
        if not value:
            return ""
        if value in {"true", "false"}:
            return value == "true"
        try:
            if "." in value:
                return float(value)
            return int(value)
        except Exception:
            return value

    def _collect_json_block(start_index: int) -> tuple[Any, int]:
        block_lines: list[str] = []
        cursor = start_index
        while cursor < len(lines):
            candidate = lines[cursor]
            if candidate.startswith("## ") and block_lines:
                break
            if candidate.strip() == "" and block_lines:
                break
            block_lines.append(candidate)
            cursor += 1
        return json.loads("\n".join(block_lines)), cursor

    while index < len(lines):
        if lines[index].strip() != "## sample":
            index += 1
            continue

        index += 1
        record: dict[str, Any] = {"event": "sample"}
        while index < len(lines):
            current = lines[index].strip()
            if not current:
                index += 1
                break
            if current == "## sample":
                break
            if current == "params:":
                index += 1
                while index < len(lines) and not lines[index].strip():
                    index += 1
                if index < len(lines):
                    params, index = _collect_json_block(index)
                    record["params"] = params if isinstance(params, dict) else {}
                continue
            if ":" in current:
                key, value = current.split(":", 1)
                record[key.strip()] = _parse_scalar(value)
            index += 1

        records.append(record)

    return records


def _image_stats(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {"exists": False}

    try:
        from PIL import Image, ImageStat
    except Exception as exc:
        return {"exists": True, "error": f"Pillow unavailable: {exc}"}

    with Image.open(path) as image:
        rgb = image.convert("RGB")
        stats = ImageStat.Stat(rgb)
        return {
            "exists": True,
            "width": rgb.width,
            "height": rgb.height,
            "mean_rgb": [round(float(value), 4) for value in stats.mean],
            "std_rgb": [round(float(value), 4) for value in stats.stddev],
        }


def _extract_samples(images_dir: Path, quick_log_path: Path) -> list[dict[str, Any]]:
    quick_records = _read_quick_log(quick_log_path)
    samples: list[dict[str, Any]] = []

    for record in quick_records:
        if record.get("event") != "sample":
            continue

        image_name = str(record.get("image", ""))
        image_path = images_dir / image_name
        samples.append(
            {
                "timestamp_utc": record.get("timestamp_utc"),
                "label": record.get("label"),
                "image": image_name,
                "image_path": str(image_path),
                "elapsed_seconds": record.get("elapsed_seconds"),
                "params": record.get("params", {}),
                "image_stats": _image_stats(image_path),
            }
        )

    return samples


def _build_script_config(
    config: dict[str, Any],
    method: str,
    *,
    output_dir: Path,
) -> dict[str, Any]:
    method_config = config["methods"].get(method)
    if not isinstance(method_config, dict):
        raise ValueError(f"Config does not define a method block for {method}")

    shared_pipeline = config.get("pipeline")
    script_config: dict[str, Any] = {
        "output_dir": str(output_dir),
        "model_id": config["model_id"],
        "device": config["device"],
        "torch_dtype": config["torch_dtype"],
        "log_level": config.get("log_level", "full"),
    }

    if isinstance(shared_pipeline, dict) and shared_pipeline:
        script_config["pipeline"] = dict(shared_pipeline)

    for key, value in method_config.items():
        if key == "pipeline":
            raise ValueError(
                "Method blocks must not define a nested pipeline object; use the top-level pipeline section instead"
            )
        script_config[key] = value

    return script_config


def _write_run_artifacts(
    *,
    run_dir: Path,
    config_path: Path,
    method: str,
    mode: str,
    output_root: Path,
    script_config: dict[str, Any],
    script_config_path: Path,
    script_path: Path,
    process: subprocess.CompletedProcess[str],
    started_at: str,
    completed_at: str,
    elapsed_seconds: float,
) -> dict[str, Any]:
    images_dir = Path(script_config["output_dir"])
    quick_log_path = images_dir / "quick_log.md"
    samples = _extract_samples(images_dir, quick_log_path)

    samples_path = run_dir / "samples.jsonl"
    with samples_path.open("w", encoding="utf-8") as handle:
        for sample in samples:
            handle.write(json.dumps(sample, sort_keys=True) + "\n")

    method_summary: dict[str, Any] = {}
    m5_summary_path = images_dir / "m5_time_window_summary.json"
    if m5_summary_path.exists():
        try:
            parsed_summary = json.loads(m5_summary_path.read_text(encoding="utf-8"))
            if isinstance(parsed_summary, dict):
                method_summary = parsed_summary
        except Exception:
            method_summary = {}

    full_log_path = run_dir / "full_log.txt"
    full_log_path.write_text(
        "\n".join(
            [
                f"mode: {mode}",
                f"method: {method}",
                f"run_dir: {run_dir}",
                f"config_path: {config_path}",
                f"script: {script_path}",
                f"command: {sys.executable} {script_path}",
                f"started_at_utc: {started_at}",
                f"completed_at_utc: {completed_at}",
                f"elapsed_seconds: {elapsed_seconds:.4f}",
                f"return_code: {process.returncode}",
                f"script_config_path: {script_config_path}",
                "",
                "=== STDOUT ===",
                process.stdout or "",
                "",
                "=== STDERR ===",
                process.stderr or "",
            ]
        ),
        encoding="utf-8",
    )

    stdout_path = run_dir / "stdout.txt"
    stderr_path = run_dir / "stderr.txt"
    stdout_path.write_text(process.stdout or "", encoding="utf-8")
    stderr_path.write_text(process.stderr or "", encoding="utf-8")

    manifest = {
        "mode": mode,
        "method": method,
        "run_id": run_dir.name,
        "started_at_utc": started_at,
        "completed_at_utc": completed_at,
        "elapsed_seconds": round(float(elapsed_seconds), 4),
        "return_code": int(process.returncode),
        "command": [sys.executable, str(script_path)],
        "script": str(script_path),
        "config_path": str(config_path),
        "script_config_path": str(script_config_path),
        "output_root": str(output_root),
        "output_dir": str(images_dir),
        "quick_log_path": str(quick_log_path),
        "samples_path": str(samples_path),
        "stdout_path": str(stdout_path),
        "stderr_path": str(stderr_path),
        "sample_count": len(samples),
        "method_summary": method_summary,
    }

    manifest_path = run_dir / "run_manifest.json"
    _write_json_file(manifest_path, manifest)

    run_request = {
        "mode": mode,
        "method": method,
        "run_id": run_dir.name,
        "output_root": str(output_root),
        "output_dir": str(images_dir),
        "config_path": str(config_path),
        "script_path": str(script_path),
        "script_config_path": str(script_config_path),
        "resolved_script_config": script_config,
    }
    _write_json_file(run_dir / "config.json", run_request)

    return manifest


def _execute_method(
    config: dict[str, Any],
    *,
    method: str,
    mode: str,
    config_path: Path,
    output_root: Path,
) -> dict[str, Any]:
    run_id = _next_run_id(output_root)
    run_dir = output_root / run_id
    images_dir = run_dir / "images"
    run_dir.mkdir(parents=True, exist_ok=True)
    images_dir.mkdir(parents=True, exist_ok=True)

    script_path = _resolve_method_script(method)
    script_config = _build_script_config(config, method, output_dir=images_dir)
    script_config_path = run_dir / "script_config.json"
    _write_json_file(script_config_path, script_config)

    env = os.environ.copy()
    env["NELS_RUN_CONFIG"] = str(script_config_path)
    env["MODEL_ID"] = str(config["model_id"])
    env["DEVICE"] = str(config["device"])
    if config.get("hf_home") is not None:
        env["HF_HOME"] = str(config["hf_home"])

    started_at = _timestamp_utc()
    start_perf = time.perf_counter()
    process = subprocess.run(
        [sys.executable, str(script_path)],
        cwd=str(_poc_root()),
        env=env,
        capture_output=True,
        text=True,
    )
    elapsed_seconds = time.perf_counter() - start_perf
    completed_at = _timestamp_utc()

    manifest = _write_run_artifacts(
        run_dir=run_dir,
        config_path=config_path,
        method=method,
        mode=mode,
        output_root=output_root,
        script_config=script_config,
        script_config_path=script_config_path,
        script_path=script_path,
        process=process,
        started_at=started_at,
        completed_at=completed_at,
        elapsed_seconds=elapsed_seconds,
    )

    if process.returncode != 0:
        raise RuntimeError(
            f"Run {run_id} for {method} failed with return code {process.returncode}. "
            f"See {run_dir / 'full_log.txt'}"
        )

    return manifest


def build_arg_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Run M1-M6 validation scripts from a human-readable JSON config."
    )

    mode_group = parser.add_mutually_exclusive_group(required=True)
    mode_group.add_argument(
        "--single-run",
        "--sr",
        dest="single_run",
        action="store_true",
        help="Run exactly one method",
    )
    mode_group.add_argument(
        "--multi-run",
        "--mr",
        dest="multi_run",
        action="store_true",
        help="Run multiple methods in sequence",
    )

    parser.add_argument(
        "methods",
        nargs="+",
        choices=VALID_METHODS,
        help="Method or methods to execute",
    )
    parser.add_argument(
        "--config",
        type=Path,
        required=True,
        help="Path to the runner config JSON file",
    )

    return parser


def main() -> None:
    parser = build_arg_parser()
    args = parser.parse_args()

    mode = _resolve_mode(args)
    methods = [value.upper() for value in args.methods]
    _resolve_selected_methods(mode, methods)

    config_path = args.config.resolve()
    if not config_path.exists():
        parser.error(f"Config file not found: {config_path}")

    config = _load_json_file(config_path)
    _validate_config(config, config_path)
    config = _resolve_runtime_settings(config)

    output_root = _resolve_path(config["output_root"], base=_repo_root())
    output_root.mkdir(parents=True, exist_ok=True)

    manifests: list[dict[str, Any]] = []
    for index, method in enumerate(methods, start=1):
        manifest = _execute_method(
            config,
            method=method,
            mode=mode,
            config_path=config_path,
            output_root=output_root,
        )
        manifests.append(manifest)

        print(f"Run complete ({index}/{len(methods)}): {manifest['run_id']}")
        print(f"Method: {manifest['method']}")
        print(f"Samples: {manifest['sample_count']}")
        print(f"Run directory: {output_root / manifest['run_id']}")
        print(f"Manifest: {output_root / manifest['run_id'] / 'run_manifest.json'}")
        print(f"Full log: {output_root / manifest['run_id'] / 'full_log.txt'}")
        print()

    if len(manifests) > 1:
        total_samples = sum(int(item.get("sample_count", 0)) for item in manifests)
        print("=" * 60)
        print("Multi-run summary")
        print("=" * 60)
        print(f"Methods: {', '.join(item['method'] for item in manifests)}")
        print(f"Runs: {len(manifests)}")
        print(f"Total samples: {total_samples}")


if __name__ == "__main__":
    main()
