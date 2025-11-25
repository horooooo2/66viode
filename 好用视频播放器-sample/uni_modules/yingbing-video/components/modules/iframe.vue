<template>
	<view
	:class="'iframe' + dataId"
	class="find_iframe"
	:data-sandbox="sandbox"
	:data-allow="allow"
	:data-allowfullscreen="allowfullscreen"
	:data-frameborder="frameborder"
	:data-loadingShow="loadingShow"
	:data-console="console"
	:data-iframeStyle="iframeStyleString"
	:data-iframeClass="iframeClassString"
	:data-crossOrigin="crossOrigin"
	:data-setDataName="setDataName"
	:data-overrideUrlLoadingOptions="overrideUrlLoadingOptionsString"
	:ready="ready" :change:ready="ComIframe.readyWatcher"
	:isDestroy="isDestroy" :change:isDestroy="ComIframe.destroyWatcher"
	:src="src" :change:src="ComIframe.srcWatcher"
	:sandbox="sandbox" :change:sandbox="ComIframe.sandboxWatcher"
	:allow="allow" :change:allow="ComIframe.allowWatcher"
	:allowfullscreen="allowfullscreen" :change:allowfullscreen="ComIframe.allowfullscreenWatcher"
	:frameborder="frameborder" :change:frameborder="ComIframe.frameborderWatcher"
	:iframeStyle="iframeStyle" :change:iframeStyle="ComIframe.iframeStyleWatcher"
	:iframeClass="iframeClass" :change:iframeClass="ComIframe.iframeClassWatcher"
	:jump="jump" :change:jump="ComIframe.jumpWatcher"
	:assignUrl="assignUrl" :change:assignUrl="ComIframe.assignUrlWatcher"
	:loadingStatus="loadingStatus" :change:loadingStatus="ComIframe.loadingWatcher"
	:evalJS="evalJSString" :change:evalJS="ComIframe.evalJSWatcher"
	:evalCSS="evalCSSString" :change:evalCSS="ComIframe.evalCSSWatcher"
	:setData="setDataValue" :change:setData="ComIframe.setDataWatcher"
	:overrideUrlLoading="overrideUrlLoadingOptionsString" :change:overrideUrlLoading="ComIframe.overrideUrlLoadingWatcher">
	</view>
</template>

