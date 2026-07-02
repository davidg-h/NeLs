"""Default hyperparameters and paths"""

from pathlib import Path

# Plugin paths
DEFAULT_DATASETS: Path = Path(__file__).parent.parent / "datasets"

# Projection strategies
PROJECTION_STRATEGY_CLASSIC: str = "classic"
PROJECTION_STRATEGY_TWO_PASS: str = "two_pass"
PROJECTION_STRATEGY_PARAMETRIC: str = "parametric"

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

# Two-pass runtime subset defaults
RUNTIME_SUBSET_SIZE: int = 20000
RUNTIME_CLUSTER_K: int = 32
RUNTIME_CLUSTER_TEMPERATURE: float = 12.0
RUNTIME_CLUSTER_NOISE_THRESHOLD: float = 0.45

# LLM inference
DEFAULT_LLM_MODEL: str = "Qwen/Qwen2.5-7B-Instruct"

# Shared zero-vector floor for L2 normalization (torch and numpy paths)
EPS_NORM: float = 1e-12
