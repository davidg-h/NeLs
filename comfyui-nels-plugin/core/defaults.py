"""Default hyperparameters and paths"""

from pathlib import Path

# Plugin paths
DEFAULT_DATASETS: Path = Path(__file__).parent.parent / "datasets"

# Visualization UMAP (2D)
UMAP_N_NEIGHBORS: int = 15
UMAP_MIN_DIST: float = 0.1
UMAP_SEED: int = 42

# Visualization UMAP (3D): higher spread/min_dist to prevent spherical packing in the extra dimension
UMAP_3D_MIN_DIST: float = 0.25
UMAP_3D_SPREAD: float = 1.5

# Cluster UMAP + HDBSCAN
CLUSTER_UMAP_DIMS: int = 10
CLUSTER_UMAP_NEIGHBORS: int = 30
CLUSTER_MIN_SIZE: int = 30
CLUSTER_MIN_SAMPLES: int = 10

# Subset UMAP fitting for large datasets
UMAP_SUBSET_THRESHOLD: int = 100000  # gate: use subset fitting only when N > this
UMAP_SUBSET_FIT_SIZE: int = 75000  # default subset size when user passes 0/None
UMAP_SUBSET_MIN_PER_CLUSTER: int = 50  # guaranteed seats per cluster in stratified draw

# Encoding
ENCODE_BATCH_SIZE: int = 32

# LLM inference
DEFAULT_LLM_MODEL: str = "Qwen/Qwen2.5-7B-Instruct"
