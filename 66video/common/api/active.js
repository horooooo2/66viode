import http from './http.js'

// 获取任务活跃
export const apiTaskActive = () => {
	return http.get('/task/active')
}

// 获取任务分组
export const apiTaskGroup = () => {
	return http.get('/task/group')
}

// 获取任务分组下任务标签
export const apiTaskTag = (params) => {
	return http.get('/task/tag', params)
}

// 获取任务列表
export const apiTaskList = (params) => {
	return http.get('/task/list', params)
}

export const apiMissionRewards = (params) =>{
	return http.post('/task/claim',params);
}

export const apiMissionClaim = (params) =>{
	return http.post('/task/active/claim',params);
}
