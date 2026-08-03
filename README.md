# NeLs Prototypes

Early proof-of-concept work for latent-space navigation in text-to-image diffusion models,
built directly on Hugging Face `diffusers` pipelines. This is where the
navigation methods were first validated before being ported into the
[NELS ComfyUI plugin](https://github.com/davidg-h/NeLs/tree/plugin).

## Scope

**Access methods (A1-A4):**

| Method | What it does                                      |
| ------ | ------------------------------------------------- |
| A1     | VAE encode/decode and prompt embedding access     |
| A2     | Denoising-step latent capture via callback hooks  |
| A3     | Custom latent injection and interpolation         |
| A4     | Prompt embedding manipulation (text latent space) |

**Navigation/manipulation methods (M1-M6), the canonical validation scripts:**

| Method | What it does                                                       |
| ------ | ------------------------------------------------------------------ |
| M1     | Linear interpolation (LERP) between two seeds                      |
| M2     | Spherical interpolation (SLERP) between two seeds                  |
| M3     | Seed trajectory navigation across multiple seeds                   |
| M4     | Delta walk: traversal along the direction between two anchor seeds |
| M5     | Time-window latent editing during denoising                        |
| M6     | Prompt-embedding interpolation                                     |

## Structure

| Path                        | Contents                                                                     |
| --------------------------- | ---------------------------------------------------------------------------- |
| `poc/helpers/`              | Reusable implementation primitives                                           |
| `poc/examples/`             | The M1-M6 canonical validation scripts, grouped by concern                   |
| `notebooks/`                | Interactive notebook mirrors of the M1-M6 scripts                            |
| `configs/templates/`        | Ready-to-use JSON config templates, one per method plus a multi-run template |
| `configs/full_gpu_profile/` | Config presets tuned for a full local GPU (no offloading)                    |
| `poc/experiment_runner.py`  | Non-interactive runner for logged, config-driven M1-M6 runs                  |

## Getting started

```bash
pip install -r requirements.txt
```

Create a `.env` file at the repo root (gitignored, not committed) with:

```
PYTHONPATH=<absolute path to poc/>
MODEL_ID=black-forest-labs/FLUX.2-klein-base-4B
DEVICE=cuda
HF_HOME=<optional custom HF cache dir>
HF_TOKEN=<your Hugging Face token, if the model is gated>
```

- **Via the experiment runner:** it loads `.env` itself and passes the resolved environment
  through to each launched script, so this works in any plain terminal.
- **Running a script directly** (`python poc/examples/...`): `PYTHONPATH` must already be set in
  the process environment before Python starts, since it's resolved at interpreter startup, before
  any in-script `.env` loading runs. In an editor, use its env-file support (e.g. VS Code's
  `python.envFile` pointing at `.vscode/settings.json`); otherwise export the variables in your
  shell first.

**Run a validation script directly** (uses its own built-in defaults):

```bash
python poc/examples/navigation/m1_lerp_pipeline.py
```

**Run it through the experiment runner** for full logging and reproducible config-driven runs:

```bash
python poc/experiment_runner.py --sr M1 --config configs/templates/m1_template.json
```

See [`RUNNER_USAGE_GUIDE.md`](RUNNER_USAGE_GUIDE.md) for the full CLI reference, config schema,
and output format.
