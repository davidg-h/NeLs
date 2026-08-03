# NeLs Analysis

Evaluation scripts and results behind the thesis's quantitative chapters. Each `*_test/` folder
evaluates one navigation/exploration operation (or a supporting design decision) implemented in
the [NELS ComfyUI plugin](../comfyui-nels-plugin/)

## Structure

| Folder                     | Evaluates                                                                                   |
| -------------------------- | ------------------------------------------------------------------------------------------- |
| `axis_projection_test/`    | Axis projection - projecting points onto a semantic direction between exemplar groups       |
| `consistency_check_test/`  | Consistency check - repeated-generation stability of a navigation result                    |
| `dataset_strategy_test/`   | UMAP projection strategy comparison (classic / two-pass / parametric) and held-out accuracy |
| `delta_walk_test/`         | Delta walk - traversal along the direction between two anchor points                        |
| `interpolation_test/`      | Interpolation between two points in latent/embedding space                                  |
| `latent_probe_test/`       | Latent probe reconstruction - recovering text from embedding-space positions                |
| `quantized_test/`          | Quantized vs. full-precision encoder comparison                                             |
| `paths.py` / `plotting.py` | Shared path resolution and plot-styling helpers used across all test folders                |

## Reproducibility

Results are deterministic and can be regenerated identically by re-running the scripts. A few test folders'
_input_ data - specific exemplar/prompt selections used as the starting point for a test - were
curated manually rather than produced by a script

> _input_ data are kept as committed data rather than
> regenerated, since there is no script that reproduces them

## Getting started

```bash
pip install -r requirements.txt
```

Scripts that need ComfyUI's own stack (UMAP/FAISS/TensorFlow/`comfy.*`) run via ComfyUI's
`python_embeded` instead, which must have `comfyui-nels-plugin/requirements.txt` installed

> those dependencies are not covered by `analysis/requirements.txt`
