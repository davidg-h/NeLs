"""Default hyperparameters and paths"""

from pathlib import Path

# Plugin paths
PLUGIN_ROOT: Path = Path(__file__).parent.parent
DEFAULT_DATASETS: Path = PLUGIN_ROOT / "datasets"

# Visualization UMAP
UMAP_N_NEIGHBORS: int = 15
UMAP_MIN_DIST: float = 0.1
UMAP_METRIC: str = "cosine"
UMAP_SEED: int = 42

# Cluster UMAP + HDBSCAN
CLUSTER_UMAP_DIMS: int = 10
CLUSTER_UMAP_NEIGHBORS: int = 30
CLUSTER_MIN_SIZE: int = 30
CLUSTER_MIN_SAMPLES: int = 10

# Encoding
ENCODE_BATCH_SIZE: int = 32
