
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

//选择图片
export const chooseImage = () => {
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			count: 1,
			sizeType: ['compressed'],
			sourceType: ['album', 'camera'],
			success: (res) => {
				resolve(res.tempFilePaths[0]);
			},
			fail: (err) => {
				reject(err);
			}
		});
	});
}

//上传头像图片文件
export const uploadAvatarImage = (imagePath) => {
	return http.uploadFile('/user/upload_avatar', imagePath);
	/*return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: http.baseURL + '/user/upload_avatar',
			filePath: imagePath,
			name: 'file',
			header: {
				'Token': uni.getStorageSync('storage_user_data')?.token || '',
			},
			formData: {},
			success: (uploadRes) => {
				try {
					console.log('uploadRes ===', uploadRes);
					
					const data = JSON.parse(uploadRes.data);
					console.log('uploadRes data===', data);
					
					if (data.code === 0) {
						resolve(data);
					} else {
						reject(data || '上传失败');
					}
				} catch (e) {
					reject('上传结果解析失败');
				}
			},
			fail: (err) => {
				reject(err.errMsg || '上传失败');
			}
		});
	});*/
}


//修改资料
export const apiUpdateProfile = (params) =>{
	return http.post('/user/update_profile',params);
}
//获取用户信息
export const apiGetUserInfo = (params) =>{
	return http.get('/user/info',params);
}
//获取用户信息
export const apiGetVipInfo = (params) =>{
	return http.get('/vip/info',params);
}