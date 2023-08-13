import type { AddAnnounceRequest, AddAnnounceResponse, CloseAnnounceRequest, CloseAnnounceResponse, DeleteAnnounceRequest, DeleteAnnounceResponse, GetAnnounceDetailRequest, GetAnnounceDetailResponse, GetAnnounceListRequest, GetAnnounceListResponse, UpdateAnnounceRequest, UpdateAnnounceResponse } from './typing.ts';
// utils 
import request from '@/utils/request';
/**
  * 添加公告
  */
 export async function addAnnounce(params: AddAnnounceRequest): Promise<AddAnnounceResponse> {
   return request.post('/api/support_system/announce/add', params);
 }

 /**
  * 关闭/开启公告
  */
 export async function closeAnnounce(params: CloseAnnounceRequest): Promise<CloseAnnounceResponse> {
   return request.post('/api/support_system/announce/close', params);
 }

 /**
  * 删除公告
  */
 export async function deleteAnnounce(params: DeleteAnnounceRequest): Promise<DeleteAnnounceResponse> {
   return request.post('/api/support_system/announce/delete', params);
 }

 /**
  * 获取公告详情
  */
 export async function getAnnounceDetail(params: GetAnnounceDetailRequest): Promise<GetAnnounceDetailResponse> {
   return request.post('/api/support_system/announce/detail', params);
 }

 /**
  * 获取公告列表
  */
 export async function getAnnounceList(params: GetAnnounceListRequest): Promise<GetAnnounceListResponse> {
   return request.post('/api/support_system/announce/list', params);
 }

 /**
  * 修改公告
  */
 export async function updateAnnounce(params: UpdateAnnounceRequest): Promise<UpdateAnnounceResponse> {
   return request.post('/api/support_system/announce/update', params);
 }