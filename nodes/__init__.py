"""Node registry for the NELS enhanced architecture."""

from .data_source import NODE_CLASS_MAPPINGS as data_source_nodes
from .data_source import NODE_DISPLAY_NAME_MAPPINGS as data_source_names
from .graph_operation import NODE_CLASS_MAPPINGS as operation_nodes
from .graph_operation import NODE_DISPLAY_NAME_MAPPINGS as operation_names
from .graph_panel_launcher import NODE_CLASS_MAPPINGS as launcher_nodes
from .graph_panel_launcher import NODE_DISPLAY_NAME_MAPPINGS as launcher_names
from .metrics import NODE_CLASS_MAPPINGS as metrics_nodes
from .metrics import NODE_DISPLAY_NAME_MAPPINGS as metrics_names
from .session import NODE_CLASS_MAPPINGS as session_nodes
from .session import NODE_DISPLAY_NAME_MAPPINGS as session_names


NODE_CLASS_MAPPINGS = {}
NODE_DISPLAY_NAME_MAPPINGS = {}

for mapping in [
    data_source_nodes,
    session_nodes,
    launcher_nodes,
    operation_nodes,
    metrics_nodes,
]:
    NODE_CLASS_MAPPINGS.update(mapping)

for mapping in [
    data_source_names,
    session_names,
    launcher_names,
    operation_names,
    metrics_names,
]:
    NODE_DISPLAY_NAME_MAPPINGS.update(mapping)


__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS"]
