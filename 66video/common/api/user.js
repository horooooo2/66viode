
import http from './http.js'

//发送验证码
export const apiSendCode = (params) =>{
	return http.post('/user/send_code',params);
}

//登录
export const apiLogin = (params) =>{
	return http.post('/user/login',params);
}

//注册
export const apiRegister = (params) =>{
	return http.post('/user/register',params);
}