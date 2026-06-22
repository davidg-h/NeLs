// Field names must match session_contracts.py exactly

export interface NelsPoint {
  id: string | number;
  view_coords: [number, number] | [number, number, number];
  coords_2d?: [number, number];
  coords_3d?: [number, number, number];
  label?: string;
  metadata?: {
    cluster_global?: number;
    is_noise?: boolean;
    membership_strength?: number;
    [key: string]: unknown;
  };
}

export interface NelsSourceConfig {
  dataset_path?: string;
  load_mode?: string;
  count?: number;
  window_start?: number;
  random_seed?: number;
}

export interface NelsEmbeddingMeta {
  dataset_name?: string;
  sample_count?: number;
  embedding_dim?: number;
  encoder?: string;
  source_dataset?: string;
}

export interface NelsSnapshotSource extends NelsEmbeddingMeta {
  umap_params?: Record<string, unknown>;
  cluster_labels?: Record<string, string>;
}

export interface NelsGraphSnapshot {
  points: NelsPoint[];
  source_config?: NelsSourceConfig;
  source?: NelsSnapshotSource;
  projection_mode?: string;
}

export interface NelsUiState {
  selected_point_ids: string[];
  operation: string;
  neighbor_count: number;
  alpha_schedule: number[];
  nearest_sample: boolean;
  variant_count: number;
  variation_strength: number;
  axis_group_a: string[];
  axis_group_b: string[];
  probe_coords: number[] | null;
  probe_mode: "2d" | "3d";
  probe_text_recon: boolean;
  probe_recon_max_minutes: number;
  probe_recon_max_iter: number;
  probe_seed_count: number;
  probe_noise_count: number;
  probe_negative_count: number;
  viewport: { x: number; y: number; ratio: number };
  state_revision?: number;
}

export interface NelsNeighbor {
  id?: string;
  score: number;
  query_id?: string;
}

export interface NearestSample {
  id: string;
  label: string;
  distance: number;
}

export interface TrajectoryStepTr {
  index: number;
  id: string;
  alpha: number;
  norm?: number;
  metadata?: Record<string, unknown>;
  nearest_top_k?: NearestSample[];
}

export interface TrajectoryOverlayPoint {
  id: string;
  alpha: number;
  label?: string;
  cluster_id?: number | null;
  source_text_pair?: number;
  coords_2d?: [number, number];
  coords_3d?: [number, number, number];
}

export interface AxisProjectionScore {
  id: string;
  label: string;
  projection_score: number;
}

export interface ProbeContextItem {
  id: string;
  label: string;
}

export interface ConsistencyVariant {
  id: string;
  text: string;
  cosine_sim: number;
  cluster_id?: number | null;
  coords_2d?: [number, number];
  coords_3d?: [number, number, number];
}

export interface NelsOperationResult {
  operation: string;
  request_id?: string;
  source_point_id?: string;
  source_point_ids?: string[];
  source_group_a?: string[];
  source_group_b?: string[];
  neighbors?: NelsNeighbor[];
  selection?: { selected_point_ids: string[] };
  trajectory?: TrajectoryStepTr[];
  trajectory_overlay?: TrajectoryOverlayPoint[];
  trajectory_overlay_warning?: string;
  axis_projection?: AxisProjectionScore[];
  axis_label?: string;
  axis_b_projection?: AxisProjectionScore[];
  axis_b_label?: string;
  axis_b_variance?: number;
  inverse_project?: Array<{ id: string; label: string; score: number }>;
  text_reconstruction?: {
    text: string;
    cosine_sim: number;
    initial_context?: {
      seeds: ProbeContextItem[];
      noise: ProbeContextItem[];
      negatives: ProbeContextItem[];
    };
  };
  consistency_variants?: ConsistencyVariant[];
  consistency_score?: number;
  mean_intra?: number;
  mean_inter?: number;
  seed_point_id?: string;
  seed_prompt?: string;
}

export interface NelsEvent {
  session_id?: string;
  event_type?: string;
  sequence?: number;
  timestamp?: number;
  state_revision?: number;
  node_name?: string;
  message?: string;
  status?: string;
  payload?: unknown;
}

export interface NelsSession {
  session_id: string;
  session_node_id: string | null;
  label: string;
  source_config?: NelsSourceConfig;
  ui_state?: NelsUiState;
  graph_snapshot?: NelsGraphSnapshot;
  operation_result?: NelsOperationResult;
  events?: NelsEvent[];
}

export interface GraphData {
  points: NelsPoint[];
  byId: Map<string, NelsPoint>;
  bounds: { minX: number; maxX: number; minY: number; maxY: number };
}

export interface CanvasSessionPayload {
  session_node_id: string;
  session_label: string;
  source_config: NelsSourceConfig;
}
