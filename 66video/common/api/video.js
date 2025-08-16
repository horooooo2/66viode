
import http from './http.js'
//获取视频分类
export const apiGetVideoCategories = (params) =>{
	return http.get('/video/categories',params);
}

//获取视频列表
export const apiGetVideoList = (params) =>{
	return http.get('/video/list',params);
}

//获取视频详情
export const apiGetVideoDetail = (params) =>{
	return http.get('/video/detail',params);
}