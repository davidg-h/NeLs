"""
Node registry for the NELS enhanced architecture.
"""

from .dataset_appender import NODE_CLASS_MAPPINGS as appender_nodes
from .dataset_appender import NODE_DISPLAY_NAME_MAPPINGS as appender_names
from .dataset_encoder import NODE_CLASS_MAPPINGS as encoder_nodes
from .dataset_encoder import NODE_DISPLAY_NAME_MAPPINGS as encoder_names
from .dataset_loader import NODE_CLASS_MAPPINGS as loader_nodes
from .dataset_loader import NODE_DISPLAY_NAME_MAPPINGS as loader_names
from .graph_operation import NODE_CLASS_MAPPINGS as operation_nodes
from .graph_operation import NODE_DISPLAY_NAME_MAPPINGS as operation_names
from .graph_panel_launcher import NODE_CLASS_MAPPINGS as launcher_nodes
from .graph_panel_launcher import NODE_DISPLAY_NAME_MAPPINGS as launcher_names
from .metrics import NODE_CLASS_MAPPINGS as metrics_nodes
from .metrics import NODE_DISPLAY_NAME_MAPPINGS as metrics_names
from .comparison_grid import NODE_CLASS_MAPPINGS as comparison_grid_nodes
from .comparison_grid import NODE_DISPLAY_NAME_MAPPINGS as comparison_grid_names
from .prompt_conditioning import NODE_CLASS_MAPPINGS as prompt_cond_nodes
from .prompt_conditioning import NODE_DISPLAY_NAME_MAPPINGS as prompt_cond_names
from .session import NODE_CLASS_MAPPINGS as session_nodes
from .session import NODE_DISPLAY_NAME_MAPPINGS as session_names
from .stability_heatmap import NODE_CLASS_MAPPINGS as heatmap_nodes
from .stability_heatmap import NODE_DISPLAY_NAME_MAPPINGS as heatmap_names
from .save_run import NODE_CLASS_MAPPINGS as save_run_nodes
from .save_run import NODE_DISPLAY_NAME_MAPPINGS as save_run_names
from .trajectory_decode import NODE_CLASS_MAPPINGS as traj_decode_nodes
from .trajectory_decode import NODE_DISPLAY_NAME_MAPPINGS as traj_decode_names


NODE_CLASS_MAPPINGS = {}
NODE_DISPLAY_NAME_MAPPINGS = {}

for mapping in [
    loader_nodes,
    encoder_nodes,
    appender_nodes,
    session_nodes,
    launcher_nodes,
    operation_nodes,
    metrics_nodes,
    traj_decode_nodes,
    save_run_nodes,
    heatmap_nodes,
    prompt_cond_nodes,
    comparison_grid_nodes,
]:
    NODE_CLASS_MAPPINGS.update(mapping)

for mapping in [
    loader_names,
    encoder_names,
    appender_names,
    session_names,
    launcher_names,
    operation_names,
    metrics_names,
    traj_decode_names,
    save_run_names,
    heatmap_names,
    prompt_cond_names,
    comparison_grid_names,
]:
    NODE_DISPLAY_NAME_MAPPINGS.update(mapping)


__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS"]
