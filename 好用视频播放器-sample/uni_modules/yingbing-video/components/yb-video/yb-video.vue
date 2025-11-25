<template>
	<view class="yingbing-video" :class="{'yingbing-video-full': fullscreen}" :style="[boxStyle]">
		<!-- #ifdef H5 || APP-VUE -->
		<!-- 根据平台选择加载方式因为IOS使用WKWebview内核时严格执行同源策略，对于iframe加载本地网页以及非同源线上网页都有很大的限制，无法操作iframe内容 -->
		<r-video v-if="renderType == 'renderjs'" ref="web" class="yb-iframe" @message="handleMessage" @destroyed='handleDestroy'>
			<slot></slot>
		</r-video>
		<r-iframe v-else ref="web" class="yb-iframe"
		crossOrigin="anonymous"
		:src="webSrc" @message="handleMessage" :loading-show="false" @destroyed='handleDestroy'></r-iframe>
		<!-- #endif -->
		<!-- #ifdef APP-NVUE -->
		<web-view style="flex: 1;" ref="web" :src="webSrc" @onPostMessage="handleMessage"></web-view>
		<!-- #endif -->
	</view>
</template>

<script>
	// #ifdef APP-VUE || H5
	import RIframe from '../modules/iframe.vue'
	import RVideo from '../modules/video.vue'
	// #endif
	export default {
		// #ifdef APP-VUE || H5
		components: {RIframe, RVideo},
		// #endif
		props: {
			//iframe或者webview访问的自定义src
			webSrc: {
				type: String,
				default: () => {
					const path = '/uni_modules/yingbing-video/static/html/video.html'
					// #ifdef H5
					const isHash = window.location.hash
					const pages = getCurrentPages()
					const page = pages[pages.length-1]
					const pathName = isHash ? window.location.pathname : window.location.pathname.replace(page.route, '')
					return window.location.origin + pathName + path.substring(1)
					// #endif
					// #ifdef APP-VUE
					return '.' + path
					// #endif
					// #ifdef APP-NVUE
					return path
					// #endif
				}
			},
			//播放链接
			src: {
				type: String,
				default: ''
			},
			//切片列表
			segments: {
				type: Array,
				default: () => []
			},
			//封面
			poster: {
				type: String,
				default: ''
			},
			//标题
			title: {
				type: String,
				default: ''
			},
			//解码类型 auto-自动判断 hls-使用hls.js加载 flv-使用flv.js加载 video-使用video加载
			type: {
				type: String,
				default: 'auto'
			},
			//初始化时间
			initialTime: {
				type: Number,
				default: 0
			},
			//自定义最大播放时长
			duration: {
				type: Number,
				default: 0
			},
			//3D模式 none-关闭3D 360-360全景
			three: {
				type: String,
				default: 'none'
			},
			//自动播放（不保证能执行）
			autoplay: {
				type: Boolean,
				default: false
			},
			//预加载 auto-浏览器尽可能地预加载整个视频文件 metadata-仅预加载视频的元数据 none-不预加载视频
			preload: {
				type: String,
				default: 'auto'
			},
			//静音
			muted: {
				type: Boolean,
				default: false
			},
			//播放倍速
			playbackRate: {
				type: Number,
				default: 1
			},
			//循环播放
			loop: {
				type: Boolean,
				default: false
			},
			//直播流
			isLive: {
				type: Boolean,
				default: false
			},
			//非全屏时是否显示头部控制栏
			header: {
				type: Boolean,
				default: false
			},
			//是否显示底部控制栏
			controls: {
				type: Boolean,
				default: false
			},
			//视频组件高度 auto-自适应高度 百分比-根据屏幕高度计算 px/rpx-像素高度
			height: {
				type: String,
				default: 'auto'
			},
			//当视频宽高超出容器时的表现形式 fill-内容拉伸填充 contain-保持比例内容缩放 cover-保持比例内容可能被剪切 none-内容不重置 scale-down-保持比例从none或contain选一个 initial-默认值
			objectFit: {
				type: String,
				default: 'contain'
			},
			//跨域属性 anonymous-它有一个默认值。它定义了将在不传递凭据信息的情况下发送CORS请求 use-credentials-将发送带有凭据、cookie 和证书的 cross-origin 请求
			crossOrigin: {
				type: String,
				default: ''
			},
			//开启全屏时的屏幕方向
			openDirection: {
				type: String,
				default: ''
			},
			//退出全屏时的屏幕方向
			exitDirection: {
				type: String,
				default: ''
			},
			//弹幕列表
			danmu: {
				type: Array,
				default: () => []
			},
			//画质列表
			quality: {
				type: Array,
				default: () => []
			},
			//分p列表
			works: {
				type: Array,
				default: () => []
			},
			//分P默认索引
			workIndex: {
				type: Number,
				default: -1
			},
			//字幕列表
			subtitles: {
				type: Array,
				default: () => []
			},
			//字幕默认索引
			subtitleIndex: {
				type: Number,
				default: -1
			},
			//自定义配置
			custom: {
				type: Object,
				default: () => ({})
			},
			//hls配置
			hlsConfig: {
				type: Object,
				default: () => ({})
			},
			//flv配置
			flvConfig: {
				type: Object,
				default: () => ({})
			},
			//jsmpeg配置
			jsmpegConfig: {
				type: Object,
				default: () => ({})
			},
			//渲染类型 APP-NVUE只能使用web网页加载得方式渲染
			// #ifdef APP-NVUE
			renderType: {
				type: String,
				default: 'web'
			},
			// #endif
			//渲染类型
			// #ifdef APP-VUE || H5
			renderType: {
				type: String,
				default: () => {
					//如果是ios平台，默认使用renderjs方式渲染
					if ( uni.getSystemInfoSync().platform == 'ios' ) {
						return 'renderjs'
					} else {
						return 'web'
					}
				}
			}
			// #endif
		},
		computed: {
			boxStyle () {
				return this.height == 'inherit' ? {
					height: this.boxHeight,
					flex: 1
				} : {
					height: this.boxHeight
				}
			}
		},
		data () {
			return {
				ready: false,
				boxHeight: '',
				videoWidth: 0,
				videoHeight: 0,
				fullscreen: false,
				customHandles: {},//自定义处理方法
				slotHandles: {},//存储插槽中的点击函数
				toolHandles: {}//存储工具栏中的点击函数
			}
		},
		beforeDestroy() {
			this._removeBackbuttonListener()
		},
		created() {
			//获取当前运行的平台
			this.updateHeight()
		},
		methods: {
			//接收消息
			handleMessage (e) {
				// #ifdef APP-NVUE
				e.detail.data.forEach(item => {
					this.parseMessage(item)
				})
				// #endif
				// #ifdef H5 || APP-VUE
				//使用uni.postMessage在h5传递消息，数据结构有很大不同需要找到对应数据
				this.parseMessage(e.data.type == 'WEB_INVOKE_APPSERVICE' ? e.data.data.arg : e.data)
				// #endif
			},
			//处理返回的消息
			async parseMessage (data) {
				//加载视频
				if ( data.ready ) {
					this.ready = true
					if ( this.src || (this.segments && this.segments.length) ) {
						this.reloadVideo()
					}
				}
				//视频销毁
				if ( data.destroyed ) {
					if ( this.renderType != 'renderjs' ) this.$refs.web && this.$refs.web.destroy && this.$refs.web.destroy()
				}
				//记录视频尺寸，更新视频高度
				if ( data.loadeddata ) {
					this.videoWidth = data.loadeddata.videoWidth
					this.videoHeight = data.loadeddata.videoHeight
					this.updateHeight()
				}
				//用户点击了插槽内容，触发了点击函数
				if ( data.slotclick ) {
					this.slotHandles[data.slotclick] && this.slotHandles[data.slotclick]()//触发存储的函数
				}
				//用户点击了工具栏，触发了点击函数
				if ( data.toolclick ) {
					this.toolHandles[data.toolclick] && this.toolHandles[data.toolclick]()//触发存储的函数
				}
				// #ifdef APP-PLUS
				//用户在非5+环境点击了保存截图
				if ( data.capturesaved ) {
					if ( data.capturesaved.code != 200 ) {
						this.saveBase64ImageToAlbum(data.capturesaved.data.base64, data.capturesaved.fileName).then(path => {
							this.showToast('保存到相册成功')
						}).catch(() => {
							this.showToast('保存到相册失败')
						})
					}
				}
				//设置亮度
				if ( data.seeklight >= 0 ) {
					if ( this.customHandles.setLight ) {
						this.customHandles.setLight(data.seeklight)
					} else {
						uni.setScreenBrightness({
							value: data.seeklight
						})
					}
				}
				//设置音量
				if ( data.seekvolume >= 0 ) {
					if ( this.customHandles.setVolume ) {
						this.customHandles.setVolume(data.seekvolume)
					} else {
						plus.device.setVolume(data.seekvolume)
					}
				}
				//方向改变监听
				if ( data.directionchange ) {
					if ( data.directionchange.code != 200 ) {//锁定屏幕方向失败
						var direction = data.directionchange.to//预期屏幕方向
						if ( direction ) plus.screen.lockOrientation(direction)//锁定屏幕方向
						else plus.screen.unlockOrientation()//解除屏幕方向锁定
					}
				}
				//APP全屏改变监听
				if ( data.fullscreenchange ) {
					if ( data.fullscreenchange.type == 'css' ) {//使用css模拟全屏
						this.fullscreen = data.fullscreenchange.fullscreen
						if ( this.fullscreen ) {
							plus.navigator.setFullscreen(true)//调用系统全屏
							plus.navigator.hideSystemNavigation()//隐藏系统导航栏
						} else {
							plus.navigator.setFullscreen(false)//退出系统全屏
							setTimeout(function () {//不延迟，无法重新显示导航栏
								plus.navigator.showSystemNavigation()//隐藏系统导航栏
							}, 200)
						}
						if ( this.fullscreen ) {
							this._bindbackbutton = this.exitFullscreen.bind(this)
							plus.key.addEventListener("backbutton",this._bindbackbutton);//增加返回键监听，用于点击返回退出全屏
						} else {
							this._removeBackbuttonListener()//移除返回键监听事件
						}
					}
					if( !data.fullscreenchange.fullscreen ) this.updateHeight()//考虑到全屏时可能会加载新视频，退出全屏需要重新更新高度
				}
				// #endif
				
				// #ifdef H5
				//H5全屏改变监听
				if ( data.fullscreenchange ) {
					if ( data.fullscreenchange.type == 'css' ) {//使用css模拟全屏
						this.fullscreen = data.fullscreenchange.fullscreen
					}
					if ( !data.fullscreenchange.fullscreen ) this.updateHeight() //考虑到全屏时可能会加载新视频，退出全屏需要重新更新高度
				}
				// #endif
				//派发事件
				Object.keys(data).forEach(key => {
					if ( key != 'destroyed' ) this.$emit(key, data[key])
				})
			},
			//移除返回键监听
			_removeBackbuttonListener () {
				if ( this._bindbackbutton ) {
					plus.key.removeEventListener("backbutton",this._bindbackbutton);
					this._bindbackbutton = null
				}
			},
			//处理custom中的函数
			_traverseObject(obj, handleName) {
                if (typeof obj !== 'object' || obj === null) {
                    return;
                }
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        const value = obj[key];
                        if (typeof value === 'function') {
                           const id = new Date().getTime().toString() + Math.round(Math.random() * 10000)
						   this[handleName][id] = value
						   obj[key] = id
                        } else if (typeof value === 'object' && value !== null) {
                            this._traverseObject(value, handleName);
                        }
                    }
                }
            },
			//深度克隆数据，避免数据污染
			_deepClone (obj) {
				if(typeof obj !== "object" && typeof obj !== 'function') {
					//原始类型直接返回
				    return obj;
				}
				var o = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {}; 
				for(let i in obj) {  
				    if(obj.hasOwnProperty(i)){ 
				        o[i] = i === 'loader' ? '' : typeof obj[i] === "object" ? this._deepClone(obj[i]) : obj[i]; 
				    } 
				} 
				return o;
			},
			//更新高度
			updateHeight () {
				if ( this.updateTimer ) {
					clearTimeout(this.updateTimer)
					this.updateTimer = null
				}
				this.updateTimer = setTimeout(() => {
					//计算自适应高度
					if ( this.height == 'auto' && this.videoWidth ) {
						const windowWidth = uni.getSystemInfoSync().windowWidth
						const rate = windowWidth / this.videoWidth
						this.boxHeight = (this.videoHeight * rate) + 'px'
					}
					//继承父级高度
					if ( this.height == 'inherit' ) {
						this.boxHeight = '100%'
					}
					//像素高度
					if ( this.height.includes('px') ) {
						this.boxHeight = this.height
					}
					//计算百分比高度
					if ( this.height.includes('%') ) {
						const windowHeight = uni.getSystemInfoSync().windowHeight
						this.boxHeight = (windowHeight * (this.height.replace('%', '') / 100)) + 'px'
					}
					//去更新视频内部画布的尺寸
					this.$nextTick(() => {
						this.evalJS('updateSize')
					})
				}, 100)
			},
			//处理自定义配置
			async parseCustom () {
				const custom = this._deepClone(this.custom)
				//APP端设置初始化亮度和音量值
				// #ifdef APP-PLUS
				const initialLight = await this.getLight()
				const initialVolume = await this.getVolume()
				const gesture = custom.gesture || {}
				gesture.initialLight = gesture.initialLight || initialLight
				gesture.initialVolume = gesture.initialVolume || initialVolume
				custom.gesture = gesture
				// #endif
				//H5端，不能通过手势操作亮度和音量
				// #ifdef H5
				const gesture = custom.gesture || {}
				gesture.disableLight = true
				gesture.disableVolume = true
				custom.gesture = gesture
				// #endif
				//尝试获取自定义设置音量和亮度的方法
				this.customHandles.setLight = gesture.setLight
				this.customHandles.setVolume = gesture.setVolume
				this.customHandles.getLight = gesture.getLight
				this.customHandles.getVolume = gesture.getVolume
				gesture.setLight = null
				gesture.setVolume = null
				gesture.getLight = null
				gesture.getVolume = null
				//重置插槽函数
				this.slotHandles = {}
				this._traverseObject(custom, 'slotHandles')
				return custom
			},
			//处理文件链接（针对本地链接）
			parseSrc (src) {
				//本地static文件夹下的文件需要单独处理路径，否则无法加载
				if ( src.startsWith('/static') ) {
					// #ifdef H5
					const isHash = window.location.hash
					const pages = getCurrentPages()
					const page = pages[pages.length-1]
					const pathName = isHash ? window.location.pathname : window.location.pathname.replace(page.route, '')
					return window.location.origin + pathName + src.substring(1)
					// #endif
					// #ifdef APP-PLUS
					return plus.io.convertLocalFileSystemURL(src)
					// #endif
				}
				return src
			},
			//处理工具栏配置
			parseTool (data) {
				this.toolHandles = {}
				this._traverseObject(data, 'toolHandles')
				return data
			},
			//处理字幕|画质的链接
			parseList (data) {
				return data.map(item => {
					return {...item, src: this.parseSrc(item.src)}
				})
			},
			//处理切片列表链接
			parseSegments (data) {
				return data.map(item => {
					return {...item, url: this.parseSrc(item.url)}
				})
			},
			//处理通信参数
			parseArg (arg) {
				//必须转义2次，否则通信时可能会丢失字符
				return encodeURIComponent(encodeURIComponent(JSON.stringify(arg)))
			},
			//重加载视频
			async reloadVideo () {
				const arg = {
					src: this.parseSrc(this.src),
					segments: this.parseSegments(this.segments),
					title: this.title,
					poster: this.poster,
					type: this.type,
					three: this.three,
					initialTime: this.initialTime,
					duration: this.duration,
					autoplay: this.autoplay,
					preload: this.preload,
					muted: this.muted,
					loop: this.loop,
					playbackRate: this.playbackRate,
					isLive: this.isLive,
					header: this.header,
					controls: this.controls,
					objectFit: this.objectFit,
					crossOrigin: this.crossOrigin,
					openDirection: this.openDirection,
					exitDirection: this.exitDirection,
					quality: this.parseList(this.quality),
					works: this.works,
					workIndex: this.workIndex,
					subtitles: this.parseList(this.subtitles),
					subtitleIndex: this.subtitleIndex,
					custom: await this.parseCustom(),
					flvConfig: this.flvConfig,
					hlsConfig: this.hlsConfig,
					jsmpegConfig: this.jsmpegConfig
				}
				this.evalJS('reloadVideo', arg)
			},
			//卸载视频
			unload () {
				this.evalJS('destroy')
			},
			//加载弹幕
			loadDanmu () {
				// #ifdef APP-VUE || H5
				if ( this.renderType == 'renderjs' ) {
					this.evalJS('loadDanmu', this.danmu)
				} else {
					this.$refs.web && this.$refs.web.setData('danmu', this.danmu)
					setTimeout(() => {
						this.evalJS('loadDanmu')
					}, 100)
				}
				// #endif
				// #ifdef APP-NVUE
				const size = 100//分成100组传入，不然可能会超过字符串最大传输限制
				const list = this.danmu || []
				const len = Math.ceil(list.length / size)
				for ( let i = 0 ; i < len; i++ ) {
					const arr = list.slice(i * size, (i + 1) * size)
					const arg = {code: i < len - 1 ? 0 : 1, data: arr}
					this.evalJS('setDanmuData', arg)
				}
				// #endif
			},
			//卸载弹幕
			unloadDanmu () {
				this.evalJS('unloadDanmu')
			},
			//发送弹幕
			sendDanmu (danmu, border) {
				this.evalJS('sendDanmu', danmu, border)
			},
			//插入弹幕
			insertDanmu (danmu) {
				this.evalJS('insertDanmu', danmu)
			},
			//动态修改video属性
			setVideo (key, value) {
				this.evalJS('setVideo', key, value)
			},
			//重加载自定义配置
			reloadCustom () {
				if ( this.customTimer ) {
					clearTimeout(this.customTimer)
					this.this.customTimer = null
				}
				this.customTimer = setTimeout(async () => {
					const custom = await this.parseCustom()
					this.evalJS('reloadCustom', custom)
				}, 200)
			},
			//更新配置
			updateConfig () {
				if ( this.updateTimer ) {
					clearTimeout(this.updateTimer)
					this.updateTimer = null
				}
				this.updateTimer = setTimeout(() => {
					const arg = {
						header: this.header,
						controls: this.controls
					}
					this.evalJS('updateConfig', arg)
				}, 200)
			},
			//播放视频
			play () {
				this.evalJS('play')
			},
			//暂停视频
			pause () {
				this.evalJS('pause')
			},
			//播放和暂停视频
			toggle () {
				this.evalJS('toggle')
			},
			/**
			 * 跳转视频
			 * @param {Number} time 跳转位置（单位秒）
			*/
			seek (time) {
				this.evalJS('seek', time)
			},
			/**
			 * 开启视频全屏
			 * @param {String} direction 屏幕方向 auto-自动计算 landscape-横屏 portrait-竖屏
			*/
			openFullscreen (direction) {
				this.evalJS('openFullscreen', direction)
			},
			//退出全屏
			exitFullscreen () {
				this.evalJS('exitFullscreen')
			},
			/**
			 * 截图
			 * @param {String} type video-使用video标签截图 3D-3D模式下截图渲染的canvas
			 * @param {String} show 是否展示截图弹窗
			*/
			capture (type, show = true) {
				this.evalJS('capture', {type, show})
			},
			//消息提示
			showToast (data) {
				this.evalJS('showToast', data)
			},
			//展示工具栏
			showToolbar (data) {
				if ( typeof data == 'object' ) data = this.parseTool(data)
				this.evalJS('showToolbar', data)
			},
			//禁用手势事件
			disableGesture () {
				this.evalJS('disableGesture')
			},
			//启用手势事件
			enableGesture () {
				this.evalJS('enableGesture')
			},
			//获取屏幕亮度
			async getLight () {
				//是否传入了自定义获取亮度方法
				if ( this.customHandles.getLight ) {
					return await this.customHandles.getLight()
				} else {
					return new Promise(resolve => {
						uni.getScreenBrightness({
							success: res => {
								resolve(res.value)
							}
						})
					})
				}
			},
			//获取设备音量
			getVolume () {
				//是否传入了自定义获取音量方法
				if ( this.customHandles.getVolume ) {
					return this.customHandles.getVolume()
				} else {
					return plus.device.getVolume() 
				}
			},
			//监听组件销毁
			handleDestroy () {
				this.$emit('destroyed')
			},
			//保存base64图片到相册
			saveBase64ImageToAlbum (base64, fileName) {
				return new Promise((resolve, reject) => {
					const basePath = '_doc'
					const dirPath = 'uniapp_temp'
					const tempFilePath = basePath + '/' + dirPath + '/' + fileName
					const bitmap = new plus.nativeObj.Bitmap(fileName)
					bitmap.loadBase64Data(base64, function() {
					    bitmap.save(tempFilePath, {}, function() {
					        bitmap.clear()
							plus.gallery.save(tempFilePath, function (e) {
								resolve(e.path)
							}, function (error) {
								reject(error)
							});
					    }, function(error) {
					        bitmap.clear()
							reject(error)
					    })
					}, function(error) {
					    bitmap.clear()
						reject(error)
					})
				})
			},
			//注入js，根据平台不同调用方式不同
			evalJS (name, ...args) {
				//生成注入js函数名
				let functionName = name + '('
				//拼接参数
				args.forEach(arg => {
					if ( typeof arg == 'object' ) {
						//是对象需要转义并加上双引号
						functionName += '"' + this.parseArg(arg) + '",'
					} else if ( typeof arg == 'string' ) {
						//字符串加上双引号
						functionName += '"' + arg + '",'
					} else {
						//其它类型直接拼接
						functionName += arg + ','
					}
				})
				//去掉最后一个逗号
				const lastIndex = functionName.lastIndexOf(',')
				if ( lastIndex > -1 ) functionName = functionName.substr(0, lastIndex)
				//收尾括号
				functionName += ');'
				// #ifdef APP-VUE || H5
				//如果时renderjs渲染方式，直接调用内部方法
				if ( this.renderType == 'renderjs' ) this.$refs.web && this.$refs.web[name](...args)
				//iframe渲染，注入js函数
				else this.$refs.web && this.$refs.web.evalJS(functionName)
				// #endif
				// #ifdef APP-NVUE
				//webview渲染，注入js函数
				this.$refs.web && this.$refs.web.evalJS(functionName)
				// #endif
			}
		},
		watch: {
			//监听播放链接
			src (newVal) {
				if ( newVal && this.ready ) {
					this.reloadVideo()
				}
			},
			//监听切片列表
			segments: {
				handler(newVal, oldVal) {
					//src播放链接权重比切片列表高，传入播放链接的情况下不监听segments
					if ( !this.src ) this.reloadVideo()
				},
				deep: true
			},
			//监听静音属性
			muted (newVal) {
				this.setVideo('muted', newVal)
			},
			//监听倍速属性
			playbackRate (newVal) {
				this.setVideo('playbackRate', newVal)
			},
			//监听循环属性
			loop (newVal) {
				this.setVideo('loop', newVal)
			},
			//监听高度
			height (newVal) {
				this.updateHeight()
			},
			//监听header
			header () {
				this.updateConfig()
			},
			//监听controls
			controls () {
				this.updateConfig()
			},
			//深度监听custom
			custom: {
			  handler(newVal, oldVal) {
				this.reloadCustom()
			  },
			  deep: true
			}
		}
	}
</script>

<style>
	/* #ifndef APP-NVUE */
	.yingbing-video {
		width: 100%;
	}
	.yb-iframe {
		width: 100%;
		height: 100%;
	}
	/* #endif */
	.yingbing-video-full {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100vw!important;
		height: 100vh!important;
		z-index: 9999999;
	}
</style>
