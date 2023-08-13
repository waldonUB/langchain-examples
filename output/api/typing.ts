export interface AddAnnounceRequest {
  lang_id?: string;
  game_id?: string;
  server_id?: string;
  caption?: object;
  device_type?: string;
  time?: string;
  content?: object;
}

export interface AddAnnounceResponse {
  id?: number;
}

export interface CloseAnnounceRequest {
  id?: number;
  state?: number;
}

export interface CloseAnnounceResponse {
  res?: boolean;
}

export interface DeleteAnnounceRequest {
  id?: number;
}

export interface DeleteAnnounceResponse {
  res?: boolean;
}

export interface GetAnnounceDetailRequest {
  id?: number;
}

export interface GetAnnounceDetailResponse {
  lang_id?: string;
  game_id?: string;
  server_id?: string;
  caption?: object;
  device_type?: string;
  time?: string;
  content?: object;
}

export interface GetAnnounceListRequest {
  game_id?: string;
  author?: string;
  time?: string;
  device_type?: string;
  keyword?: string;
  state?: string;
  server_id?: string;
  lang_id?: string;
}

export interface GetAnnounceListResponse {
  headers?: object[];
  rows?: object[];
  counts?: number;
  sums?: object[];
  page_info?: object;
}

export interface UpdateAnnounceRequest {
  id?: number;
  lang_id?: string;
  game_id?: string;
  server_id?: string;
  caption?: object;
  device_type?: string;
  time?: string;
  content?: object;
}

export interface UpdateAnnounceResponse {
  res?: boolean;
}