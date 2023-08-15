import type { AddAnnounceRequest, AddAnnounceResponse, DeleteAnnounceRequest, DeleteAnnounceResponse, UpdateAnnounceRequest, UpdateAnnounceResponse } from './typing.ts';
// utils 
import request from '@/utils/request';
/**
  * 新增公告
  */
export async function add_announce_api(params: AddAnnounceRequest): Promise<AddAnnounceResponse> {
  return request.post('/api/waldon/test-announce/add', params);
}

/**
  * 删除公告
  */
export async function delete_announce_api(params: DeleteAnnounceRequest): Promise<DeleteAnnounceResponse> {
  return request.post('/api/waldon/test-announce/delete', params);
}

/**
  * 修改公告
  */
export async function update_announce_api(params: UpdateAnnounceRequest): Promise<UpdateAnnounceResponse> {
  return request.post('/api/waldon/test-announce/update', params);
}