# encode_cli.py

Standalone CLI for creating and extending NELS prompt datasets using ComfyUI model classes directly.  
Using [comfyui models](https://huggingface.co/Comfy-Org/models) directly: loaded straight from `.safetensors` files.  
The saved compact embeddings are **byte-for-byte identical** to those produced by the current NELS encoder pipeline,  
so datasets created here are fully interchangeable with node-created datasets.

Important distinction:

- the CLI does **not** save the full sequence conditioning tensor for each prompt
- it saves one compact vector per prompt, using the same rule as the plugin:
  - native pooled output when the encoder provides one
  - otherwise mean pooling over sequence conditioning

---

## Why use the CLI instead of the ComfyUI nodes?

- **Server use**: Encode large datasets on a GPU server without a UI.
- **Performance**: Skips ComfyUI’s server stack, node scheduling, and WebSocket overhead.
- **Automation**: Scriptable, composable with other shell tools.

Encoding runs on **GPU** (via ComfyUI model management). UMAP, clustering, and dataset I/O run on **CPU** — including Parametric UMAP's neural-network training, which is forced CPU-only on purpose (see Installation) to avoid contending with ComfyUI's own GPU usage.

> **Use ComfyUI’s embedded Python, for best consistency**
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

Then install NELS dependencies into **ComfyUI’s Python**:

```bash
path\to\python_embeded\python.exe -m pip install -r requirements.txt
```

`requirements.txt` includes everything: `numpy`, `safetensors`, `torch`, `umap-learn[parametric_umap]` (pulls TensorFlow for Parametric UMAP), `scikit-learn`, `hdbscan`, `joblib`, `faiss-cpu`, `transformers` (LLM cluster annotation), `Pillow` (image saving), `huggingface_hub`, `datasets` (HuggingFace dataset loading), and a pinned `pyarrow` (see "Known import-order crash" below).

---

## Known import-order crash: `torch` before `pyarrow`/`datasets`

Importing `torch` and then `pyarrow` (or anything that imports it, like the `datasets` package)
in the same process can crash with a native access violation on Windows -> this is a
long-standing, documented upstream incompatibility (`apache/arrow#2637`), not specific to this
plugin.
`requirements.txt` pins `pyarrow>=21.0.0,<24.0.0` for this reason -> don't loosen this
pin without re-verifying against the exact crash scenario (`import torch` followed by
`from datasets import load_dataset`)

---

## ComfyUI root detection

The CLI needs to find ComfyUI’s Python packages. It checks in this order:

| Method      | How                                                                                                                           |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Flag        | `--comfyui-path /path/to/ComfyUI`                                                                                             |
| Env var     | `export COMFYUI_ROOT=/path/to/ComfyUI`                                                                                        |
| Auto-detect | Walks up from `encode_cli.py` until a ComfyUI root is found — works when the plugin is anywhere inside a ComfyUI installation |

When a HuggingFace model is downloaded via `--clip owner/repo/file.safetensors`, it is saved to  
`<comfyui_root>/models/text_encoders/` so it is available for ComfyUI nodes on subsequent runs.

---

## Output format

Every dataset is a folder:

```text
my_dataset/
├── dataset.json              # Metadata
├── samples.jsonl             # One JSON record per sample
├── compact_embeddings.npy    # Shape: (N, compact_dim), float32 compact prompt embeddings
├── umap_2d.npy               # Shape: (N, 2), 2D UMAP projection for visualization
├── umap_3d.npy               # Shape: (N, 3), 3D UMAP projection for visualization
├── umap_model_2d/            # Parametric 2D UMAP reducer directory
├── umap_model_3d/            # Parametric 3D UMAP reducer directory
├── umap_model_cluster/       # Parametric UMAP cluster-space reducer directory
└── hdbscan_model.pkl         # joblib-pickled HDBSCAN clusterer model
```

> `umap_model_2d/3d/cluster` are directories, not files, because Parametric UMAP saves a Keras
> model bundle rather than a single pickle

### Compact embedding semantics

`compact_embeddings.npy` stores one compact vector per prompt.

Per prompt, the encoder computes real conditioning first:

- full sequence conditioning tensor `cond`
- optional pooled output

Then the saved compact vector is derived as:

1. use native pooled output when available
2. otherwise use `mean(seq_cond, dim=tokens)`

Dataset creation enforces one consistent strategy across the whole dataset:

- `native_pooled`
- `mean_seq_fallback`

That strategy is recorded in `dataset.json` as `embedding_strategy`.

### Metadata fields that matter

Important `dataset.json` fields:

- `full_dim`: the real full conditioning shape seen during encoding, for example `[1, 512, 7680]`
- `embedding_shape`: the saved per-prompt compact shape, for example `[7680]`
- `embedding_strategy`: `native_pooled` or `mean_seq_fallback`

Each sample record in `samples.jsonl`:

```json
{
  "id": "pt_000001",
  "text": "a red fox in a snowy forest",
  "raw_text": "red fox",
  "source": "some/bird-dataset",
  "template": "a {text} in a snowy forest",
  "cluster_global": 3,
  "is_noise": false,
  "membership_strength": 0.91,
  "metadata": { "label": "red fox", "family": "Canidae" }
}
```

`raw_text` equals `text` when no template is used. `template` and `metadata` are omitted when not applicable. `cluster_global`, `is_noise`, and `membership_strength` are set by HDBSCAN at encode time.

---

## Subcommands

### `create` — create a new dataset

```bash
python encode_cli.py create --input <source> --output <folder> --clip <path> [options]
```

**Required flags**

| Flag          | Description                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------------- |
| `--input`     | `.txt` file (one text per line) or HuggingFace dataset ID.                                     |
| `--output`    | Output folder. Created if it does not exist.                                                   |
| `--clip PATH` | CLIP `.safetensors` file, or HF path `owner/repo/file.safetensors` (downloaded automatically). |

**General options**

| Flag             | Default            | Description                                                                             |
| ---------------- | ------------------ | --------------------------------------------------------------------------------------- |
| `--name`         | output folder name | Human-readable name stored in `dataset.json`.                                           |
| `--clip-type`    | `FLUX2`            | ComfyUI CLIPType. Use `FLUX` for Flux.1, `STABLE_DIFFUSION` for SD/SDXL, `SD3` for SD3. |
| `--encode-limit` | `0` (all)          | Max texts to encode (applied before cleaning).                                          |

**HuggingFace source options**

| Flag          | Default  | Description               |
| ------------- | -------- | ------------------------- |
| `--hf-column` | `Prompt` | Column to read text from. |
| `--hf-split`  | `train`  | Dataset split to load.    |
| `--hf-config` | none     | Dataset config/name       |

**Text transformation**

| Flag                 | Default | Description                                                                                                                               |
| -------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `--text-template`    | none    | Template string. Use `{text}` for the column value, or `{column_name}` for any other column in the row. Example: `"A photo of a {text}"`. |
| `--metadata-columns` | none    | Comma-separated column names to store in each sample record. Example: `label,species,family`.                                             |

**Cleaning options**

| Flag          | Default | Description                                  |
| ------------- | ------- | -------------------------------------------- |
| `--dedupe`    | off     | Remove duplicate texts before encoding.      |
| `--min-words` | `0`     | Drop texts with fewer words. 0 = no minimum. |
| `--max-words` | `0`     | Drop texts with more words. 0 = no maximum.  |

**UMAP options**

| Flag                 | Default | Description                            |
| -------------------- | ------- | -------------------------------------- |
| `--umap-n-neighbors` | `15`    | Controls local vs. global structure.   |
| `--umap-min-dist`    | `0.1`   | Min distance between points in layout. |
| `--umap-seed`        | `42`    | Random seed for reproducible layout.   |

`create` always fits all three Parametric UMAP models on the full dataset. There is no subset-fit mode anymore: if you encode 500,000 prompts, the reducers train on all 500,000 prompts before `umap_2d.npy`, `umap_3d.npy`, and the saved `umap_model_*` directories are written.

**Cluster options**

| Flag                       | Default | Description                                                      |
| -------------------------- | ------- | ---------------------------------------------------------------- |
| `--cluster-umap-dims`      | `10`    | Dimensions for the cluster UMAP (lower = more compact clusters). |
| `--cluster-umap-neighbors` | `30`    | n_neighbors for the cluster UMAP.                                |
| `--cluster-min-size`       | `30`    | HDBSCAN min_cluster_size — minimum points to form a cluster.     |
| `--cluster-min-samples`    | `10`    | HDBSCAN min_samples — controls noise sensitivity.                |

**Annotation options**

| Flag               | Default | Description                                                                                                                                        |
| ------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--annotate`       | off     | Run LLM cluster annotation after dataset creation. Optionally pass a model ID, e.g. `--annotate Qwen/Qwen2.5-7B-Instruct` (default model if bare). |
| `--annotate-top-n` | `20`    | Number of top prompts per cluster (by membership strength) sent to the LLM.                                                                        |

---

### `annotate` — generate LLM cluster labels for an existing dataset

```bash
python encode_cli.py annotate --dataset <folder> [options]
```

Reads `samples.jsonl`, groups prompts by cluster, generates one label per cluster, and writes `cluster_labels` back into `dataset.json`. Noise points (`is_noise: true`) are excluded. Prompts are ranked by `membership_strength` and the top-N are sent to the LLM.

**Required flags**

| Flag        | Description                                                                |
| ----------- | -------------------------------------------------------------------------- |
| `--dataset` | Path to the existing dataset folder (absolute or name inside `datasets/`). |

**Options**

| Flag      | Default                    | Description                          |
| --------- | -------------------------- | ------------------------------------ |
| `--model` | `Qwen/Qwen2.5-7B-Instruct` | HuggingFace model ID for annotation. |
| `--top-n` | `20`                       | Prompts per cluster sent to the LLM. |

---

### `add` — append prompts to an existing dataset

```bash
python encode_cli.py add --dataset <folder> --input <source> --clip <path> [options]
```

**Required flags**

| Flag          | Description                                                                                                               |
| ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `--dataset`   | Path to the existing dataset folder.                                                                                      |
| `--input`     | New data source (same format as `create --input`).                                                                        |
| `--clip PATH` | CLIP `.safetensors` file, or HF path `owner/repo/file.safetensors` (downloaded automatically). Always required for `add`. |

**Other options**

| Flag                 | Description                                                                                                |
| -------------------- | ---------------------------------------------------------------------------------------------------------- |
| `--clip-type`        | ComfyUI CLIPType (default: `FLUX2`). Use `FLUX` for Flux.1, `STABLE_DIFFUSION` for SD/SDXL, `SD3` for SD3. |
| `--encode-limit`     | Max new texts. 0 = all.                                                                                    |
| `--hf-column`        | Column name when `--input` is a HF dataset (default: `Prompt`).                                            |
| `--hf-split`         | HF dataset split to load (default: `train`).                                                               |
| `--hf-config`        | HF dataset config/name.                                                                                    |
| `--text-template`    | Template string (same as `create`).                                                                        |
| `--metadata-columns` | Columns to store per sample (same as `create`).                                                            |
| `--dedupe`           | Remove duplicates.                                                                                         |
| `--min-words`        | Drop short texts.                                                                                          |
| `--max-words`        | Drop long texts.                                                                                           |

**Annotation options**

| Flag               | Default | Description                                                                                                                                                 |
| ------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--annotate`       | off     | Run LLM cluster annotation after appending (recommended, since cluster IDs are renumbered on every add). Optionally pass a model ID; bare uses the default. |
| `--annotate-top-n` | `20`    | Number of top prompts per cluster (by membership strength) sent to the LLM.                                                                                 |

`add` is a ground-truth operation like `create`, not an approximation: every `add` fully refits
all three Parametric UMAP networks (2D, 3D, cluster) **and** HDBSCAN on the complete dataset (old + new points together) — it does not transform new points through the old frozen models.

### Cluster relabeling on `add`

Because HDBSCAN is fully refit on every `add` (old + new points together), cluster IDs are not
stable across an add - for example cluster 3 before the add is not guaranteed to be the same group as cluster
3 after. As a result:

- `cluster_global`, `is_noise`, and `membership_strength` are rewritten for every sample in
  `samples.jsonl`, not just the newly appended ones.
- Any existing `cluster_labels` in `dataset.json` (whether from a prior `--annotate` run or from
  the default frequency labels) is no longer valid after the relabeling and is cleared, then
  immediately replaced with fresh frequency-based labels (the same cheap, non-LLM labeling
  `create` always runs) — the dataset is never left without labels after an add.
- To get LLM-quality labels again after an add, either pass `--annotate` to `add` (see above) or
  run the standalone `annotate` subcommand afterward.

The `NelsAddToDataset` ComfyUI node has no annotation inputs of its own — chain the standalone
`NELS Dataset Annotator` node after it in your graph if you want LLM cluster labels after an add.

---

## Examples

### Standard prompt dataset — HuggingFace

```bash
python encode_cli.py create \
  --clip Comfy-Org/vae-text-encorder-for-flux-klein-4b/split_files/text_encoders/qwen_3_4b_fp4_flux2.safetensors \
  --clip-type FLUX2 \
  --input Gustavosta/Stable-Diffusion-Prompts \
  --hf-column Prompt \
  --hf-split train \
  --encode-limit 5000 \
  --output datasets/sd_prompts_5k
```

> `--clip` accepts a HuggingFace path `owner/repo/file.safetensors` — the model is downloaded to  
> `<comfyui_root>/models/text_encoders/` automatically on first use.

### Dataset with config variant

Some HuggingFace datasets have multiple configurations. Use `--hf-config` to select one:

```bash
python encode_cli.py create \
  --clip models/text_encoders/qwen_3_4b_fp4_flux2.safetensors \
  --clip-type FLUX2 \
  --input some/dataset-with-configs \
  --hf-config variant_name \
  --hf-split train \
  --hf-column text \
  --encode-limit 100000 \
  --dedupe \
  --output datasets/my_dataset
```

### Label dataset with template

```bash
python encode_cli.py create \
  --clip models/text_encoders/clip_l.safetensors \
  --clip-type STABLE_DIFFUSION \
  --input some/bird-dataset \
  --hf-split train \
  --hf-column label \
  --text-template "A photo of a {text}" \
  --metadata-columns label,family \
  --output datasets/birds
```

### Multi-field template

```bash
python encode_cli.py create \
  --clip models/text_encoders/clip_l.safetensors \
  --clip-type STABLE_DIFFUSION \
  --input some/bird-dataset \
  --hf-split train \
  --hf-column species \
  --text-template "A photo of a {species}, a bird from the {family} family" \
  --metadata-columns species,family,order \
  --output datasets/birds_semantic
```

### Local .txt file

```bash
python encode_cli.py create \
  --clip models/text_encoders/qwen_3_4b_fp4_flux2.safetensors \
  --clip-type FLUX2 \
  --input prompts.txt \
  --encode-limit 1000 \
  --output datasets/my_prompts
```

### With explicit ComfyUI path

Use `--comfyui-path` as a **global flag before the subcommand** when the plugin is not inside `custom_nodes/`:

```bash
python encode_cli.py --comfyui-path "C:\ComfyUI" create \
  --clip "C:\ComfyUI\models\text_encoders\qwen_3_4b_fp4_flux2.safetensors" \
  --clip-type FLUX2 \
  --input Gustavosta/Stable-Diffusion-Prompts \
  --hf-column Prompt \
  --encode-limit 50 \
  --output "C:\datasets\my_prompts"
```

> `--comfyui-path` must appear **before** `create` / `add`. Placing it after the subcommand causes an “unrecognized arguments” error.

### Annotate clusters in an existing dataset

```bash
python encode_cli.py annotate --dataset datasets/sd_prompts_5k
```

With a different model or more prompts per cluster:

```bash
python encode_cli.py annotate \
  --dataset datasets/sd_prompts_5k \
  --model Qwen/Qwen2.5-7B-Instruct \
  --top-n 30
```

### Create and annotate in one command

```bash
python encode_cli.py create \
  --clip models/text_encoders/qwen_3_4b_fp4_flux2.safetensors \
  --clip-type FLUX2 \
  --input Gustavosta/Stable-Diffusion-Prompts \
  --hf-column Prompt \
  --encode-limit 5000 \
  --output datasets/sd_prompts_5k \
  --annotate
```

---

### Add to an existing dataset

```bash
# --clip is always required for add
python encode_cli.py add \
  --dataset datasets/my_prompts \
  --input more_prompts.txt \
  --clip models/text_encoders/qwen_3_4b_fp4_flux2.safetensors \
  --clip-type FLUX2

# Re-annotate with the LLM right after adding (clusters are renumbered on every add)
python encode_cli.py add \
  --dataset datasets/my_prompts \
  --input more_prompts.txt \
  --clip models/text_encoders/qwen_3_4b_fp4_flux2.safetensors \
  --clip-type FLUX2 \
  --annotate
```

---

## Tips

**Use `--encode-limit 100` first** to verify your setup before encoding a large dataset.

**`--dedupe`** runs after `--encode-limit`, so you may get fewer samples than the limit if duplicates are removed.

**`--text-template`** supports any column from the HF row as `{column_name}`. If a placeholder is missing from the row, the CLI raises a clear error listing available columns.
