export interface AddAnnounceRequest {
  announce_type: string;
  is_top: number;
  announce_content: string;
  publish_time?: string;
}

export interface AddAnnounceResponse {
  id: number;
}

export interface DeleteAnnounceRequest {
  id: number;
}

export interface DeleteAnnounceResponse {
  id: number;
}

export interface UpdateAnnounceRequest {
  id: number;
  announce_type: string;
  is_top: number;
  announce_content: string;
  publish_time?: string;
}

export interface UpdateAnnounceResponse {
  id: number;
}