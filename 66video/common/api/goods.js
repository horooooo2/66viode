import http from './http.js'

// 商品列表
export const apiGoodsList = (params) => {
	return http.get(`/mall/goods?page=${params.page}&limit=${params.limit}`);
}

// 商品详情
export const apiGoodsDetails = (params) => {
	return http.get(`/mall/goods_detail?id=${params.id}`)
}

// 收货地址列表
export const apiAddressList = (params) => {
	return http.get('/address/list', params)
}

// 新建收货地址
export const apiAddAddress = (params) => {
	return http.post('/address/add', params)
}

// 编辑收货地址
export const apiEditAddress = (params) => {
	return http.post('/address/edit', params)
}

// 删除收货地址
export const apiDelAddress = (params) => {
	return http.post('/address/delete', params)
}

// 查看收货地址
export const apiCheckAddress = (params) => {
	return http.get(`/address/detail?id=${params.id}`)
}

// 设置默认地址
export const apiSetAddress = (params) => {
	return http.post('/address/set_default', params)
}

// 订单列表
export const apiOrderList = (params) => {
	return http.get(`/mall/orders?page=${params.page}&limit=${params.limit}`)
}

// 创建订单
export const apiCreateOrder = (params) => {
	return http.post('/mall/create_order', params)
}

// 邀请好友-邀请规则
export const apiGetInviteRules = (params) =>{
	return http.get('/invite/rules',params);
}
