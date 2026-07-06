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

Encoding runs on **GPU** (via ComfyUI model management). UMAP, clustering, and dataset I/O run on **CPU** - including Parametric UMAP's neural-network training, which is forced CPU-only on purpose (see Installation) to avoid contending with ComfyUI's own GPU usage.

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

> `requirements.txt` includes everything: `numpy`, `safetensors`, `torch`, `umap-learn[parametric_umap]` (pulls TensorFlow for Parametric UMAP), `scikit-learn`, `hdbscan`, `joblib`, `faiss-cpu`, `transformers` (LLM cluster annotation), `Pillow` (image saving), `huggingface_hub`, `datasets` (HuggingFace dataset loading), and a pinned `pyarrow` (see "Known import-order crash" below).

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

Every dataset is a folder with shared core artifacts:

```text
my_dataset/
├── dataset.json
├── samples.jsonl
├── compact_embeddings.npy
├── umap_2d.npy
└── umap_3d.npy
```

The remaining files depend on `projection.strategy`.

### `classic`

```text
my_dataset/
├── umap_model_cluster.joblib
├── umap_model_2d.joblib
├── umap_model_3d.joblib
└── hdbscan_model.joblib
```

### `two_pass`

```text
my_dataset/
├── runtime_umap_model_2d.joblib
├── runtime_umap_model_3d.joblib
└── used_subset.jsonl
```

> Two-pass uses **kNN label voting** for clustering: find k nearest compact-embedding neighbors,
> vote on their canonical cluster labels from `samples.jsonl`. No cluster reducer needed.
>
> Three alternatives were considered and rejected:
>
> - **Weighted-average**: FAISS kNN in compact space -> weighted average of neighbors'
>   _canonical_ cluster UMAP coords (correct manifold) -> `hdbscan.approximate_predict()`.
>   - Rejected: the weighted average assumes compact-space proximity and canonical UMAP cluster-space
>     proximity correlate. When that assumption fails the averaged coord lands between clusters,
>     HDBSCAN returns noise or the wrong label -> a silent, hard-to-detect failure
> - **Runtime UMAP -> canonical HDBSCAN**: applying `approximate_predict()` using runtime subset
>   UMAP coords
>   - rejected because runtime and canonical UMAP are different manifolds; HDBSCAN
>     decision boundaries from the full-data fit do not apply to subset manifold coordinates.
> - **Refit HDBSCAN on runtime subset**: incorrect for the same reason: a subset-trained
>   cluster UMAP produces different boundaries, so predicted labels would diverge from the
>   canonical labels stored in `samples.jsonl`.

### `parametric`

```text
my_dataset/
├── umap_model_cluster/
├── umap_model_2d/
├── umap_model_3d/
└── hdbscan_model.joblib
```

> `umap_model_2d/3d/cluster` are directories only for `parametric`, because Parametric UMAP saves a
> Keras model bundle rather than a single pickle.

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

- `projection.strategy`: `classic`, `two_pass`, or `parametric`
- `projection.canonical.umap_params`: full canonical 2D and 3D projection settings
- `projection.canonical.cluster_params`: full canonical cluster-space settings
- `projection.runtime`: runtime subset and reducer settings, only for `two_pass`
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

`raw_text` equals `text` when no template is used. `template` and `metadata` are omitted when not
applicable. `cluster_global`, `is_noise`, and `membership_strength` are always canonical
full-dataset labels.

### `used_subset.jsonl` for `two_pass`

`two_pass` writes one JSON line per subset point:

```json
{
  "index": 1234,
  "id": "pt_001234",
  "text": "a snowy owl on a branch",
  "cluster_global": 7,
  "is_noise": false,
  "membership_strength": 0.94
}
```

`index` points back into `compact_embeddings.npy` and `samples.jsonl`, so the exact subset vectors
can be reconstructed later from the full embedding matrix if needed.

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

