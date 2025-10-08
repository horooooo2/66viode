import { useUserStore } from '@/store/user'

const BASE_URL = 'https://66cg.6980.cc/api.php' // 根据实际项目修改
const TIMEOUT = 15000

// 请求队列（防重复提交）
// const pendingRequests = new Map()

 // 生成请求key
// const generateReqKey = (config) => {
//   return `${config.url}?${JSON.stringify(config.data)}&request_type=${config.method}`
// }

// 请求拦截
const requestInterceptor = (config) => {
  // 示例：添加全局header
  config.header = {
    ...config.header,
    'Content-Type': 'application/json',
	  'Token': uni.getStorageSync('storage_user_data')?.token || '',
  }

  // 防重复提交处理
  // const requestKey = generateReqKey(config)
  // if (pendingRequests.has(requestKey)) {
  //   return Promise.reject(new Error('请勿重复提交'))
  // }
  // pendingRequests.set(requestKey, config)
  
  return config
}

// 响应拦截
const responseInterceptor = (response) => {
	// console.log( '响应拦截 response ===',response )

  // 示例：处理特定状态码
  if (response?.statusCode === 401 || response?.data?.code === -999) {
    uni.reLaunch({ url: '/pages/login/index' })
    const userStore = useUserStore()
    userStore.logout()
    uni.showToast({
      title: '请先登录',
      icon: 'none',
      duration: 2000
    })
    return Promise.reject(new Error('请先登录'))
  }
  
  return response.data
}

// 错误处理
const errorHandler = (error) => {
  let errMsg = ''
  if (error.errno) {
    switch (error.errno) {
      case 6001: errMsg = '网络未连接'; break
      case 6002: errMsg = '请求超时'; break
      default: errMsg = `网络错误[${error.errno}]`
    }
  } else {
    errMsg = error.message || '请求失败'
  }
  
  uni.showToast({
    title: errMsg,
    icon: 'none',
    duration: 2000
  })
  
  return Promise.reject(error)
}

// 核心请求方法
const request = (options) => {
	// console.log( 'http options==',options )
  // 合并配置
  options = {
	 ...options,
    url: options.url.startsWith('http') ? options.url : BASE_URL + options.url,
    method: options.method || 'GET',
    data: options.data || {},
    header: options.header || {},
    timeout: options.timeout || TIMEOUT,
  }
  
  // 执行拦截器
  options = requestInterceptor(options) || options
  // console.log( 'options requestInterceptor ===',options )
  return new Promise((resolve, reject) => {
	if( options?.data?.loading ){
		uni.showLoading({ title: '', mask: true });
		delete options.data.loading;
	}
    uni.request({
      ...options,
      success: (res) => {
        try {
          const processedRes = responseInterceptor(res);
          // console.log('processedRes==', processedRes);
          resolve(processedRes)
        } catch (e) {
          reject(e)
        }
        uni.hideLoading();
      },
      fail: (err) => {
        errorHandler(err)
        reject(err);
        uni.hideLoading();
      },
      complete: () => {
        // 可添加全局loading控制
        uni.hideLoading()
      }
    })
  })
}

// 快捷方法
const http = {
  get(url, data={}, options = {}) {
    return request({
      url,
      data,
      method: 'GET',
      ...options
    })
  },
  
  post(url, data={}, options = {}) {
    return request({
      url,
      data,
      method: 'POST',
      ...options
    })
  },
  
  put(url, data, options = {}) {
    return request({
      url,
      data,
      method: 'PUT',
      ...options
    })
  },
  
  delete(url, data, options = {}) {
    return request({
      url,
      data,
      method: 'DELETE',
      ...options
    })
  },
  uploadFile(url, filePath, name = 'file', formData = {}, options = {}) {
    return new Promise((resolve, reject) => {
      uni.uploadFile({
        url: url.startsWith('http') ? url : BASE_URL + url,
        filePath,
        name,
        formData,
        header: {
          'Token': uni.getStorageSync('storage_user_data')?.token || '',
          ...options.header
        },
        success: (uploadRes) => {
          try {
            const data = JSON.parse(uploadRes.data)
            console.log('uploadRes data===', data)
            resolve(data)
          } catch (e) {
            reject('上传结果解析失败')
          }
        },
        fail: (err) => {
          reject(err.errMsg || '上传失败')
        }
      })
    })
  },
  baseURL:BASE_URL
}

export default http