<script>
	export default {
		props: {
			dataId: {
				type: String,
				default () {
					return new Date().getTime().toString() + Math.round(Math.random() * 10000)
				}
			},
			src: {//链接
				type: String,
				default: ''
			},
			sandbox: {//沙盒模式 原生属性
				type: String,
				default: 'allow-same-origin allow-scripts allow-forms allow-top-navigation-by-user-activation allow-popups allow-modals'
			},
			allow: {//允许一些操作 原生属性
				type: String,
				// default: 'autoplay; fullscreen; encrypted-media; picture-in-picture'
				default: ''
			},
			allowfullscreen: {//是否允许全屏 原生属性
				type: Boolean,
				default: true
			},
			//跨域属性 anonymous-它有一个默认值。它定义了将在不传递凭据信息的情况下发送CORS请求 use-credentials-将发送带有凭据、cookie 和证书的 cross-origin 请求
			crossOrigin: {
				type: String,
				default: ''
			},
			frameborder: {//iframe边框 原生属性
				type: String,
				default: '0'
			},
			iframeClass: {//iframe样式
				type: [String, Object],
				default: ''
			},
			iframeStyle: {//iframe样式
				type: [String, Object],
				default: ''
			},
			loadingShow: {//展示loading
				type: Boolean,
				default: true
			},
			console: {//控制console
				type: String,
				default: 'log warn error'
			},
			overrideUrlLoadingOptions: {//仅支持app
				type: Object,
				default: () => {
					return {
						effect: '',
						mode: '',
						match: '',
						exclude: ''
					}
				}
			}
		},
		computed: {
			overrideUrlLoadingOptionsString () {
				return JSON.stringify(this.overrideUrlLoadingOptions)
			},
			iframeStyleString () {
				return JSON.stringify(this.iframeStyle)
			},
			iframeClassString () {
				return JSON.stringify(this.iframeClass)
			}
		},
		data () {
			return {
				ready: '',
				jump: 0,
				isDestroy: false,
				evalJSString: '',//js字符串
				evalCSSString: '',//注入css字符串
				assignUrl: '',//跳转链接
				loadingStatus: -1,//加载进度提控制
				evalJSTask: new Map(),//注入js临时队列表
				setDataName: '',
				setDataValue: ''
			}
		},
		mounted () {
			this.$nextTick(function () {
				setTimeout(() => {
					this.ready = this.dataId
				}, 100)
			})
		},
		methods: {
			//返回上一页
			back () {
				this.jump = 0
				this.$nextTick(function () {
					this.jump = -1
				})
			},
			//调用内部iframe跳转链接
			assign (url) {
				this.assignUrl = url
			},
			//显示进度条加载
			showLoading () {
				this.loadingStatus = -1
				this.$nextTick(function () {
					this.loadingStatus = 1
				})
			},
			//关闭进度条加载
			hideLoading () {
				this.loadingStatus = -1
				this.$nextTick(function () {
					this.loadingStatus = 0
				})
			},
			//销毁
			destroy () {
				this.isDestroy = false
				this.$nextTick(() => {
					this.isDestroy = true
				})
			},
			//注入js
			evalJS (str) {
				if ( this.evalJSString ) {//如果又正在进行注入的js任务
					const id = new Date().getTime().toString() + Math.round(Math.random() * 10000)
					this.evalJSTask.set(id, str)//加入等待队列
				} else {
					this.evalJSString = str
				}
			},
			//注入css
			evalCSS (str) {
				this.evalCSSString = ''
				this.$nextTick(() => {
					this.evalCSSString = str
				})
			},
			setData (key, value) {
				this.setDataName = key
				this.setDataValue = ''
				this.$nextTick(() => {
					this.setDataValue = value
				})
			},
			loadstart (e) {
				this.$emit('loadstart', e)
			},
			loaded (e) {
				this.$emit('loaded', e)
			},
			callError (e) {
				this.$emit('error', e)
			},
			backError () {
				this.$emit('backerror')
			},
			callDestroy () {
				this.$emit('destroyed')
			},
			overrideUrlLoading (e) {
				this.$emit('overrideurlloading', e)
			},
			message (e) {
				this.$emit('message', e)
			},
			callEvalJS (e) {//注入js回调
				this.evalJSString = ''
				if ( this.evalJSTask.size ) {//如果等待队列有值，并且当前没有正在执行的注入js任务
					const firstEntrie = this.evalJSTask.entries().next().value//获取等待队列中的第一个
					this.evalJS(firstEntrie[1])//执行任务
					this.evalJSTask.delete(firstEntrie[0])//删除等待队列
				}
				if ( e.status == 'error' ) this.callError(e.message)
			}
		}
	}
