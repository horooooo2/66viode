
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

//获取漫画分类
export const apiGetImageCategories = (params) =>{
	return http.get('/image/categories',params);
}

//获取漫画列表
export const apiGetImageList = (params) =>{
	return http.get('/image/list',params);
}

//获取漫画详情
export const apiGetImageDetail = (params) =>{
    return http.get('/image/detail',params);
}

//获取漫画目录
export const apiGetImageChapters = (params) =>{
	return http.get('/image/chapters',params);
}
//获取漫画章节内容
export const apiGetImageContent = (params) =>{
	return http.get('/image/content',params);
}

//获取小说分类
export const apiGetNovelCategories = (params) =>{
	return http.get('/novel/categories',params);
}

//获取小说列表
export const apiGetNovelList = (params) =>{
	return http.get('/novel/list',params);
}

//获取小说详情
export const apiGetNovelDetail = (params) =>{
    return http.get('/novel/detail',params);
}

//获取小说目录
export const apiGetNovelChapters = (params) =>{
	return http.get('/novel/chapters',params);
}
//获取小说章节内容
export const apiGetNovelContent = (params) =>{
	return http.get('/novel/content',params);
}


//获取评论
export const apiGetComments = (params) =>{
	return http.get('/comment/list',params);
}

//发表评论
export const apiAddComment = (params) =>{
	return http.post('/comment/add',params);
}

//获取喜欢收藏列表
export const apiGetLikeList = (params) =>{
	return http.get('/like/list',params);
}

//添加喜欢
export const apiAddLike = (params) =>{
	return http.post('/like/add',params);
}
//取消喜欢
export const apiRemoveLike = (params) =>{
	return http.post('/like/remove',params);
}

