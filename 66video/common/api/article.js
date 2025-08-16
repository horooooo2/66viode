
import http from './http.js'

//获取吃瓜分类
export const apiGetArticleCategories = (params) =>{
	return http.get('/article/categories',params);
}

//获取吃瓜文章列表
export const apiGetArticleList = (params) =>{
	return http.get('/article/list',params);
}

//获取吃瓜文章详情
export const apiGetArticleDetail = (params) =>{
	return http.get('/article/detail',params);
}