</script>
<!-- #ifdef APP-VUE || H5 -->
<script lang="renderjs" type="module" module="ComIframe">
	export default {
		data () {
			return {
				dom: null,
				iframe: null,
				loading: null,
				iframeSrc: '',
				backTimer: null
			}
		},
		mounted () {
			window.addEventListener('message', this.messageListener);
		},
		beforeDestroy () {
			this.destoryIframe()
		},
		methods: {
			messageListener (e) {
				this.callMethod('message', {origin: e.origin, data: e.data})
			},
			destoryIframe () {
				window.removeEventListener('message', this.messageListener)
				if ( this.loading ) {
					this.loading.remove()
					this.loading = null
				}
				if ( this.iframe ) {
					this.iframe.remove()
					this.iframe = null
				}
				this.callMethod('callDestroy')
			},
			showLoadingRender () {
				if ( this.loading && this.getData('loadingShow') ) {
					this.loading.classList.remove('browser-loading-hide')
					this.loading.classList.add('browser-loading-show')
				}
			},
			hideLoadingRender () {
				if ( this.loading && this.getData('loadingShow') ) {
					this.loading.classList.remove('browser-loading-show')
					this.loading.classList.add('browser-loading-hide')
				}
			},
			clearBackTimer () {
				if ( this.backTimer ) {
					window.clearTimeout(this.backTimer)
					this.backTimer = null
				}
			},
			initIframe () {
				this.showLoadingRender()
				this.callMethod('loadstart', {href: this.iframeSrc})
				this.iframe = document.createElement('IFRAME')
				this.iframe.setAttribute('class', 'find_iframe_iframe')
				this.iframe.setAttribute('frameborder', this.getData('frameborder'))
				this.iframe.setAttribute('allow', this.getData('allow'))
				this.iframe.setAttribute('allowfullscreen', this.getData('allowfullscreen'))
				this.iframe.setAttribute('sandbox', this.getData('sandbox'))
				this.iframe.setAttribute('crossOrigin', this.getData('crossOrigin'))
				if ( this.getData('iframeStyle') ) this.iframeStyleWatcher(JSON.parse(this.getData('iframeStyle')))//初始化style
				if ( this.getData('iframeClass') ) this.iframeClassWatcher(JSON.parse(this.getData('iframeClass')))//初始化style
				this.iframe.src = this.iframeSrc
				this.iframe.onload = () => {
					this.hideLoadingRender()
					const iframeWindow = this.iframe.contentWindow
					iframeWindow.onbeforeunload = (e) => {
						this.clearBackTimer()
						this.callMethod('loadstart', e)
						this.showLoadingRender()
					}
					const history = iframeWindow.history
					const iframeDocument = this.iframe.contentDocument || iframeWindow.document;
					const title = iframeDocument.title
					const href = iframeWindow.location.href
					const head = iframeDocument.head;
					const links = head.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');//尝试从网页代码中获取favicon.ico
					const favicon = links.length > 0 ? links[0].href : href + (href.substring(href.length -1) == '/' ? '' : '/') + 'favicon.ico'//没有获取到默认使用网址拼接favicon.ico
					this.callMethod('loaded', {title, href, favicon, history})
				}
				this.iframe.onerror = (e) => {
					this.hideLoadingRender()
					this.callMethod('callError', e)
				}
				this.dom.appendChild(this.iframe)
				//控制iframe内部的console
				const consoles = this.getData('console').split(' ')
				Object.keys(this.iframe.contentWindow.console).forEach(key => {
					if ( consoles.indexOf(key) == -1 ) this.iframe.contentWindow.console[key] = function () {}
				})
				const options = JSON.parse(this.getData('overrideUrlLoadingOptions'))
				if ( options && options.mode ) this.overrideUrlLoadingWatcher(this.getData('overrideUrlLoadingOptions'))
			},
			readyWatcher (newVal) {
				if ( newVal ) {
					this.dom = document.querySelector('.iframe' + newVal)
					this.loading = document.createElement('DIV')
					this.loading.setAttribute('class', 'browser-loading-line')
					this.dom.appendChild(this.loading)
				}
				if ( this.iframeSrc && this.dom ) this.initIframe()
			},
			destroyWatcher (newVal) {
				if ( newVal ) this.destoryIframe()
			},
			srcWatcher (newVal, oldVal) {
				this.iframeSrc = newVal
				if ( !this.dom ) return
				if ( newVal != oldVal ) {
					if ( oldVal ) this.destoryIframe()
					if ( newVal ) this.initIframe()
				}
			},
			sandboxWatcher (newVal) {
				this.iframe && this.iframe.setAttribute('sandbox', newVal)
			},
			allowWatcher (newVal) {
				this.iframe && this.iframe.setAttribute('allow', allow)
			},
			allowfullscreenWatcher (newVal) {
				this.iframe && this.iframe.setAttribute('allowfullscreen', newVal)
			},
			frameborderWatcher (newVal) {
				this.iframe && this.iframe.setAttribute('frameborder', newVal)
			},
			iframeStyleWatcher (newVal) {
				if ( typeof newVal == "string" ) this.iframe && this.iframe.setAttribute('style', newVal)
				if ( typeof newVal == "object" ) {
					let style = ''
					Object.keys(newVal).forEach(key => {
						style += key + ':' + newVal[key] + ';'
					})
					this.iframe && this.iframe.setAttribute('style', style)
				}
			},
			iframeClassWatcher (newVal) {
				if ( typeof newVal == "string" ) this.iframe && this.iframe.setAttribute('class', 'find_iframe_iframe ' + newVal)
				if ( typeof newVal == "object" ) {
					let className = ''
					Object.keys(newVal).forEach(key => {
						className += newVal[key] ? (key + ' ') : ''
					})
					this.iframe && this.iframe.setAttribute('class', 'find_iframe_iframe ' + className)
				}
			},
			jumpWatcher (newVal) {
				if ( newVal < 0 && this.iframe ) {
					this.iframe.contentWindow.history.back()
					this.backTimer = window.setTimeout(() => {
						this.callMethod('backError')
					}, 300)
				}
			},
			assignUrlWatcher (newVal) {
				const iframeWindow = this.iframe?.contentWindow
				iframeWindow && iframeWindow.window.location.assign(newVal);
			},
			loadingWatcher (newVal) {
				if ( newVal == 0 ) this.hideLoading()
				if ( newVal == 1 ) this.showLoading()
			},
			evalJSWatcher (newVal) {
				if ( newVal ) {
					try{
						const iframeDocument = this.iframe.contentDocument || iframeWindow.document;
						const script = iframeDocument.createElement('SCRIPT')
						script.innerHTML = newVal
						iframeDocument.head.appendChild(script)//插入script标签
						this.callMethod('callEvalJS', {status: 'success'})//通知逻辑层成功执行回调
						iframeDocument.head.removeChild(script)//执行完script标签后需要移除
					}catch(e){
						this.callMethod('callEvalJS', {status: 'error', message: JSON.stringify(e)})
					}
				}
			},
			evalCSSWatcher (newVal) {
				if ( newVal ) {
					try{
						const iframeDocument = this.iframe.contentDocument || iframeWindow.document;
						const style = iframeDocument.createElement('STYLE')
						style.innerHTML = newVal
						iframeDocument.head.appendChild(style)
					}catch(e){
						this.callMethod('callError', e)
					}
				}
			},
			//给网页值传参
			setDataWatcher (newVal) {
				if ( newVal ) {
					try{
						const iframeWindow = this.iframe.contentWindow
						const key = this.getData('setDataName')
						if ( key ) iframeWindow[key] = newVal
					}catch(e){
						this.callMethod('callEvalJS', {status: 'error', message: JSON.stringify(e)})
					}
				}
			},
			//拦截监听
			overrideUrlLoadingWatcher (newVal) {
				// #ifdef APP-VUE
				const wv = plus.webview.currentWebview()
				const options = JSON.parse(newVal)
				wv.overrideUrlLoading(options, (e) => {
					this.callMethod('overrideUrlLoading', e)
					return true;
				});
				// #endif
				
			},
			getData (name) {
				const value = this.dom.getAttribute('data-' + name)
				if ( ['true', 'false'].includes(value) ) return value == 'false' ? false : true
				else if ( /^\d+$/.test(value) ) return Number(value)
				else return value
			},
			callMethod (name, args) {
				// #ifndef H5
				this.$ownerInstance.callMethod(name, args)
				// #endif
				// #ifdef H5
				this[name](args)
				// #endif
			}
		}
	}
</script>
<!-- #endif -->


<style>
	@keyframes loading-show {
		from {
			width: 0;
		}
		to {
			width: 99%;
		}
	}
	@keyframes loading-hide {
		from {
			width: 0;
			opacity: 1;
		}
		to {
			width: 100%;
			opacity: 0;
		}
	}
	.find_iframe {
		position: relative;
		width: 100%;
		height: 100%;
	}
	/deep/ .find_iframe_iframe {
		width: 100%;
		height: 100%;
	}
	/deep/ .browser-loading-line {
		position: absolute;
		top: 0;
		left: 0;
		width: 0;
		height: 3px;
		border-radius: 3px;
		background-color: #4cd964;
		z-index: 1;
		touch-action: none;
		pointer-events: none;
	}
	/deep/ .browser-loading-show {
		animation: loading-show 5s ease both;
	}
	/deep/ .browser-loading-hide {
		animation: loading-hide .5s linear both;
	}
</style>