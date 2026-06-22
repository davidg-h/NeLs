"""Node registry for the NELS enhanced architecture"""

from .node_comparison_grid import NODE_CLASS_MAPPINGS as comparison_grid_nodes
from .node_comparison_grid import NODE_DISPLAY_NAME_MAPPINGS as comparison_grid_names
from .node_dataset_annotator import NODE_CLASS_MAPPINGS as annotator_nodes
from .node_dataset_annotator import NODE_DISPLAY_NAME_MAPPINGS as annotator_names
from .node_dataset_appender import NODE_CLASS_MAPPINGS as appender_nodes
from .node_dataset_appender import NODE_DISPLAY_NAME_MAPPINGS as appender_names
from .node_dataset_encoder import NODE_CLASS_MAPPINGS as encoder_nodes
from .node_dataset_encoder import NODE_DISPLAY_NAME_MAPPINGS as encoder_names
from .node_dataset_loader import NODE_CLASS_MAPPINGS as loader_nodes
from .node_dataset_loader import NODE_DISPLAY_NAME_MAPPINGS as loader_names
from .node_graph_operation import NODE_CLASS_MAPPINGS as operation_nodes
from .node_graph_operation import NODE_DISPLAY_NAME_MAPPINGS as operation_names
from .node_graph_panel_launcher import NODE_CLASS_MAPPINGS as launcher_nodes
from .node_graph_panel_launcher import NODE_DISPLAY_NAME_MAPPINGS as launcher_names
from .node_prompt_conditioning import NODE_CLASS_MAPPINGS as prompt_cond_nodes
from .node_prompt_conditioning import NODE_DISPLAY_NAME_MAPPINGS as prompt_cond_names
from .node_save_run import NODE_CLASS_MAPPINGS as save_run_nodes
from .node_save_run import NODE_DISPLAY_NAME_MAPPINGS as save_run_names
from .node_session import NODE_CLASS_MAPPINGS as session_nodes
from .node_session import NODE_DISPLAY_NAME_MAPPINGS as session_names

NODE_CLASS_MAPPINGS = {}
NODE_DISPLAY_NAME_MAPPINGS = {}

for mapping in [
    loader_nodes,
    encoder_nodes,
    annotator_nodes,
    appender_nodes,
    session_nodes,
    launcher_nodes,
    operation_nodes,
    save_run_nodes,
    prompt_cond_nodes,
    comparison_grid_nodes,
]:
    NODE_CLASS_MAPPINGS.update(mapping)

for mapping in [
    loader_names,
    encoder_names,
    annotator_names,
    appender_names,
    session_names,
    launcher_names,
    operation_names,
    save_run_names,
    prompt_cond_names,
    comparison_grid_names,
]:
    NODE_DISPLAY_NAME_MAPPINGS.update(mapping)
