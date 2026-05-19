# encode_cli.py

Standalone CLI for creating and extending NELS datasets using ComfyUI model classes directly.
Using [comfyui models](https://huggingface.co/Comfy-Org/models) directly: loaded straight from `.safetensors` files.
Embeddings are **byte-for-byte identical** to those produced by the ComfyUI encoder nodes,
so datasets created here are fully interchangeable with node-created datasets.

---

## Why use the CLI instead of the ComfyUI nodes?

- **Server use**: Encode large datasets on a GPU server without a UI.
- **Performance**: Skips ComfyUI's server stack, node scheduling, and WebSocket overhead.
- **Automation**: Scriptable, composable with other shell tools.

The CLI uses the same ComfyUI model infrastructure (`comfy.sd.load_clip`, `comfy.sd.VAE`)
as the nodes, so there is no dimension mismatch between CLI-created and node-created datasets.

Encoding runs on **GPU** (via ComfyUI model management). UMAP and kNN run on **CPU**.

> **Use ComfyUI's embedded Python, for best consistency**
>
> On a ComfyUI portable install, invoke the CLI like this:
>
> ```bash
> "path\to\ComfyUI-windows-portable\python_embeded\python.exe" encode_cli.py [args...]
> ```

---

## Installation

Install ComfyUI on the target machine (one command with [comfy-cli](https://github.com/Comfy-Org/comfy-cli)):

```bash
pip install comfy-cli
comfy --workspace=/opt/comfyui install
```

Then install NELS dependencies into **ComfyUI's Python**:

```bash
path\to\python_embeded\python.exe -m pip install numpy safetensors umap-learn joblib scikit-learn Pillow
path\to\python_embeded\python.exe -m pip install datasets   # required for HuggingFace prompt or image datasets
# or
path\to\python_embeded\python.exe -m pip install -r requirements.txt
```

---

## ComfyUI root detection

The CLI needs to find ComfyUI's Python packages. It checks in this order:

| Method      | How                                                                                                              |
| ----------- | ---------------------------------------------------------------------------------------------------------------- |
| Flag        | `--comfyui-path /path/to/ComfyUI`                                                                                |
| Env var     | `export COMFYUI_ROOT=/path/to/ComfyUI`                                                                           |
| Auto-detect | Walks 4 levels up from `encode_cli.py` — works automatically when the plugin is inside ComfyUI's `custom_nodes/` |

---

## Output format (v3)

Every dataset is a folder:

**Image latent:**

```
my_dataset/
├── dataset.json                  # metadata + cli_encoder block (model paths for future add)
├── samples.jsonl                 # one JSON record per sample
├── embeddings.npy                # (N, C*H*W) float32 — flatten (default) or (N, C) spatial_mean
├── umap_2d.npy                   # (N, 2) — 2D UMAP projection
├── umap_3d.npy                   # (N, 3) — 3D UMAP projection
├── umap_model_2d.pkl             # saved UMAP reducer (used by `add` to project new points)
├── umap_model_3d.pkl
├── knn_cosine_indices.npy        # (N, k) — precomputed cosine kNN indices
├── knn_cosine_distances.npy      # (N, k) — precomputed cosine kNN distances
├── knn_euclidean_indices.npy     # (N, k) — precomputed euclidean kNN indices
└── knn_euclidean_distances.npy   # (N, k) — precomputed euclidean kNN distances
```

**Prompt embedding:**

```
my_dataset/
├── dataset.json
├── samples.jsonl
├── embeddings.npy                # (N, hidden_dim) float32 — pooled CLIP output, always present
├── cond_tensors.safetensors      # {sample_id: [seq_len, hidden_dim]} — only with --save-full-cond
├── umap_2d.npy / umap_3d.npy / umap_model_*.pkl
├── knn_cosine_indices.npy / knn_cosine_distances.npy
└── knn_euclidean_indices.npy / knn_euclidean_distances.npy
```

Both kNN graphs (cosine and euclidean) are always stored. The graph panel picks the
right one automatically based on the selected edge mode (`knn_cosine` or `knn_euclidean`).

Old datasets (`pooled.npy`, `tensors.safetensors`, `full_latents.safetensors`) load fine —
extra files are ignored and `pooled.npy` is read as a fallback if `embeddings.npy` is absent.

---

## Subcommands

### `create` — create a new dataset

```bash
python encode_cli.py create --type <prompt|image> --input <source> --output <folder> [options]
```

**Required flags**

| Flag          | Description                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------------ |
| `--type`      | `prompt` = text via CLIP. `image` = image via VAE latent.                                                    |
| `--input`     | For prompts: `.txt` file or HuggingFace dataset ID. For images: local folder path or HuggingFace dataset ID. |
| `--output`    | Output folder. Created if it does not exist.                                                                 |
| `--clip PATH` | CLIP `.safetensors` file. **Required when `--type prompt`.**                                                 |
| `--vae PATH`  | VAE `.safetensors` file. **Required when `--type image`.**                                                   |

**General options**

| Flag             | Default            | Description                                                                                       |
| ---------------- | ------------------ | ------------------------------------------------------------------------------------------------- |
| `--name`         | output folder name | Human-readable name stored in `dataset.json`.                                                     |
| `--encode-limit` | `0` (all)          | Max samples to encode.                                                                            |
| `--batch-size`   | `8`                | Samples per encoding batch.                                                                       |
| `--hf-column`    | type-dependent     | Column name when `--input` is a HF dataset. Defaults to `Prompt` for prompts, `image` for images. |
| `--hf-split`     | `train`            | HF dataset split to load.                                                                         |
| `--comfyui-path` | auto               | Override ComfyUI root detection.                                                                  |

**Prompt options (`--type prompt`)**

| Flag               | Default | Description                                                                                                                                                 |
| ------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--clip-type`      | `FLUX2` | ComfyUI CLIPType. Use `FLUX` for Flux.1, `STABLE_DIFFUSION` for SD/SDXL, `SD3` for SD3.                                                                    |
| `--save-full-cond` | off     | Save full token conditioning `[seq_len, hidden_dim]` per sample for use with `nels_PromptConditioningBatch` → KSampler. See T5 size warning below. |

> **T5 size warning**: T5-XXL (Flux) cond tensors are ~4 GB per 1000 samples. Only use `--save-full-cond`
> with CLIP-L (SD, ~230 MB/1k) or CLIP-G (SDXL, ~380 MB/1k) datasets where the size is manageable.

**Image options (`--type image`)**

| Flag              | Default   | Description                                                                                                                             |
| ----------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `--image-pooling` | `flatten` | `flatten`: lossless `(C×H×W,)` vector — required for `nels_SequenceDecode`. `spatial_mean`: compact `(C,)` vector, cannot be decoded. |
| `--image-width`   | original  | Resize images to this width before encoding. Required for `flatten` to ensure consistent latent shape.                                  |
| `--image-height`  | original  | Resize images to this height before encoding.                                                                                           |

> **`flatten` requires consistent image dimensions.** Set `--image-width` and `--image-height` so all images
> produce the same latent shape. `spatial_mean` is size-agnostic but trajectory steps cannot be decoded to images.

> **VAE scale factor** is derived automatically from the actual encoded dimensions
> (e.g. Flux2-4b uses ×16, standard SD/SDXL VAE uses ×8).

**UMAP options**

| Flag                 | Default  | Description                                                              |
| -------------------- | -------- | ------------------------------------------------------------------------ |
| `--umap-n-neighbors` | `15`     | Controls local vs. global structure.                                     |
| `--umap-min-dist`    | `0.1`    | Min distance between points in layout.                                   |
| `--umap-metric`      | `cosine` | Distance metric (`cosine`, `euclidean`, `manhattan`).                    |
| `--umap-seed`        | `42`     | Random seed for reproducible layout.                                     |
| `--no-umap`          | off      | Skip UMAP (faster; graph panel will not display the dataset without it). |

**kNN options**

| Flag       | Default | Description                                                                     |
| ---------- | ------- | ------------------------------------------------------------------------------- |
| `--knn-k`  | `15`    | Number of neighbors to precompute. Both cosine and euclidean are always stored. |
| `--no-knn` | off     | Skip kNN precomputation (smaller files; edge modes will recompute at load).     |

---

### `add` — append samples to an existing dataset

```bash
python encode_cli.py add --dataset <folder> --type <prompt|image> --input <source> [options]
```

**Required flags**

| Flag        | Description                                        |
| ----------- | -------------------------------------------------- |
| `--dataset` | Path to the existing dataset folder.               |
| `--type`    | Type of new samples to add.                        |
| `--input`   | New data source (same format as `create --input`). |

**Model flags**

- If the dataset was **created via CLI**: paths are auto-loaded from `dataset.json`'s `cli_encoder` block. `--clip`/`--vae` can be omitted unless you want to override.
- If the dataset was **created via a ComfyUI node**: model paths were not recorded. You must specify `--clip` (for prompts) or `--vae` (for images) explicitly.

| Flag             | Description                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| `--clip PATH`    | CLIP `.safetensors`. Auto-resolved from `cli_encoder` block, or required if absent.               |
| `--clip-type`    | ComfyUI CLIPType. Auto-resolved from `cli_encoder` block, or required with `--clip`.              |
| `--vae PATH`     | VAE `.safetensors`. Auto-resolved from `cli_encoder` block, or required if absent.                |
| `--encode-limit` | Max new samples. 0 = all.                                                                         |
| `--batch-size`   | Batch size (default: 8).                                                                          |
| `--hf-column`    | Column name when `--input` is a HF dataset. Defaults to `Prompt` for prompts, `image` for images. |
| `--hf-split`     | HF dataset split to load (default: `train`).                                                      |

Image encoding settings (`image_pooling`, `processed_size`) are read from the dataset's
`encoding_params` automatically — no need to re-specify them.

For prompt datasets with `cond_tensors.safetensors` present, new samples are encoded with
`save_full_cond=True` automatically and merged into the existing file. Only new items are
re-encoded; existing samples are read from disk.

UMAP: new points are projected into the existing space using the saved reducer models.
If the models are missing, UMAP is refit on all merged vectors.

kNN: always recomputed on the full merged dataset for both cosine and euclidean.

---

## Examples

### Prompt dataset — HuggingFace, with explicit ComfyUI path

Use `--comfyui-path` as a **global flag before the subcommand** when the plugin is not inside `custom_nodes/`:

```bash
python encode_cli.py --comfyui-path "C:\ComfyUI" create \
  --type prompt \
  --clip "C:\ComfyUI\models\text_encoders\qwen_3_4b_fp4_flux2.safetensors" \
  --clip-type FLUX2 \
  --input Gustavosta/Stable-Diffusion-Prompts \
  --hf-column Prompt \
  --hf-split train \
  --encode-limit 50 \
  --knn-k 50 \
  --output "C:\datasets\my_prompts"
```

> `--comfyui-path` must appear **before** `create` / `add`. Placing it after the subcommand causes an "unrecognized arguments" error.

---

### Prompt dataset — local .txt file

```bash
python encode_cli.py create \
  --type prompt \
  --clip models/text_encoders/qwen_3_4b_fp4_flux2.safetensors \
  --clip-type FLUX2 \
  --input prompts.txt \
  --encode-limit 1000 \
  --batch-size 32 \
  --output datasets/my_prompts
```

### Prompt dataset — with full conditioning (SD/SDXL only)

```bash
python encode_cli.py create \
  --type prompt \
  --clip models/text_encoders/clip_l.safetensors \
  --clip-type STABLE_DIFFUSION \
  --input prompts.txt \
  --save-full-cond \
  --encode-limit 1000 \
  --output datasets/sd_prompts_with_cond
```

### Prompt dataset — HuggingFace source

```bash
python encode_cli.py create \
  --type prompt \
  --clip models/text_encoders/qwen_3_4b_fp4_flux2.safetensors \
  --clip-type FLUX2 \
  --input Gustavosta/Stable-Diffusion-Prompts \
  --hf-column Prompt \
  --hf-split train \
  --encode-limit 5000 \
  --batch-size 32 \
  --output datasets/sd_prompts_5k \
  --umap-n-neighbors 20 \
  --umap-min-dist 0.05
```

### Image dataset — local folder, fixed size (flatten default)

```bash
python encode_cli.py create \
  --type image \
  --vae models/vae/flux2-vae.safetensors \
  --input /data/images/ \
  --image-width 512 --image-height 512 \
  --encode-limit 1000 \
  --output datasets/my_images_512
```

### Image dataset — HuggingFace source

```bash
python encode_cli.py create \
  --type image \
  --vae models/vae/flux2-vae.safetensors \
  --input lambdalabs/pokemon-blip-captions \
  --hf-column image \
  --hf-split train \
  --image-width 512 --image-height 512 \
  --encode-limit 200 \
  --knn-k 15 \
  --output datasets/pokemon_images
```

### Add more samples (auto-resolves model from cli_encoder)

```bash
python encode_cli.py add \
  --dataset datasets/my_images_512 \
  --type image \
  --input /data/more_images/
```

### Add from HuggingFace to an existing image dataset

```bash
python encode_cli.py add \
  --dataset datasets/my_images_512 \
  --type image \
  --input lambdalabs/pokemon-blip-captions \
  --hf-column image \
  --hf-split train \
  --encode-limit 50
```

### Add to a node-created dataset (must supply model path)

```bash
python encode_cli.py add \
  --dataset datasets/node_created_prompts \
  --type prompt \
  --input extra_prompts.txt \
  --clip models/text_encoders/qwen_3_4b_fp4_flux2.safetensors \
  --clip-type FLUX2
```

### Standard Stable Diffusion CLIP

```bash
python encode_cli.py create \
  --type prompt \
  --clip models/text_encoders/clip_l.safetensors \
  --clip-type STABLE_DIFFUSION \
  --input prompts.txt \
  --output datasets/sd_clip_prompts
```

---

## Tips

**Use `--encode-limit 100` first** to verify your setup before encoding a large dataset.

**`--batch-size`**: 8 is conservative. Increase to 32–64 for prompts on a GPU with enough VRAM.
For images, keep it at 4–8 since VAE encoding is memory-intensive.

**UMAP models are saved automatically** (`umap_model_2d.pkl`, `umap_model_3d.pkl`).
The `add` subcommand uses them to project new points into the existing layout without refitting.

**Both kNN graphs are always stored** — cosine for prompt-style similarity, euclidean for image
latent distance. The graph panel picks the right one based on the edge mode setting. You can
skip kNN with `--no-knn` if you only need the UMAP layout and do not plan to use kNN edge modes.

**Image size consistency**: When using `--image-pooling flatten` (the default), set `--image-width`
and `--image-height` so all images produce the same latent shape. `spatial_mean` is size-agnostic
but trajectory steps from those datasets cannot be decoded to images.

**VAE scale factor**: Different VAE architectures use different spatial downscale ratios
(standard SD/SDXL = ×8, Flux2-4b = ×16). The CLI derives this automatically from the
actual encoded dimensions — you never need to specify it manually.
