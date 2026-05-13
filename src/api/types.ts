// Field names must match session_contracts.py exactly.

export interface NelsPoint {
  id: string | number;
  coords: [number, number] | [number, number, number];
  coords_2d?: [number, number];
  coords_3d?: [number, number, number];
  label?: string;
  metadata?: {
    cluster?: number | string; // may arrive as string e.g. "class_0" — always parseInt before use
    [key: string]: unknown;
  };
}

export interface NelsEdge {
  source: string | number;
  target: string | number;
}

export interface NelsSourceConfig {
  dataset_path?: string;
  load_mode?: string;
  count?: number;
  window_start?: number;
  random_seed?: number;
  edge_mode?: string;
  neighbor_count?: number;
  source_config_hash?: string;
  dataset_id?: string;
  knn_k?: number;
}

export interface NelsGraphSnapshot {
  points: NelsPoint[];
  edges: NelsEdge[];
  source_config?: NelsSourceConfig;
  projection_mode?: string;
  edge_mode?: string;
}

export interface NelsUiState {
  selected_point_ids: string[];
  operation: string;
  metric_mode: string;
  neighbor_count: number;
  alpha_schedule: string;
  projection_mode: string;
  edge_mode: string;
  viewport: { x: number; y: number; ratio: number };
  state_revision?: number;
}

export interface NelsNeighbor {
  point_id?: string;
  id?: string;
  distance: number;
  query_id?: string;
}

export interface NelsOperationResult {
  operation: string;
  request_id?: string;
  status?: string;
  source_point_id?: string;
  source_point_ids?: string[];
  neighbors?: NelsNeighbor[];
  points?: NelsPoint[];
  selection?: { selected_point_ids: string[] };
}

export interface NelsMetricsResult {
  metric_mode?: string;
  status?: string;
  [key: string]: unknown;
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
  session_node_id: string;
  label: string;
  source_config?: NelsSourceConfig;
  ui_state?: NelsUiState;
  graph_snapshot?: NelsGraphSnapshot;
  source_snapshot?: NelsGraphSnapshot;
  operation_result?: NelsOperationResult;
  metrics?: NelsMetricsResult;
  events?: NelsEvent[];
  dataset_id?: string;
}

export interface GraphData {
  points: NelsPoint[];
  edges: NelsEdge[];
  byId: Map<string, NelsPoint>;
  adjacency: Map<string, Set<string>>;
  degrees: Map<string, number>;
  bounds: { minX: number; maxX: number; minY: number; maxY: number };
}

export interface CanvasSessionPayload {
  session_node_id: string;
  session_label: string;
  source_config: NelsSourceConfig;
}
