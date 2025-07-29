
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

//退出登录
export const apiLogout = (params) =>{
	return http.post('/user/logout',params);
}

//修改密码
export const apiChangePassword = (params) =>{
	return http.post('/user/change_password',params);
}

//换绑手机
export const apiBindMobile = (params) =>{
	return http.post('/user/bind_mobile',params);
}

//修改邮箱
export const apiChangeEmail = (params) =>{
	return http.post('/user/change_email',params);
}

//上传头像
export const apiUploadAvatar = (params) =>{
	return http.post('/user/upload_avatar',params);
}
//修改资料
export const apiUpdateProfile = (params) =>{
	return http.post('/user/update_profile',params);
}
//获取用户信息
export const apiGetUserInfo = (params) =>{
	return http.get('/user/info',params);
}