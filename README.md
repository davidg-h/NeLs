# NeLs: Navigation and Exploration of Latent Spaces in Diffusion Models

Bachelor thesis project on navigating and exploring the latent spaces of text-to-image
diffusion models. Investigates interpolation, directional movement, and other navigation
strategies without modifying the underlying model, evaluated for visual stability, semantic
coherence, and structural continuity. Includes a ComfyUI plugin for reproducible,
parameter-controlled latent space navigation.

## Repository structure

| Path                                                                  | Contents                                                                                                                      |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| [`comfyui-nels-plugin/`](comfyui-nels-plugin/)                        | The ComfyUI plugin - nodes + CLI for dataset creation and graph exploration ([its own README](comfyui-nels-plugin/README.md)) |
| [`manuscript/`](manuscript/)                                          | LaTeX source of the thesis (submodule)                                                                                        |
| [`analysis/`](analysis/)                                              | Evaluation scripts and results behind the thesis's quantitative chapters                                                      |
| [`prototypes/`](prototypes/)                                          | Early proof-of-concept work: raw Hugging Face `diffusers` pipelines, no ComfyUI - method validation before the plugin existed |
| [`datasets/`](https://huggingface.co/datasets/daveyavu/nels-datasets) | Datasets used for encoding/analysis (submodule, hosted on Hugging Face)                                                       |

## Branches

Split by scope, so you don't have to pull in things you don't need:

| Branch       | What you get                                                                                                               |
| ------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `main`       | Everything - plugin, thesis, analysis, prototypes                                                                          |
| `plugin`     | Just [`comfyui-nels-plugin/`](comfyui-nels-plugin/), promoted to the repo root, ready to drop into `ComfyUI/custom_nodes/` |
| `prototypes` | Just [`prototypes/`](prototypes/), the standalone HF-`diffusers` proof-of-concept work                                     |

## Getting started

- **Just want the plugin?** Switch to the `plugin` branch, or read
  [`comfyui-nels-plugin/README.md`](comfyui-nels-plugin/README.md) directly.
- **Just want the prototypes?** Switch to the `prototypes` branch, or read
  [`prototypes/README.md`](prototypes/README.md) directly - also covers the `.env` setup
  needed to run anything there.
- **Datasets** live in a separate Hugging Face-hosted submodule; clone with
  `--recurse-submodules`, or run `git submodule update --init` afterwards to fetch them.

## License

Apache License 2.0 - see [LICENSE](LICENSE).
