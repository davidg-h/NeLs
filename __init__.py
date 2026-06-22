"""
NELS ComfyUI plugin:
interactive graph UI plus queued execution pipeline
"""

from .nodes import NODE_CLASS_MAPPINGS as ncm
from .nodes import NODE_DISPLAY_NAME_MAPPINGS as ndm
from .server.routes import register_routes

register_routes()

WEB_DIRECTORY = "./js"

NODE_CLASS_MAPPINGS = ncm
NODE_DISPLAY_NAME_MAPPINGS = ndm
