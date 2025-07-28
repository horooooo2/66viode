// 基础配置
const BASE_URL = 'http://66cg.6980.cc/api.php' // 根据实际项目修改
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
    'Authorization': uni.getStorageSync('token') || ''
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
	console.log( '响应拦截 response ===',response )

  // 示例：处理特定状态码
  if (response.statusCode === 401) {
    uni.reLaunch({ url: '/pages/login/index' })
    return Promise.reject(new Error('请重新登录'))
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
	console.log( 'http options==',options )
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
  console.log( 'options requestInterceptor ===',options )
  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      success: (res) => {
        try {
          const processedRes = responseInterceptor(res)
          resolve(processedRes)
        } catch (e) {
          reject(e)
        }
      },
      fail: (err) => {
        errorHandler(err)
        reject(err)
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
  get(url, data, options = {}) {
    return request({
      url,
      data,
      method: 'GET',
      ...options
    })
  },
  
  post(url, data, options = {}) {
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
  }
}

export default http