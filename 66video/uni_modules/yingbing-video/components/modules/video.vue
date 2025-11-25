<template>
	<view class="render-video" :class="'rvideo' + dataId"
	:dataId="dataId" :change:dataId="RenderVideo.dataIdWatcher"
	:videoParams="videoParams" :change:videoParams="RenderVideo.reloadVideoRender"
	:isUnload="isUnload" :change:isUnload="RenderVideo.destroyRender"
	:loadDanmuParams="loadDanmuParams" :change:loadDanmuParams="RenderVideo.loadDanmuRender"
	:isUnloadDanmu="isUnloadDanmu" :change:isUnloadDanmu="RenderVideo.unloadDanmuRender"
	:sendDanmuParams="sendDanmuParams" :change:sendDanmuParams="RenderVideo.sendDanmuRender"
	:insertDanmuParams="insertDanmuParams" :change:insertDanmuParams="RenderVideo.insertDanmuRender"
	:setVideoParams="setVideoParams" :change:setVideoParams="RenderVideo.setVideoRender"
	:reloadCustomParams="reloadCustomParams" :change:reloadCustomParams="RenderVideo.reloadCustomRender"
	:updateConfigParams="updateConfigParams" :change:updateConfigParams="RenderVideo.updateConfigRender"
	:isPlay="isPlay" :change:isPlay="RenderVideo.playRender"
	:isPause="isPause" :change:isPause="RenderVideo.pauseRender"
	:isToggle="isToggle" :change:isToggle="RenderVideo.toggleRender"
	:seekTime="seekTime" :change:seekTime="RenderVideo.seekRender"
	:isOpenFullscreen="isOpenFullscreen" :change:isOpenFullscreen="RenderVideo.openFullscreenRender"
	:isExitFullscreen="isExitFullscreen" :change:isExitFullscreen="RenderVideo.exitFullscreenRender"
	:captureParams="captureParams" :change:captureParams="RenderVideo.captureRender"
	:toastParams="toastParams" :change:toastParams="RenderVideo.showToastRender"
	:toolbarParams="toolbarParams" :change:toolbarParams="RenderVideo.showToolbarRender"
	:isEnableGesture="isEnableGesture" :change:isEnableGesture="RenderVideo.enableGestureRender"
	:isDisableGesture="isDisableGesture" :change:isDisableGesture="RenderVideo.disableGestureRender"
	:isUpdateSize="isUpdateSize" :change:isUpdateSize="RenderVideo.updateSizeRender">
		<view :class="'rvideoslot' + dataId">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				dataId: '',
				videoParams: '',//视频参数
				isUnload: -1,//是否卸载视频
				loadDanmuParams: '',//弹幕配置
				isUnloadDanmu: -1,//是否卸载弹幕
				sendDanmuParams: '',//发送弹幕
				insertDanmuParams: '',//插入弹幕
				setVideoParams: '',//设置video属性
				reloadCustomParams: '',//重加载自定义配置
				updateConfigParams: '',//更新配置
				isPlay: -1,//是否播放
				isPause: -1,//是否暂停
				isToggle: -1,//是否切换
				seekTime: -1,//跳转时间
				isOpenFullscreen: -1,//是否开启全屏
				isExitFullscreen: -1,//是否退出全屏
				captureParams: '',//截屏
				toastParams: '',//消息提示
				toolbarParams: '',//工具栏
				isEnableGesture: -1,//是否开启手势事件
				isDisableGesture: -1,//是否关闭手势事件
				isUpdateSize: -1//是否更新画布尺寸
			}
		},
		mounted() {
			this.dataId = new Date().getTime().toString() + Math.round(Math.random() * 10000)
		},
		methods: {
			ready () {
				this.emit('message', {ready: true})
			},
			destroyed () {
				this.$emit('destroyed')
			},
			message (e) {
				this.$emit('message', e)
			},
			emit (name, data) {
				this.$emit(name, {
					data
				})
			},
			//重加载视频
			reloadVideo (params) {
				this.videoParams = ''
				this.$nextTick(() => {
					this.videoParams = params
				})
			},
			//卸载视频
			destroy () {
				this.isUnload = -1
				this.$nextTick(() => {
					this.isUnload = 1
				})
			},
			//加载弹幕
			loadDanmu (danmu) {
				this.loadDanmuParams = ''
				this.$nextTick(() => {
					this.loadDanmuParams = danmu
				})
			},
			//卸载弹幕
			unloadDanmu () {
				this.isUnloadDanmu = -1
				this.$nextTick(() => {
					this.isUnloadDanmu = 1
				})
			},
			//发送弹幕
			sendDanmu (danmu, border) {
				this.sendDanmuParams = ''
				this.$nextTick(() => {
					this.sendDanmuParams = {
						danmu,
						border
					}
				})
			},
			//插入弹幕
			insertDanmu (danmu) {
				this.insertDanmuParams = ''
				this.$nextTick(() => {
					this.insertDanmuParams = danmu
				})
			},
			//动态修改video属性
			setVideo (key, value) {
				this.setVideoParams = ''
				this.$nextTick(() => {
					this.setVideoParams = {
						key, value
					}
				})
			},
			//重加载自定义配置
			reloadCustom (params) {
				this.reloadCustomParams = ''
				this.$nextTick(() => {
					this.reloadCustomParams = params
				})
			},
			//更新配置
			updateConfig (params) {
				this.updateConfigParams = ''
				this.$nextTick(() => {
					this.updateConfigParams = params
				})
			},
			//播放视频
			play () {
				this.isPlay = -1
				this.$nextTick(() => {
					this.isPlay = 1
				})
			},
			//暂停视频
			pause () {
				this.isPause = -1
				this.$nextTick(() => {
					this.isPause = 1
				})
			},
			//播放和暂停视频
			toggle () {
				this.isToggle = -1
				this.$nextTick(() => {
					this.isToggle = 1
				})
			},
			/**
			 * 跳转视频
			 * @param {Number} time 跳转位置（单位秒）
			*/
			seek (time) {
				this.seekTime = -1
				this.$nextTick(() => {
					this.seekTime = time
				})
			},
			/**
			 * 播放和暂停视频
			 * @param {String} direction 屏幕方向 auto-自动计算 landscape-横屏 portrait-竖屏
			*/
			openFullscreen (direction) {
				this.isOpenFullscreen = -1
				this.$nextTick(() => {
					this.isOpenFullscreen = direction
				})
			},
			//退出全屏
			exitFullscreen () {
				this.isExitFullscreen = -1
				this.$nextTick(() => {
					this.isExitFullscreen = 1
				})
			},
			//截图
			capture (data) {
				this.captureParams = ''
				this.$nextTick(() => {
					this.captureParams = data
				})
			},
			//消息提示
			showToast (data) {
				this.toastParams = ''
				this.$nextTick(() => {
					this.toastParams = data
				})
			},
			//展示工具栏
			showToolbar (data) {
				this.toolbarParams = ''
				this.$nextTick(() => {
					this.toolbarParams = data
				})
			},
			//禁用手势事件
			disableGesture () {
				this.isDisableGesture = -1
				this.$nextTick(() => {
					this.isDisableGesture = 1
				})
			},
			//启用手势事件
			enableGesture () {
				this.isEnableGesture = -1
				this.$nextTick(() => {
					this.isEnableGesture = 1
				})
			},
			updateSize () {
				this.isUpdateSize = -1
				this.$nextTick(() => {
					this.isUpdateSize = 1
				})
			}
		}
	}
