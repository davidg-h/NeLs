"""Auto-discovered facade exports for the helpers package.

This module exposes public functions from all non-private Python modules under
`helpers/` at package level, so callers can do:

    from helpers import some_function
"""

from __future__ import annotations

import ast
import importlib
from pathlib import Path
from typing import Iterable

_PACKAGE_DIR = Path(__file__).resolve().parent


def _parse_string_sequence(value: ast.AST) -> list[str] | None:
    """Parse a literal sequence of strings, e.g. __all__ = ["a", "b"]."""
    if not isinstance(value, (ast.List, ast.Tuple, ast.Set)):
        return None

    names: list[str] = []
    for element in value.elts:
        if isinstance(element, ast.Constant) and isinstance(element.value, str):
            names.append(element.value)
        else:
            return None
    return names


def _extract_public_exports(source: str) -> list[str]:
    """Extract public function exports from a module source string."""
    try:
        tree = ast.parse(source)
    except SyntaxError:
        return []

    explicit_all: list[str] | None = None
    public_functions: list[str] = []

    for node in tree.body:
        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
            if not node.name.startswith("_"):
                public_functions.append(node.name)
            continue

        if isinstance(node, ast.Assign):
            for target in node.targets:
                if isinstance(target, ast.Name) and target.id == "__all__":
                    parsed = _parse_string_sequence(node.value)
                    if parsed is not None:
                        explicit_all = parsed
        elif isinstance(node, ast.AnnAssign):
            target = node.target
            if isinstance(target, ast.Name) and target.id == "__all__" and node.value:
                parsed = _parse_string_sequence(node.value)
                if parsed is not None:
                    explicit_all = parsed

    if explicit_all is not None:
        return [name for name in explicit_all if not name.startswith("_")]

    return public_functions


def _iter_module_files() -> Iterable[Path]:
    """Yield non-private Python module files under the helpers package."""
    for file_path in _PACKAGE_DIR.rglob("*.py"):
        if file_path.name == "__init__.py":
            continue

        relative = file_path.relative_to(_PACKAGE_DIR)
        if any(part.startswith("_") for part in relative.parts):
            continue

        yield file_path


def _module_name_for_file(file_path: Path) -> str:
    """Convert file path to absolute module name."""
    relative = file_path.relative_to(_PACKAGE_DIR).with_suffix("")
    return ".".join((__name__, *relative.parts))


def _build_export_index() -> tuple[dict[str, str], dict[str, set[str]]]:
    """Build symbol->module index and track ambiguous names."""
    export_index: dict[str, str] = {}
    ambiguous: dict[str, set[str]] = {}

    for module_file in _iter_module_files():
        module_name = _module_name_for_file(module_file)

        try:
            source = module_file.read_text(encoding="utf-8")
        except OSError:
            continue

        for symbol in _extract_public_exports(source):
            existing = export_index.get(symbol)
            if existing is None:
                export_index[symbol] = module_name
                continue

            if existing != module_name:
                ambiguous.setdefault(symbol, {existing}).add(module_name)

    for symbol in ambiguous:
        export_index.pop(symbol, None)

    return export_index, ambiguous


_EXPORT_INDEX, _AMBIGUOUS_EXPORTS = _build_export_index()

__all__ = sorted(_EXPORT_INDEX)


def __getattr__(name: str):
    """Lazily resolve exported function names from their source modules."""
    if name in _EXPORT_INDEX:
        module = importlib.import_module(_EXPORT_INDEX[name])
        value = getattr(module, name)
        globals()[name] = value
        return value

    if name in _AMBIGUOUS_EXPORTS:
        modules = ", ".join(sorted(_AMBIGUOUS_EXPORTS[name]))
        raise AttributeError(
            f"Ambiguous export '{name}' exists in multiple modules: {modules}. "
            "Import it from the concrete module instead."
        )

    raise AttributeError(f"module '{__name__}' has no attribute '{name}'")


def __dir__() -> list[str]:
    """Include auto-discovered exports in interactive introspection."""
    return sorted(set(globals()) | set(__all__))
