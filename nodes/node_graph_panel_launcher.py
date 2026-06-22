"""Canvas launcher node for the NELS graph panel"""


class NelsGraphPanelLauncher:
    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {}}

    RETURN_TYPES = ()
    FUNCTION = "noop"
    CATEGORY = "nels/enhanced"
    OUTPUT_NODE = True

    def noop(self):
        return ()


NODE_CLASS_MAPPINGS = {"nels_GraphPanelLauncher": NelsGraphPanelLauncher}
NODE_DISPLAY_NAME_MAPPINGS = {"nels_GraphPanelLauncher": "NELS Graph Panel Launcher"}