</script>
<script lang="renderjs" module="RenderVideo" type="module">
	export default {
		data () {
			return {
				dom: null,
				domSlot: null,
				mp: null
			}
		},
		beforeDestroy() {
			this.destroyRender()
		},
		methods: {
			messageListener (e) {
				this.callMethod('message', {origin: e.origin, data: e.data})
			},
			dataIdWatcher (newVal) {
				if ( newVal ) {
					this.dom = document.querySelector('.rvideo' + newVal)
					this.domSlot = document.querySelector('.rvideoslot' + newVal)
					this.init()
				}
			},
			async init () {
				if ( !window.Hls ) await this.loadScriptInSandbox(this.parseSrc('/uni_modules/yingbing-video/static/html/js/hls.min.js'), 'hls')
				if ( !window.flvjs ) await this.loadScriptInSandbox(this.parseSrc('/uni_modules/yingbing-video/static/html/js/flv.min.js'), 'flv')
				if ( !window.JSMpeg ) await this.loadScriptInSandbox(this.parseSrc('/uni_modules/yingbing-video/static/html/js/jsmpeg.min.js'), 'JSMpeg')
				if ( !window.THREE ) await this.loadScriptInSandbox(this.parseSrc('/uni_modules/yingbing-video/static/html/js/three.min.js'), 'three')
				if ( !window.THREE.OrbitControls ) await this.loadScriptInSandbox(this.parseSrc('/uni_modules/yingbing-video/static/html/js/OrbitControls.js'), 'OrbitControls')
				if ( !window.THREE.DeviceOrientationControls ) await this.loadScriptInSandbox(this.parseSrc('/uni_modules/yingbing-video/static/html/js/DeviceOrientationControls.js'), 'DeviceOrientationControls')
				if ( !window.YbSubtitle ) await this.loadScriptInSandbox(this.parseSrc('/uni_modules/yingbing-video/static/html/js/yb-player-subtitle.js'), 'ybPlayerSubtitle')
				if ( !window.YbDanmu ) await this.loadScriptInSandbox(this.parseSrc('/uni_modules/yingbing-video/static/html/js/yb-player-danmu.js'), 'ybPlayerDanmu')
				if ( !window.YbPano ) await this.loadScriptInSandbox(this.parseSrc('/uni_modules/yingbing-video/static/html/js/yb-player-pano.js'), 'ybPlayerPano')
				if ( !window.YbMpeg ) await this.loadScriptInSandbox(this.parseSrc('/uni_modules/yingbing-video/static/html/js/yb-player-mpeg.js'), 'ybPlayerMpeg')
				if ( !window.YbPlayer ) await this.loadScriptInSandbox(this.parseSrc('/uni_modules/yingbing-video/static/html/js/yb-player.js'), 'ybPlayer')
				if ( !window.YbGesture ) await this.loadScriptInSandbox(this.parseSrc('/uni_modules/yingbing-video/static/html/js/yb-player-gesture.js'), 'ybPlayerGesture')
				this.loadCss()
				this.callMethod('ready')
			},
			loadCss () {
				let links = document.getElementsByTagName('link')
				let linkarr = []
				for ( let i = 0; i < links.length; i++ ) {
					if ( links[i].getAttribute('data-id') ) linkarr.push(links[i].getAttribute('data-id'))
				}
				//判断一下css文件是否已加载，避免重复加载
				if ( linkarr.indexOf('yb-player') == -1 ) {
					const link = document.createElement('LINK')
					link.setAttribute('data-id', 'yb-player')
					link.rel = 'stylesheet'
					link.href = this.parseSrc('/uni_modules/yingbing-video/static/html/css/yb-player.css')
					document.head.appendChild(link)
				}
				//判断一下css文件是否已加载，避免重复加载
				if ( linkarr.indexOf('yb-player-plugin') == -1 ) {
					const link = document.createElement('LINK')
					link.setAttribute('data-id', 'yb-player-plugin')
					link.rel = 'stylesheet'
					link.href = this.parseSrc('/uni_modules/yingbing-video/static/html/css/yb-player-plugin.css')
					document.head.appendChild(link)
				}
			},
			request (url) {
				return new Promise((resolve, reject) => {
					//如果是在线链接表示当前运行为H5，直接用XMLHttpRequest请求
					if (url.startsWith('http') ) {
						// #ifdef H5
						var xhr = new XMLHttpRequest()
						// #endif
						// #ifdef APP-VUE
						var xhr = new plus.net.XMLHttpRequest()
						// #endif
					    xhr.onreadystatechange = () => {
					    	if ( xhr.readyState == 4 ) {
					    		if ( xhr.status == 200 ) {
					    			resolve(xhr.responseText)
					    		} else {
					    			resolve(null)
					    		}
					    		xhr.abort()
					    	}
					    }
					    xhr.onabort = function () { xhr = null }
					    xhr.open('GET', url);
					    xhr.responseType = 'text';
					    xhr.send();
					} else {
						//非http协议链接，需要使用系统文件API，获取文件内容，兼容IOS得WkWbview内核
						// #ifdef APP-VUE
						//将路径开头替换为_www/，这是为了兼容ios文件路径读取
						plus.io.resolveLocalFileSystemURL(url.replace('./', '_www/'), function( entry ) {
							entry.file( function(file){
								var fileReader = new plus.io.FileReader();
								fileReader.readAsText(file, 'utf-8');
								fileReader.onloadend = function(evt) {
									resolve(evt.target.result)
								}
							} );
						}, function ( e ) {
							resolve(null)
						} );
						// #endif
						// #ifndef APP-VUE
						console.log('不支持本地文件访问')
						// #endif
					}  
					
				})
			},
			parseSrc (path) {
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
			},
			// 安全加载JS库的方法
			async loadScriptInSandbox (url, id) {
			    try {
					const response = await this.request(url)
					const jsCode = response
					
					// const uni = undefined
					// eval('(function () {' + jsCode + '}())')
					
					//创建隔离的执行环境 似乎没有效果
					const sandbox = {
						window: window,
						document: document,
						navigator: navigator
					    // 添加其他必要的全局对象...
					};
					const code = `
					(function(sandbox) {
					    var window = sandbox.window;
					    var document = sandbox.document;
					    var navigator = sandbox.navigator;
					    var uni = undefined;
					    ${jsCode}
					})(sandbox);
					`;
					// 使用Function构造器创建隔离的执行环境
					const executeInSandbox = new Function('sandbox',code);
					// 执行代码
					executeInSandbox(sandbox);
					return { success: true, sandbox };
			    } catch (error) {
			        console.error(`加载脚本失败: ${error}`);
			        // return { success: false, error };
			    }
			},
			async loadScriptInDom (src, id) {
				return new Promise(resolve => {
					const script = document.createElement('SCRIPT')
					script.setAttribute('data-id', id)
					script.src = src
					script.onload = function () {
						resolve(true)
					}
					document.head.appendChild(script)
				})
				
			},
			
			//深度克隆数据，避免数据污染
			_traverseObject (obj, emitname) {
				if(typeof obj !== "object" && typeof obj !== 'function') {
					//原始类型直接返回
				    return obj;
				}
				var o = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {}; 
				for(let i in obj) {  
				    if(obj.hasOwnProperty(i)){ 
						const value = obj[i]
						const emit = {}
						emit[emitname] = value
						o[i] = i == 'click' ? () => { this.callMethod('message', {data: emit}) } : typeof value === 'object' ? this._traverseObject(value, emitname) : value
				    } 
				} 
				return o;
			},
			//处理hlsConfig
			parseHlsConfig (config = {}) {
				Object.keys(config).forEach(key => {
					if ( ['xhrSetup'].includes(key) ) {
						config[key] = new Function('return (' + config[key] + ')')();
					}
					if ( ['pLoader', 'fLoader'].includes(key) ) {
						config[key] = (new Function(`return ${config[key]}`))();
					}
				})
				return config
			},
			reloadVideoRender (params) {
				if ( !params ) return
				this.unloadRender()
				window.addEventListener('message', this.messageListener);
				const custom = this._traverseObject(params.custom, 'slotclick')
				this.mp = new YbPlayer({
					container: this.dom,
					src: params.src,
					segments: params.segments,
					title: params.title,
					poster: params.poster || undefined,
					type: params.type,
					three: params.three,
					initialTime: params.initialTime,
					duration: params.duration,
					autoplay: params.autoplay,
					preload: params.preload,
					muted: params.muted,
					playbackRate: params.playbackRate,
					loop: params.loop,
					isLive: params.isLive,
					header: params.header,
					controls: params.controls,
					height: '100%',
					objectFit: params.objectFit,
					crossOrigin: params.crossOrigin,
					openDirection: params.openDirection,
					exitDirection: params.exitDirection,
					quality: params.quality,
					works: params.works,
					workIndex: params.workIndex,
					subtitles: params.subtitles,
					subtitleIndex: params.subtitleIndex,
					custom,
					decoder: {
						hls: {
							loader: Hls,
							config: this.parseHlsConfig(params.hlsConfig)
						},
						flv: {
							loader: flvjs,
							config: params.flvConfig
						},
						jsmpeg: {
							loader: JSMpeg,
							config: params.jsmpegConfig
						}
					}
				})
				this.mp.load()
				this.mp.loadVideo()
				this.mp.loadGestureEvent()
				this.mp.appendDom(this.domSlot)
				window.addEventListener('resize', this.updateSizeRender)
			},
			//动态修改video属性
			setVideoRender (newVal) {
				if ( !newVal ) return
				const { key, value } = newVal
				this.mp?.setVideo(key, value)
			},
			//加载弹幕
			loadDanmuRender (danmu) {
				if ( !danmu ) return
				if ( this.mp ) {
					this.mp.setConfig('danmu', YbPlayer.deepClone(danmu))
					this.mp.unloadDanmu()
					this.mp.loadDanmu()
				}
			},
			//卸载弹幕
			unloadDanmuRender (newVal) {
				if ( newVal == -1 ) return
				this.mp?.unloadDanmu()
			},
			//发送弹幕
			sendDanmuRender (newVal) {
				if ( !newVal ) return
				const { danmu, border } = newVal
				this.mp?.sendDanmu(danmu, border)
			},
			//插入弹幕
			insertDanmuRender (newVal) {
				if ( !newVal ) return
				this.mp?.insertDanmu(newVal)
			},
			//更新配置
			updateConfigRender (config) {
				if ( !config ) return
				Object.keys(config).forEach(key => {
					this.mp?.setConfig(key, config[key])
				})
				this.mp?.hideControls()
			},
			//重加载自定义配置
			reloadCustomRender (config) {
				if ( !config ) return
				const newConfig = this._traverseObject(config, 'slotclick')
				Object.keys(newConfig).forEach(key => {
					this.mp?.setCustom(key, newConfig[key])
				})
				this.mp?.unloadCustom()
				this.mp?.loadCustom()
			},
			//播放/暂停
			toggleRender (newVal) {
				if ( newVal == -1 ) return
				this.mp?.toggle()
			},
			//播放
			playRender (newVal) {
				if ( newVal == -1 ) return
				this.mp?.video?.play()
			},
			//暂停
			pauseRender (newVal) {
				if ( newVal == -1 ) return
				this.mp?.video?.pause()
			},
			//跳转
			seekRender (time) {
				if ( time == -1 ) return
				this.mp?.seek(time)
			},
			//开启全屏
			openFullscreenRender (direction) {
				if ( direction == -1 ) return
				this.mp?.openFullscreen(direction)
			},
			//退出全屏
			exitFullscreenRender (newVal) {
				if ( newVal == -1 ) return
				this.mp?.exitFullscreen()
			},
			//消息提示
			showToastRender (data) {
				if ( !data ) return
				this.mp?.showToast(data)
			},
			//展示工具栏
			showToolbarRender (data) {
				if ( !data ) return
				const newDate = this._traverseObject(data, 'toolclick')
				this.mp?.showToolbar(newDate.selector, newDate.list, newDate.checkShow, newDate.checkIndex)
			},
			//截图
			captureRender (data) {
				if ( !data ) return
				this.mp?.capture(data.type, data.show)
			},
			//禁用手势事件
			disableGestureRender (newVal) {
				if ( newVal == -1 ) return
				this.mp?.disableGesture()
			},
			//启用手势事件
			enableGestureRender (newVal) {
				if ( newVal == -1 ) return
				this.mp?.enableGesture()
			},
			//卸载视频
			unloadRender () {
				if ( this.mp ) {
					if ( this.domSlot && this.dom ) this.dom.appendChild(this.domSlot)
					this.mp.unloadDanmu()
					this.mp.unloadGestureEvent()
					this.mp.unloadVideo()
					this.mp.unload()
					window.removeEventListener('resize', this.updateSizeRender)
					window.removeEventListener('message', this.messageListener)
				}
			},
			//卸载视频
			destroyRender (newVal) {
				if ( newVal == 1 ){
					this.unloadRender()
					this.callMethod('destroyed')
				}
			},
			//重置画布尺寸
			updateSizeRender () {
				//重置弹幕画布
				this.mp?.refreshDanmu()
				//重置3D画布
				this.mp?.refreshPano()
			},
			callMethod (name, args) {
				// #ifndef H5
				this.$ownerInstance && this.$ownerInstance.callMethod(name, args)
				// #endif
				// #ifdef H5
				this[name] && this[name](args)
				// #endif
			}
		}
	}
</script>

<style>
	.render-video {
		background-color: #000;
		width: 100%;
		height: 100%;
	}
	.render-video-slot {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>