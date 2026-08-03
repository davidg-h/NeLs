# Unified Experiment Runner - Usage Guide

## Overview

The experiment runner is the repository's official non-interactive entrypoint for M1-M6 validation runs.

Primary entrypoint:

```bash
python poc/experiment_runner.py
```

All CLI aliases call the same runner implementation.

The runner has two modes:

- `--sr` / `--single-run`: execute exactly one method
- `--mr` / `--multi-run`: execute multiple methods in sequence

Both modes require a JSON config file.

## CLI

### Single Run

```bash
python poc/experiment_runner.py --sr M1 --config configs/full_gpu_profile/m1_full_gpu.json
```

### Multi Run

```bash
python poc/experiment_runner.py --mr M1 M2 M3 --config configs/full_gpu_profile/multi_run_full_gpu.json
```

## Config Schema

The runner uses a simple flat config with one shared pipeline section and one method block per method.

```json
{
  "output_root": "experiments/runs",
  "model_id": "black-forest-labs/FLUX.2-klein-base-4B",
  "device": "cuda",
  "torch_dtype": "float16",
  "log_level": "full",
  "pipeline": {
    "offload_mode": "group",
    "group_offload_type": "leaf_level",
    "group_use_stream": true,
    "group_low_cpu_mem_usage": false,
    "enable_text_encoder_group_offload": true,
    "text_encoder_group_offload_type": "block_level",
    "text_encoder_num_blocks_per_group": 1,
    "enable_vae_group_offload": true,
    "vae_group_offload_type": "leaf_level",
    "vae_num_blocks_per_group": 2,
    "enable_vae_slicing": true,
    "enable_vae_tiling": true,
    "enable_layerwise_casting": true,
    "layerwise_storage_dtype": "float8_e4m3fn",
    "layerwise_fallback_storage_dtype": "float16",
    "layerwise_compute_dtype": "float16",
    "enable_channels_last": true,
    "enable_xformers_attention": true,
    "enable_torch_compile": false,
    "compile_mode": "max-autotune",
    "compile_fullgraph": false,
    "disable_progress_bar": true
  },
  "methods": {
    "M1": {
      "prompt": "a high-detail mountain valley at sunrise",
      "seed": 123,
      "start_seed": 11,
      "end_seed": 77,
      "alphas": [0.0, 0.33, 0.66, 1.0],
      "height": 1024,
      "width": 1024,
      "num_inference_steps": 4,
      "guidance_scale": 0.0
    }
  }
}
```

### Required Top-Level Keys

- `output_root`: root directory for run folders, usually `experiments/runs`
- `torch_dtype`: dtype string such as `float16` or `bfloat16`
- `methods`: object keyed by method name

### Optional Top-Level Keys

- `model_id`: Hugging Face model id. If omitted, runner uses `MODEL_ID` from env, then default model.
- `device`: target device. If omitted, runner uses `DEVICE` from env, then `cuda`.
- `log_level`: `silent`, `minimal`, or `full`
- `hf_home`: custom Hugging Face cache root
- `pipeline`: shared pipeline settings passed through to the example scripts
- `metadata`: freeform notes for humans

### Method Blocks

Each method block contains only the parameters that method script understands.

Examples:

- `M1`, `M2`: `prompt`, `seed`, `start_seed`, `end_seed`, `alphas`, `height`, `width`, `num_inference_steps`, `guidance_scale`
- `M3`: `prompt`, `seed`, `seed_a`, `seed_b`, `trajectory_steps`, `trajectory_method`, `height`, `width`, `num_inference_steps`, `guidance_scale`
- `M4`: `prompt`, `anchor_seed_a`, `anchor_seed_b`, `walk_seed`, `scales`, `num_inference_steps`, `guidance_scale`
- `M5`: `prompt`, `seed`, `window_start`, `window_end`, `edit_scale`, `num_inference_steps`, `guidance_scale`
- `M6`: `prompt_a`, `prompt_b`, `seed`, `alphas`, `height`, `width`, `num_inference_steps`, `max_sequence_length`, `guidance_scale`

## Profiles

Ready-to-use templates live in:

- `configs/templates/m1_template.json`
- `configs/templates/m2_template.json`
- `configs/templates/m3_template.json`
- `configs/templates/m4_template.json`
- `configs/templates/m5_template.json`
- `configs/templates/m6_template.json`
- `configs/templates/multi_run_template.json`

These templates are directly usable or very close to usable.

## Logging

Every runner-launched run writes a full artifact set under its own `EX-XXXX/` directory.

Files written for each run:

- `config.json`: resolved run request
- `script_config.json`: exact config passed to the example script through `NELS_RUN_CONFIG`
- `full_log.txt`: command, timestamps, return code, stdout, stderr
- `stdout.txt`: captured script stdout
- `stderr.txt`: captured script stderr
- `samples.jsonl`: extracted per-image sample records
- `run_manifest.json`: summary metadata
- `images/`: generated images and the script's `quick_log.md`

The runner always captures stdout and stderr, even if the script itself uses a quieter log level.

## Output Structure

Each run folder is created under `output_root` and uses the `EX-XXXX` pattern:

```text
experiments/runs/
└── EX-0001/
    ├── config.json
    ├── script_config.json
    ├── full_log.txt
    ├── stdout.txt
    ├── stderr.txt
    ├── run_manifest.json
    ├── samples.jsonl
    └── images/
        ├── quick_log.md
        ├── m1_baseline.png
        ├── m1_lerp_alpha_0.00.png
        └── ...
```

## Examples

### Single Run, M1

```bash
python poc/experiment_runner.py --sr M1 --config configs/m1_template.json
```

### Multi Run, M1-M6

```bash
python poc/experiment_runner.py --mr M1 M2 M3 M4 M5 M6 --config configs/multi_run_template.json
```

### Multi Run with a Smaller Batch

```bash
python poc/experiment_runner.py --mr M1 M4 M6 --config configs/multi_run_template.json
```

## Direct Script Execution

The runner does not change how standalone scripts behave.

You can still run a script directly:

```bash
python poc/examples/navigation/m1_lerp_pipeline.py
```

Direct script execution still uses the script's own defaults unless `NELS_RUN_CONFIG` is set manually.

## Configuration Priority

The runner resolves settings in this order:

1. Selected method block from the config file
2. Shared `pipeline` block from the config file
3. Top-level runtime settings from the config file
4. Script defaults inside the example script

If the config file omits a value, the example script still falls back to its own default.

## Troubleshooting

### Missing Config

```bash
python poc/experiment_runner.py --sr M1
```

This errors because `--config` is required.

### Unsupported Mode

Use exactly one mode flag:

- `--sr` or `--single-run`
- `--mr` or `--multi-run`

### Missing Method Block

If a selected method is not present under `methods`, the runner stops before launching the script.

### Model Id Errors

If `model_id` is omitted in config, the runner resolves it from `MODEL_ID` in env. If that is also unset, it falls back to the default model id.

### Path Issues

Use paths relative to the repository root in the config, for example:

- `experiments/runs`
- `configs/templates/m1_template.json`

## Extending The Runner

To add a new method later:

1. Add the script path to `METHOD_TO_SCRIPT` in [poc/experiment_runner.py](poc/experiment_runner.py)
2. Add a new method block to the relevant config template(s)
3. Keep the method parameters in the config block aligned with the script's `resolve_run_config_value` keys