| Flag             | Default   | Description                                                                             |
| ---------------- | --------- | --------------------------------------------------------------------------------------- |
| `--clip-type`    | `FLUX2`   | ComfyUI CLIPType. Use `FLUX` for Flux.1, `STABLE_DIFFUSION` for SD/SDXL, `SD3` for SD3. |
| `--encode-limit` | `0` (all) | Max texts to encode (applied before cleaning).                                          |

The dataset name stored in `dataset.json` always comes from the output folder name.

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

**Projection options**

| Flag                    | Default      | Description                                                    |
| ----------------------- | ------------ | -------------------------------------------------------------- |
| `--projection-strategy` | `parametric` | Projection build mode: `classic`, `two_pass`, or `parametric`. |
| `--umap-n-neighbors`    | `15`         | Canonical full-data UMAP n_neighbors.                          |
| `--umap-min-dist`       | `0.1`        | Canonical full-data UMAP min_dist.                             |
| `--umap-seed`           | `42`         | Canonical full-data seed.                                      |

**Canonical cluster options**

| Flag                       | Default | Description                                        |
| -------------------------- | ------- | -------------------------------------------------- |
| `--cluster-umap-dims`      | `10`    | Dimensions for the canonical cluster UMAP.         |
| `--cluster-umap-neighbors` | `30`    | n_neighbors for the canonical cluster UMAP.        |
| `--cluster-min-size`       | `30`    | HDBSCAN min_cluster_size for canonical clustering. |
| `--cluster-min-samples`    | `10`    | HDBSCAN min_samples for canonical clustering.      |

**Two-pass runtime options**

| Flag                               | Default | Description                                                            |
| ---------------------------------- | ------- | ---------------------------------------------------------------------- |
| `--runtime-subset-size`            | `20000` | Global target size for the saved runtime subset.                       |
| `--runtime-subset-seed`            | `42`    | Seed for subset selection.                                             |
| `--runtime-umap-n-neighbors`       | `15`    | Runtime reducer n_neighbors for the subset-trained runtime models.     |
| `--runtime-umap-min-dist`          | `0.1`   | Runtime reducer min_dist for the subset-trained runtime models.        |
| `--runtime-cluster-umap-dims`      | `10`    | Runtime cluster-space reducer dims for the subset-trained models.      |
| `--runtime-cluster-umap-neighbors` | `30`    | Runtime cluster-space reducer neighbors for the subset-trained models. |

Runtime options are accepted for every `create`, but they are only used when
`--projection-strategy two_pass`.

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

`add` is a ground-truth operation like `create`, not an approximation. It reloads the stored
`projection` settings from `dataset.json`, merges the new vectors into the full
`compact_embeddings.npy`, and rebuilds the dataset with the same strategy:

- `classic`: full classic reducers + HDBSCAN are refit on the merged dataset
- `two_pass`: the canonical full pass is recomputed, then the runtime subset and runtime reducers
  are regenerated
- `parametric`: the full Parametric UMAP reducers + HDBSCAN are refit on the merged dataset

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

### Classic strategy

```bash
python encode_cli.py create \
  --clip models/text_encoders/qwen_3_4b_fp4_flux2.safetensors \
  --clip-type FLUX2 \
  --input Gustavosta/Stable-Diffusion-Prompts \
  --hf-column Prompt \
  --encode-limit 5000 \
  --projection-strategy classic \
  --output datasets/sd_prompts_classic
```

### Two-pass strategy

```bash
python encode_cli.py create \
  --clip models/text_encoders/qwen_3_4b_fp4_flux2.safetensors \
  --clip-type FLUX2 \
  --input Gustavosta/Stable-Diffusion-Prompts \
  --hf-column Prompt \
  --encode-limit 50000 \
  --projection-strategy two_pass \
  --runtime-subset-size 20000 \
  --runtime-umap-n-neighbors 15 \
  --runtime-umap-min-dist 0.1 \
  --runtime-cluster-umap-dims 10 \
  --runtime-cluster-umap-neighbors 30 \
  --output datasets/sd_prompts_two_pass
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
