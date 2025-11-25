#使用须知

* 1、这个播放器支持APP-VUE、H5、APP-NVUE,兼容VUE3，不支持小程序。
* 2、对于需要兼容小程序的项目来说，不建议你使用本插件，因为该插件有大量静态文件，会导致小程序包增大，并且静态文件是无法按需引入的。
* 3、该插件主要利用h5的video标签播放视频，video原生只支持ogg、mp4、webm格式的视频。
* 4、插件内置hls.js解码器支持播放m3u8，内置flv.js（不支持IOS）支持播放http-flv，内置jsmepg.js支持播放ws://、wss//、MPEG-TS静态文件
* 5、插件不支持播放h.265编码的视频，也不支持播放rtsp://，rtmp://协议，如果你需要播放这些视频流，需要配合后端转码播放
* 6、支持弹幕功能、字幕功能、画质切换，360全景等。
* 7、APP-NVUE可能会有性能问题，如果播放太长的视频，播放一定时间可能会出现闪退的情况，猜想应该是nvue的webview未做视频播放优化的缘故。
* 8、关于该插件在IOS得表现需要单独说明，详情见下方，IOS特别说明。
* 9、有什么不懂可以加 1_0_8_7_7_3_5_9_4_2 去掉横杠即可。

#props属性
| 属性名 | 类型 | 默认值 | 可选值 | 说明 |
| :---: | :---: | :---: | :---------- | :----------: |
| src | String | ---- | ---- | 播放链接 |
| segments | Array | ---- | ---- | 切片列表（详情见下方） |
| title | String | ---- | ---- | 标题 |
| poster | String | ---- | ---- | 封面 |
| type | String | auto | auto-自动判断 video-使用video标签播放 hls-使用hls.js播放 flv-使用flv.js播放 jsmpeg-使用jsmpeg.js播放 | 解码类型 |
| three | String | none | none-关闭3D 360-360全景 | 3D模式 |
| isLive | Boolean | false | true/false | 是否是直播流 |
| autoplay | Boolean | false | true/false | 自动播放（大部分浏览器都不支持，APP-NVUE下也不支持，想要自动播放最好设置默认静音） |
| preload | String | atuo | auto-加载所有资源 meta-只加载元数据 none-不加载 | 预加载（autoplay设置为true时忽略此属性） |
| loop | Boolean | false | true/false | 循环播放 |
| muted | Boolean | false | true/false | 静音 |
| playbackRate | Number | 1 | ---- | 播放倍速 |
| duration | Number | ---- | ---- | 自定义播放时长 (单位是秒) |
| initialTime | Number | 0 | ---- | 初始播放时长 (单位是秒) |
| height | String | auto | auto-自适应视频高度 百分比（30%）-根据屏幕高度计算 像素（200px或400rpx）-像素高度 inherit-继承父组件高度 | 视频高度 |
| objectFit | String | ---- | fill-内容拉伸填充 contain-保持比例内容缩放 cover-保持比例内容可能被剪切 none-内容不重置 scale-down-保持比例从none或contain选一个 | 当视频大小与 video 容器大小不一致时，视频的表现形式。 |
| crossOrigin | String | ---- | anonymous-不传递凭据信息的情况下发送CORS请求（重要属性，360全景视频和截图不设置该属性可能会报错） use-credentials-将发送带有凭据、cookie 和证书的 cross-origin 请求 | 跨域属性 |
| header | Boolean | false | true/false | 显示顶部控制栏 |
| controls | Boolean | false | true/false | 显示底部控制栏 |
| openDirection | String | auto | auto-自动计算 landscape-横屏 portrait-竖屏 | 开启全屏时设备方向 （只支持APP） |
| exitDirection | String | portrait | landscape-横屏 portrait-竖屏 | 退出全屏时设备方向 （只支持APP） |
| danmu | Object | ---- | ---- | 弹幕（详情见下方） |
| quality | Array | ---- | ---- | 画质列表（详情见下方） |
| works | Array | ---- | ---- | 分P列表（详情见下方） |
| workIndex | Number | -1 | ---- | 分P默认索引 |
| subtitles | Array | ---- | ---- | 字幕列表（详情见下方） |
| subtitleIndex | Number | -1 | ---- | 字幕默认索引 |
| custom | Object | ---- | ---- | 自定义配置（详情见下方） |
| hlsConfig | Object | ---- | ---- | hls配置（详情见下方） |
| flvConfig | Object | ---- | ---- | flv配置（详情见下方） |
| jsmpegConfig | Object | ---- | ---- | jsmpeg配置（详情见下方） |
| renderType | String | ---- | renderjs-使用renderjs渲染视频 web-使用网页方式渲染视频 | 渲染模式（ios平台默认renderjs，如果想使用web，必须将webview内核改为UIWebview）（APP-NVUE只能使用web方式渲染） |

#event事件
| 事件名 | 参数 | 说明 |
| :---: | :---: | :------- |
| canplay | --- | 可以播放状态，但不保证后面可以流畅播放，视频总长度，尺寸信息可以从这里取到 （该事件触发比较频繁，跳转进度也会触发(jsmpeg解码器播放该事件只会触发一次，并且此时获取到的视频尺寸信息可能是错误的)，如果想在这个方法做一些操作，建议用loadedmetadata或loadeddata替代） |
| canplaythrough | --- | 可以正常播放且无需停顿和缓冲时触发。，视频总长度，尺寸信息可以从这里取到 （该事件触发比较频繁，跳转进度也会触发(jsmpeg解码器播放该事件只会在全部视频数据加载完后触发一次)，如果想在这个方法做一些操作，建议用loadedmetadata或loadeddata替代） |
| loadeddata | ---- | 加载视频当前帧时触发，视频总长度，尺寸信息可以从这里取到（由于jsmpeg解码器的差异性，视频总时长无法获取，jsmpeg主要是用于播放实时流的） |
| loadedmetadata | ---- | 元素据加载完毕，视频总长度，尺寸信息可以从这里取到（由于解码器的不同，获取视频信息可能也会有差异，比如jsmpeg.js在loadedmetadata触发时获取到的视频尺寸可能是错误的，建议在loadeddata事件中获取视频尺寸） |
| loadstart | ---- | 开始加载视频时触发 |
| play | --- | 播放事件 |
| pause | --- | 暂停事件 |
| ended | --- | 自然播放结束事件 |
| error | --- | 播放错误事件 |
| abort | --- | 播放中断事件 |
| timeupdate | --- | 播放进度更新事件 |
| waiting | --- | 加载中事件，当视频因为数据不足，需要停下来加载时会触发 |
| playing | --- | 继续播放事件，当视频因为数据不足停下来成功加载到数据之后继续播放时触发 |
| progress | --- | 进度加载事件 |
| seeking | --- | 进行跳转进度操作事件 |
| seeked | --- | 完成跳转进度操作事件 |
| seizing | --- | 视频（直播流）播放卡住事件（仅在播放时间卡住时起效） |
| seekvolume | --- | 音量改变事件 |
| seeklight | --- | 亮度改变事件 |
| mutedchange | --- | 静音改变事件 |
| ratechange | --- | 播放倍速改变事件 |
| durationchange | --- | 播放进度改变事件 |
| directionchange | --- | 屏幕方向改变事件 |
| fullscreenchange | --- | 全屏切换事件（type为api表示为全屏API调用的全屏type为css表示css模拟的全屏） |
| controlschange | --- | 控制栏显示\消失事件 |
| capturefinish | --- | 截图完成事件 |
| captureerror | --- | 截图失败事件（多半是视频链接在h5跨域导致的）|
| capturesaved | --- | 截图保存事件（一般不用管）|
| workchange | --- | 视频切换事件 |
| qualitychange | --- | 画质切换事件 |
| subtitlechange | --- | 字幕切换事件 |
| threechange | --- | 3D模式切换事件 |
| panocontrolschange | --- | 3D模式控制器切换事件 |
| danmuconfigchange | --- | 弹幕配置更改事件 |
| back | --- | 非全屏下点击头部控制器返回按钮触发 |
| hlserror | --- | hls.js加载错误事件 |
| flverror | --- | flv.js加载错误事件 |
| danmusend | --- | 弹幕发送事件 |
| danmuconfigchange | --- | 弹幕配置更改事件 |
| destroyed | --- | 视频销毁完成事件（可以在该事件触发时，退出视频页，避免页面报错） |

#内置方法
| 方法名 | 参数 | 说明 |
| :---: | :---: | :------- |
| play | --- | 播放 |
| pause | --- | 暂停 |
| toggle | --- | 播放/暂停 |
| seek | --- | 跳转位置（单位是s） |
| loadDanmu | --- | 加载弹幕模块 |
| unloadDanmu | --- | 卸载弹幕模块 |
| sendDanmu | --- | 发送并渲染弹幕 |
| insertDanmu | --- | 插入弹幕数据 |
| capture | type-截图类型：video-截图video标签, three-3D渲染模式下截图渲染后的画面, show-截图成功后是否展示截图弹窗 | 截取画面 |
| openFullscreen | direction-屏幕方向 | 开启全屏 |
| exitFullscreen | --- | 退出全屏 |
| showToast | --- | 消息提示（详情见下方） |
| showToolbar | --- | 展示工具栏（详情见下方） |
| disableGesture | --- | 禁用手势事件 |
| enableGesture | --- | 启用手势事件 |
| reloadVideo | --- | 重加载视频 |
| unload | --- | 卸载视频（卸载完成后会触发destroyed事件） |

#关于H5在history路由模式下使用该组件，组件不渲染并且报错的问题（报错了才看，没报错不用看）
* 主要原因是history路由模式下加载静态资源文件路径会被带上当前页面的pathname，所以在首页（因为首页pathname一般不会带上页面路由，自行加上和跳转的除外）引入组件不会报错，在其它页面引入组件就会报错，虽然组件内部已经做了处理，但为了防止定义的页面名称过于奇怪导致处理失败，所以预留webSrc属性允许开发者自行传入video.html的路径具体用法如下：
```html
	<!-- 引入播放器 -->
	<!-- localhost:8080/h5是你自己的项目站点，如果放在生产环境，也需要自行替换生产环境的站点 -->
	<yb-video web-src="localhost:8080/h5/uni_modules/yingbing-video/static/video.html" src="video.mp4" three="360"/>
```

#快速开始
```html
	<!-- 引入播放器 -->
	<yb-video src="video.mp4" height="auto" />
```

#360视频
* 3D配置

| 属性名 | 类型 | 默认值 | 说明 |
| :---: | :---: | :---: | :------ |
| controlsType | String | orientation | 控制器类型 orbit-手指或鼠标拖动 orientation-陀螺仪控制 |
| disableDragReverse | Boolean | false | 关闭反方向拖拽旋转（反向拖拽更符合人的直觉） |
| enableDamping | Boolean | true | 添加阻尼效果（滑动更顺畅） |
* VUE2使用
```html
	<!-- 引入播放器 -->
	<yb-video src="360全景视频.mp4" three="360"
	:custom="custom"
	@threechange="handleThreeChange"
	@panocontrolschange="handlePanoControlsChange"/>
```
```javascript
export default {
	data() {
		return {
			custom: {
				pano: {
					controlsType: 'orbit',//控制器类型 orbit-手指或鼠标拖动 orientation-陀螺仪控制
				},
				header: {
					enableThree: true//开启头部切换3D模式按钮
				},
				controls: {
					disablePanoControlsType: false//关闭控制器类型切换按钮
				}
			}
		}
	},
	methods: {
		//监听3D模式改变事件
		handleThreeChange (e) {
			console.log(e.value)//3D模式
			//可以在这里记录更改后的配置，以便用户下次继续使用
		},
		//监听动画控制器改变事件
		handlePanoControlsChange (e) {
			console.log(e.value)//动画控制器类型
			//可以在这里记录更改后的配置，以便用户下次继续使用
		}
	}
}
```
* VUE3使用
```html
	<!-- 引入播放器 -->
	<yb-video src="360全景视频.mp4" three="360"
	:custom="custom"
	@threechange="handleThreeChange"
	@panocontrolschange="handlePanoControlsChange"/>
```
```javascript
const custom = ref({
	pano: {
		controlsType: 'orbit',//控制器类型 orbit-手指或鼠标拖动 orientation-陀螺仪控制
	},
	header: {
		enableThree: true//开启头部切换3D模式按钮
	},
	controls: {
		disablePanoControlsType: false//关闭控制器类型切换按钮
	}
})
//监听3D模式改变事件
const handleThreeChange = (e) => {
	console.log(e.value)//3D模式
	//可以在这里记录更改后的配置，以便用户下次继续使用
}
//监听动画控制器改变事件
const handlePanoControlsChange = (e) => {
	console.log(e.value)//动画控制器类型
	//可以在这里记录更改后的配置，以便用户下次继续使用
}
```

#画质模块（quality）
* 画质列表属性

| 属性名 | 类型  | 说明 |
| :---: | :---: | :------ |
| title | String | 标题 |
| src | String | 播放链接（画质列表的索引是根据播放链接来的，也就是说当前播放链接是什么，播放的画质就是哪一个） |
| type | String | 解码器类型 auto-自动判断 video-使用video标签播放 hls-使用hls.js播放 flv-使用flv.js播放 |
* 画质配置

| 属性名 | 类型 | 默认值 | 说明 |
| :---: | :---: | :---: | :------ |
| name | String | 画质 | 自定义名称 |
* VUE2使用
```html
	<!-- 引入播放器 -->
	<yb-video src="video-480.mp4" :quality="quality" :custom="custom" @qualitychange="handleQualityChange" />
```
```javascript
export default {
	data() {
		return {
			quality: [{
				title: '480P',
				src: 'video-480.mp4',
				type: 'video'
			},{
				title: '720P',
				src: 'video-720.mp4',
				type: 'video'
			}],
			custom: {
				quality: {
					name: '播放源'//自定义名称
				}
			}
		}
	},
	methods: {
		//监听画质改变事件
		handleQualityChange (e) {
			console.log(e.index)//画质索引
			console.log(e.detail)//画质详情
			//可以在这里记录更改后的配置，以便用户下次继续使用
		}
	}
}
```
* VUE3使用
```html
	<!-- 引入播放器 -->
	<yb-video :quality="quality" src="video-480.mp4" :custom="custom" @qualitychange="handleQualityChange" />
```
```javascript
const quality = ref([{
	title: '480P',
	src: 'video-480.mp4',
	type: 'video'
},{
	title: '720P',
	src: 'video-720.mp4',
	type: 'video'
}])
const custom = ref({
	quality: {
		name: '播放源'//自定义名称
	}
})
//监听画质改变事件
const handleQualityChange = (e) => {
	console.log(e.index)//画质索引
	console.log(e.detail)//画质详情
	//可以在这里记录更改后的配置，以便用户下次继续使用
}
```

#字幕模块（subtitles）
* 字幕列表属性

| 属性名 | 类型  | 说明 |
| :---: | :---: | :------ |
| title | String | 标题 |
| src | String | 字幕文件链接（支持vtt,srt,ass）注意不管什么格式字幕都只有最基本显示，不支持高级动画（APP-NVUE不支持本地链接） |

* 字幕配置

| 属性名 | 类型 | 默认值 | 说明 |
| :---: | :---: | :---: | :------ |
| fontSize | Number | 18 | 文字大小 |
| color | String | #ffffff | 文字颜色 |
| bottom | String | 10% | 底部边距 |
| shadowColor | String | rgba(0,0,0,.5) | 字体阴影颜色 |

* VUE2使用
```html
	<!-- 引入播放器 -->
	<yb-video
	src="video.mp4"
	:subtitles="subtitles"
	:subtitleIndex="subtitleIndex"
	:custom="custom"
	@subtitlechange="handleSubtitleChange" />
```
```javascript
export default {
	data() {
		return {
			subtitleIndex: 0,//默认加载第一个字幕
			subtitles: [{
				title: '中文字幕',
				src: 'subtitle-ch.srt'
			},{
				title: '英文字幕',
				src: 'subtitle-en.vtt'
			},{
				title: '中英字幕',
				src: 'subtitle-ch-en.ass'
			}],
			custom: {
				subtitle: {//字幕配置
					bottom: '5%',
					fontSize: 15
				}
			}
		}
	},
	methods: {
		//监听字幕改变事件
		handleSubtitleChange (e) {
			console.log(e.index)//字幕索引
			console.log(e.detail)//字幕详情
			//可以在这里记录更改后的配置，以便用户下次继续使用
		}
	}
}
```
* VUE3使用
```html
	<!-- 引入播放器 -->
	<yb-video
	src="video.mp4"
	:subtitles="subtitles"
	:subtitleIndex="subtitleIndex"
	:custom="custom"
	@subtitlechange="handleSubtitleChange" />
```
```javascript
const subtitleIndex = ref(0)//默认加载第一个字幕
const subtitles = ref([{
	title: '中文字幕',
	src: 'subtitle-ch.srt'
},{
	title: '英文字幕',
	src: 'subtitle-en.vtt'
},{
	title: '中英字幕',
	src: 'subtitle-ch-en.ass'
}])
const custom = ref({
	subtitle: {//字幕配置
		bottom: 30,
		fontSize: 15
	}
})
//监听字幕改变事件
const handleSubtitleChange = (e) => {
	console.log(e.index)//字幕索引
	console.log(e.detail)//字幕详情
	//可以在这里记录更改后的配置，以便用户下次继续使用
}
```

#分P列表（works）
* 分P列表属性

| 属性名 | 类型  | 说明 |
| :---: | :---: | :------ |
| title | String | 标题 |
* 分P配置

| 属性名 | 类型 | 默认值 | 说明 |
| :---: | :---: | :---: | :------ |
| name | String | 分P | 自定义名称 |
* VUE2使用
```html
	<!-- 引入播放器 -->
	<yb-video
	:src="src"
	:works="works"
	:workIndex="workIndex"
	:custom="custom"
	@workchange="handleWorkChange" />
```
```javascript
export default {
	data() {
		return {
			src: 'video1.mp4',//默认第一集
			workIndex: 0,//默认第一集
			works: [{
				title: '第一集',
				src: 'video1.mp4'
			},{
				title: '第二集',
				src: 'video2.mp4'
			},{
				title: '第三集',
				src: 'video3.mp4'
			}],
			custom: {
				work: {
					name: '选集'//自定义名称
				}
			}
		}
	},
	methods: {
		//监听视频切换事件
		handleWorkChange (e) {
			console.log(e.index)//分P索引
			console.log(e.detail)//分P详情
			//可以在这里执行切换视频操作 比如
			this.src = e.detail.src
		}
	}
}
```
* VUE3使用
```html
	<!-- 引入播放器 -->
	<yb-video
	:src="src"
	:works="works"
	:workIndex="workIndex"
	:custom="custom"
	@workchange="handleWorkChange" />
```
```javascript
const src = ref('video1.mp4')
const workIndex = ref(0)//默认第一集
const works = ref([{
	title: '第一集',
	src: 'video1.mp4'
},{
	title: '第二集',
	src: 'video2.mp4'
},{
	title: '第三集',
	src: 'video3.mp4'
}])
const custom = ref({
	work: {
		name: '选集'//自定义名称
	}
})
//监听字幕改变事件
const handleWorkChange = (e) => {
	console.log(e.index)//分P索引
	console.log(e.detail)//分P详情
	//可以在这里执行切换视频操作 比如
	src.value = e.detail.src
}
```

#弹幕模块（danmu）
* 弹幕列表属性

| 属性名 | 类型  | 说明 |
| :---: | :---: | :------ |
| mode | Number | 弹幕模式（1-滚动 5-顶端 4-底端） |
| time | Number | 弹幕出现的时间(单位：秒) |
| text | String | 弹幕文本内容 |
| fontSize | Number | 弹幕大小(单位：像素) |
| color | String | 弹幕颜色 |

* 弹幕配置

| 属性名 | 类型 | 默认值 | 说明 |
| :---: | :---: | :---: | :------ |
| accuracy | Number/String | 1 | 绘制精度 auto-自动使用屏幕DPI 任意整数-自定义精度 高精度会导致性能问题，谨慎使用 |
| speed | Number | 1 | 弹幕速度 |
| playbackRate | Number | 1 | 弹幕倍速 |
| fontSize | Number | 18 | 文字大小 |
| fontScale | Number | 1 | 文字规格（几倍大小） |
| color | String | #ffffff | 默认颜色 |
| fontFamily | String | 'Microsoft Yahei' | 默认字体 |
| opacity | Number | 1 | 透明度，有效值 0-1 |
| top | Number | 0 | 画布上边距 |
| bottom | Number | 0 | 画布下边距 |
| lineGap | Number | 5 | 弹幕行间距 |
| overlap | Boolean | false | 防重叠（开启可能会丢失弹幕） |
| timeDiffrence | Number | 0 | 弹幕时间校准（一般用不到） |
| disableScroll | Boolean | false | 关闭滚动弹幕 |
| disableTop | Boolean | false | 关闭顶端弹幕 |
| disableBottom | Boolean | false | 关闭底端弹幕 |
| disableFilter | Boolean | false | 关闭弹幕过滤 |
| filter | Array | ---- | 弹幕过滤列表 |

* 弹幕过滤列表

| 属性名 | 类型  | 说明 |
| :---: | :---: | :------ |
| pattern | String | 过滤规则 |
| type | String | 规则类型(string-文本 regex-正则) |

* VUE2使用
```html
	<!-- 引入播放器 -->
	<yb-video ref="video" :danmu="danmu" :custom="custom" src="video.mp4"
	@loadedmetadata="handleLoadedmetadata"
	@danmusend="handleDanmuSend"
	@danmuconfigchange="handleDanmuConfigChange" />
	<input v-model="text" type="text" placeholder="输入弹幕" />
	<button @tap="sendDanmu">发送弹幕</button>
```
```javascript
export default {
	data() {
		return {
			danmu: [{
				mode: 1,
				time: 1,
				text: '这是滚动弹幕',
				fontSize: 24,
				color: '#ffffff',
			},{
				mode: 5,
				text: '这是顶端弹幕',
				fontSize: 24,
				color: '#0ff0ff',
			},{
				mode: 4,
				text: '这是底端弹幕',
				fontSize: 24,
				color: '#0ff0ff',
			}],
			custom: {
				//自定义弹幕配置
				danmu: {
					fontSize: 24,//弹幕默认大小
					fontScale: 0.7,//弹幕规格（多少倍大小）
					//弹幕过滤列表
					filter: [{
						pattern: '求不卡',//将包含 求不卡 的弹幕过滤掉
						type: 'string'//普通文本过滤
					},{
						pattern: '\\d+',//将包含数字的弹幕过滤掉（由于是js中写入字符串所以要用双斜杠，不然会被转义）
						type: 'regex'//正则过滤
					}]
				}
			},
			text: ''
		}
	},
	methods: {
		//监听视频加载成功
		handleLoadedmetadata (e) {
			//判断是初始化视频，因为内部画质切换，或者错误重加载也会触发load
			if ( e.type == 'init' )  {
				this.$refs.video.loadDanmu()//加载弹幕模块
			}
		},
		//监听弹幕发送事件
		handleDanmuSend (danmu) {
			//在这里处理弹幕，比如上传发送的弹幕到数据库
		},
		//监听弹幕配置改变事件
		handleDanmuConfigChange (config) {
			console.log(config)//config为更改后的配置
			//可以在这里记录更改后的配置，以便用户下次继续使用
		},
		sendDanmu = () => {
			if ( !this.text ) return
			this.$refs.video.sendDanmu({
				mode: 1,
				text: this.text,
				color: '#ffffff'
			}, true)//true表示使用边框
		}
	}
}
```
* VUE3使用
```html
	<!-- 引入播放器 -->
	<yb-video ref="videoRef" :danmu="danmu" :custom="custom" src="video.mp4"
	@loadedmetadata="handleLoadedmetadata"
	@danmusend="handleDanmuSend"
	@danmuconfigchange="handleDanmuConfigChange" />
	<input v-model="text" type="text" placeholder="输入弹幕" />
	<button @tap="sendDanmu">发送弹幕</button>
```
```javascript
const danmu = ref([{
	mode: 1,
	time: 1,
	text: '这是滚动弹幕',
	fontSize: 24,
	color: '#ffffff',
},{
	mode: 5,
	text: '这是顶端弹幕',
	fontSize: 24,
	color: '#0ff0ff',
},{
	mode: 4,
	text: '这是底端弹幕',
	fontSize: 24,
	color: '#0ff0ff',
}])
const custom = ref({
	danmu: {
		fontSize: 24,//弹幕默认大小
		fontScale: 0.7,//弹幕规格（多少倍大小）
		//弹幕过滤列表
		filter: [{
			pattern: '求不卡',//将包含 求不卡 的弹幕过滤掉
			type: 'string'//普通文本过滤
		},{
			pattern: '\\d+',//将包含数字的弹幕过滤掉（由于是js中写入字符串所以要用双斜杠，不然会被转义）
			type: 'regex'//正则过滤
		}]
	}
})
const text = ref('')
const videoRef = ref(null)
//监听视频加载成功
const handleLoadedmetadata = (e) => {
	//判断是初始化视频，因为内部画质切换，或者错误重加载也会触发load
	if ( e.type == 'init' )  {
		videoRef.value.loadDanmu()//加载弹幕模块
	}
}
//发送弹幕
const sendDanmu = () => {
	if ( !text.value ) return
	videoRef.value.sendDanmu({
		mode: 1,
		text: text.value,
		color: '#ffffff'
	})
}
//监听弹幕发送事件
const handleDanmuSend = (danmu) => {
	//在这里处理弹幕，比如上传发送的弹幕到数据库
}
//监听弹幕配置改变事件
const handleDanmuConfigChange = (config) => {
	console.log(config)//config为更改后的配置
	//可以在这里记录更改后的配置，以便用户下次继续使用
}
```
#hls.js （部分浏览器比如safri浏览器不支持hls.js，因为这些浏览器支持直接播放hls）
* 配置（hlsConfig）

| 属性名 | 类型 | 默认值 | 说明 |
| :---: | :---: | :---: | :------ |
| debug | Boolean | ---- | 流中是否有视频轨道 |
| enableWorker | Boolean | false | 是否使用Web Worker进行异步处理 |
| autoStartLoad | Boolean | true | 是否自动开始加载视频 |
| startPosition | Number | -1 | 指定开始播放的位置（单位：秒） |
| capLevelToPlayerSize | Boolean | false | 是否根据播放器尺寸限制最高质量等级 |
| capLevelOnFPSDrop | Boolean | ---- | 流中是否有视频轨道 |
| maxBufferLength | Number | 30 | 目标缓冲长度 |
| maxBufferSize | Number | 60000000 | 音频和视频轨道的最大缓冲大小，以字节为单位 |
| maxBufferHole | Number | 0.5 | 最大允许的缓冲间隙 |
| maxStarvationDelay | Number | ---- | 最大缓冲匮乏延迟，用于处理缓冲停滞问题 |
| manifestLoadingTimeOut | Number | 10000 | 主播放列表（m3u8）加载超时时间（ms） |
| levelLoadingTimeOut | Number | 10000 | 质量等级列表加载超时时间（ms） |
| fragLoadingTimeOut | Number | 20000 | 分片（ts文件）加载超时时间（ms） |
| startLevel | Number | -2 | 指定初始加载的视频质量等级 |
| abrBandWidthFactor | Number | 0.95 | 带宽估算保守因子 |
| abrEwmaFastLive | Number | 5.0 | 直播快速EWMA因子 |
| abrEwmaSlowLive | Number | 9.0 | 直播慢速EWMA因子 |
| abrEwmaDefaultEstimate | Number | ---- | 设置初始带宽预估，帮助播放器更准确判断 |
| liveSyncDurationCount | Number | 3 | 直播同步段数 |
| liveMaxLatencyDurationCount | Number | 10 | 最大延迟段数 |
| defaultAudioCodec | String | ---- | 设置默认音频编解码器 |
| xhrSetup | Function | ---- | 设置所有TS分片和M3U8播放列表请求头 |
| pLoader | Function | ---- | 自定义播放列表（m3u8）加载器，可用于拦截和修改请求 |
| fLoader | Function | ---- | 自定义分片（ts文件）加载器，可用于拦截和修改请求 |

* 由于webview和app通信的限制，函数是无法序列化传输的，所以如果要配置函数，需要使用字符串，如下所示：

```html
	<!-- 引入播放器 -->
	<yb-video ref="video" src="video.mp4" :hlsConfig="hlsConfig" />
```
```javascript
export default {
	data () {
		return {
			hlsConfig: {
				//本身应该传入函数，但因为通信限制，只能传入字符串，传入webview后，才会转换为函数
				xhrSetup: `function (xhr, url) {
					// 设置自定义请求头
					xhr.setRequestHeader('Authorization', 'Bearer your-token-here');
					xhr.setRequestHeader('Custom-Header', 'CustomValue');
					
					// 如果需要，你也可以根据 URL 判断并设置不同的头部
					if (url.includes('.ts')) {
					  xhr.setRequestHeader('X-Segment-Header', 'SegmentValue');
					}
				}`,
				//本身应该传入class类，但因为通信限制，只能传入字符串，传入webview后，才会转换为class
				pLoader: `
					class CustomPlaylistLoader {
					  constructor(config) {
					    // 初始化，如果需要可以使用配置
					  }
					
					  load(context, responseType, onSuccess, onError, onTimeout, timeout, retry, retryDelay) {
					    // 在加载前修改URL：添加上动态参数
					    const url = new URL(context.url);
					    url.searchParams.set('token', 'dynamic-token-value');
					    url.searchParams.set('t', Date.now()); // 例如加时间戳防止缓存
					    const modifiedUrl = url.toString();
					
					    // 使用修改后的URL进行Fetch
					    fetch(modifiedUrl, {
					      method: 'GET',
					      headers: new Headers({
					        'Authorization': 'Bearer your-token', // 同时可以设置自定义头
					        'Custom-Header': 'CustomValue'
					      })
					    }).then(response => {
					      if (!response.ok) {
					        throw new Error('Network response was not ok');
					      }
					      return response[responseType](); // 根据responseType处理响应体
					    }).then(data => {
					      onSuccess(response, data, modifiedUrl, context); // 成功回调
					    }).catch(error => {
					      onError(error); // 失败回调
					    });
					  }
					
					  abort() {
					    // 实现中止请求的逻辑，例如使用AbortController
					  }
					
					  destroy() {
					    // 执行清理工作
					  }
					}
				`
			}
		}
	}
}
```


#flv.js （不支持ios）
* 切片列表（segments）

| 属性名 | 类型 | 说明 |
| :---: | :---: | :------ |
| duration | Number | 必填字段，表示段持续时间（以毫秒为单位 |
| filesize | Number | 可选字段，以字节为单位指示段文件大小 |
| url | String | 必填字段，指示段文件URL |

* 配置（flvConfig）

| 属性名 | 类型 | 默认值 | 说明 |
| :---: | :---: | :---: | :------ |
| cors | Boolean | ---- | 是否启用CORS进行http提取 |
| withCredentials | Boolean | ---- | 是否对Cookie进行http提取 |
| hasAudio | Boolean | ---- | 流是否有音频轨道 |
| hasVideo | Boolean | ---- | 流中是否有视频轨道 |
| duration | Number | ---- | 总媒体持续时间（以毫秒为单位） |
| filesize | Number | ---- | 媒体文件的总文件大小，以字节为单位 |
| enableWorker | Boolean | false | 启用分离的线程进行转换（暂时不稳定） |
| enableStashBuffer | Boolean | true | 启用IO隐藏缓冲区。如果您需要实时（最小延迟）进行实时流播放，则设置为false，但是如果网络抖动，则可能会停顿 |
| stashInitialSize | Number | 384KB | 表示IO暂存缓冲区的初始大小。默认值为384KB。指出合适的尺寸可以改善视频负载/搜索时间 |
| isLive | Boolean | false | 同样要isLive在MediaDataSource，如果忽略已经在MediaDataSource结构集合 |
| lazyLoad | Boolean | true | 如果有足够的数据可播放，则中止http连接 |
| lazyLoadMaxDuration | Number | 3 * 60 | 指示要保留多少秒的数据lazyLoad |
| lazyLoadRecoverDuration | Number | 30 | 指示lazyLoad恢复时间边界，以秒为单位 |
| deferLoadAfterSourceOpen | Boolean | true | 在MediaSourcesourceopen事件触发后加载。在Chrome上，在后台打开的标签页可能不会触发sourceopen事件，除非切换到该标签页 |
| autoCleanupSourceBuffer | Boolean | false | 对SourceBuffer进行自动清理 |
| autoCleanupMaxBackwardDuration | Number | 3 * 60 | 当向后缓冲区持续时间超过此值（以秒为单位）时，请对SourceBuffer进行自动清理 |
| autoCleanupMinBackwardDuration | Number | 2 * 60 | 指示进行自动清除时为反向缓冲区保留的持续时间（以秒为单位） |
| fixAudioTimestampGap | Boolean | true | 当检测到较大的音频时间戳间隙时，请填充无声音频帧，以避免A / V不同步 |
| accurateSeek | Boolean | false | 精确查找任何帧，不限于视频IDR帧，但可能会慢一些。可用的Chrome > 50，FireFox和Safari |
| seekType | String | 'range' | 'range'使用范围请求进行查找，或'param'在url中添加参数以指示请求范围 |
| seekParamStart | String | 'bstart' | 指示的搜索起始参数名称 seekType = 'param' |
| seekParamEnd | String | 'bend' | 指示的搜索结束参数名称 seekType = 'param' |
| rangeLoadZeroStart | Boolean | false | Range: bytes=0-如果使用范围查找，则发送首次负载 |
| customSeekHandler | Object | ---- | 指示自定义搜索处理程序 |
| reuseRedirectedURL | Boolean | false | 重复使用301/302重定向的url进行子序列请求，例如搜索，重新连接等 |
| referrerPolicy | String | 'no-referrer-when-downgrade' | 指示使用FetchStreamLoader时的推荐人策略 |
| headers | Object | ---- | 指示将添加到请求的其他标头 |

#jsmpeg.js

* 配置（jsmpegConfig）

| 属性名 | 类型 | 默认值 | 说明 |
| :---: | :---: | :---: | :------ |
| loop | Boolean | true | 是否循环播放视频(仅静态文件)，默认=true |
| autoplay | Boolean | false | 是否立即开始播放（仅限静态文件），默认=false |
| audio | Boolean | true | 是否解码音频，默认=true |
| video | Boolean | true | 是否解码视频，默认=true |
| poster | String | ---- | 预览图像的URL，用来在视频播放之前作为海报显示。 |
| pauseWhenHidden | Boolean | true | 当页面处于非活动状态时是否暂停播放，默认=true（请注意，浏览器通常会在非活动选项卡中限制 JS） |
| disableGl | Boolean | false | 是否禁用WebGL，始终使用Canvas2D渲染器，默认=false |
| disableWebAssembly | Boolean | false | 是否禁用WebAssembly并始终使用JavaScript解码器，默认=false(不建议设置为true) |
| preserveDrawingBuffer | Boolean | ---- | WebGL上下文是否创建必要的“截图”（如果需要截图，要设置该属性为true，不然截图会黑屏） |
| progressive | Boolean | ---- | 是否以块的形式加载数据(仅静态文件)。当启用时，回放可以在完整加载源之前开始 |
| throttled | Boolean | ---- | 当不需要回放时是否推迟加载块。默认=progressive |
| chunkSize | Number | ---- | 指使用时，以字节为单位加载的块大小。默认(1 mb)1024*1024 |
| decodeFirstFrame | Boolean | true | 是否解码并显示视频的第一帧，一般用于设置画布大小以及使用初始帧作为"poster"图像。当使用自动播放或流媒体资源时，此参数不受影响。默认true |
| maxAudioLag | Number | ---- | 流媒体时，以秒为单位的最大排队音频长度。（可以理解为能接受的最大音画不同步时间） |
| maxAudioLag | Number | ---- | 流媒体时，以秒为单位的最大排队音频长度。（可以理解为能接受的最大音画不同步时间） |
| videoBufferSize | Number | ---- | 流媒体时，视频解码缓冲区的字节大小。默认的512 * 1024 (512 kb)。对于非常高的比特率，您可能需要增加此值。 |
| audioBufferSize | Number | ---- | 流媒体时，音频解码缓冲区的字节大小。默认的128 * 1024 (128 kb)。对于非常高的比特率，您可能需要增加此值。 |

#消息提示（showToast）
* VUE2使用
```html
	<!-- 引入播放器 -->
	<yb-video ref="video" src="video.mp4" @loadedmetadata="handleLoadedmetadata" />
```
```javascript
export default {
	methods: {
		handleLoadedmetadata (e) {
			this.$refs.video.showToast({
				message: '视频加载成功',//消息内容
				duration: 3000//显示周期
			})
		}
	}
}
```
* VUE3使用
```html
	<!-- 引入播放器 -->
	<yb-video ref="videoRef" src="video.mp4" @loadedmetadata="handleLoadedmetadata" />
```
```javascript
const videoRef = ref(null)
//监听截图保存事件
const handleLoadedmetadata = (e) => {
	videoRef.value.showToast({
		message: '视频加载成功',//消息内容
		duration: 3000//显示周期
	})
}
```

#自定义工具栏（showToolbar）
* VUE2使用
```html
	<!-- 引入播放器 -->
	<yb-video ref="video" src="video.mp4" :custom="custom" />
```
```javascript
export default {
	data () {
		return {
			custom: {
				controls: {
					rightSlots: [{
						innerHTML: '<div class="my-custom-btn yb-player-icon">自定义</div>',
						click: () => {
							this.$refs.video.showToolbar({
								selector: '.my-custom-btn',
								list: [{
									text: '自定义工具1',
									click: () => {
										this.$refs.video.showToast('自定义工具1')
									}
								},{
									text: '自定义工具2',
									click: () => {
										this.$refs.video.showToast('自定义工具2')
									}
								},{
									text: '自定义工具3',
									click: () => {
										this.$refs.video.showToast('自定义工具3')
									}
								}]
							})
						}
					}]
				}
			}
		}
	}
}
```
* VUE3使用
```html
	<!-- 引入播放器 -->
	<yb-video ref="videoRef" src="video.mp4" :custom="custom" />
```
```javascript
const videoRef = ref(null)
const custom = ref({
	controls: {
		rightSlots: [{
			innerHTML: '<div class="my-custom-btn yb-player-icon">自定义</div>',
			click: () => {
				videoRef.value.showToolbar({
					selector: '.my-custom-btn',
					list: [{
						text: '自定义工具1',
						click: () => {
							videoRef.value.showToast('自定义工具1')
						}
					},{
						text: '自定义工具2',
						click: () => {
							videoRef.value.showToast('自定义工具2')
						}
					},{
						text: '自定义工具3',
						click: () => {
							videoRef.value.showToast('自定义工具3')
						}
					}]
				})
			}
		}]
	}
})
```

#自定义配置（custom）（因为内容太多只展示VUE2示例，VUE3示例参考上面的示例更改）
```html
	<!-- 引入播放器 -->
	<yb-video src="video.mp4" :custom="custom" />
```
```javascript
export default {
	data () {
		return {
			custom: {
				disableLoading: false,//关闭loading
				disableCenterPlay: false,//关闭中间播放按钮
				disableError: false,//关闭加载错误提示
				disableBottomProgress: false,//关闭底部进度条
				//自定义插槽
				slots: [{
					innerHTML: '<div class="yb-player-icon" style="position:absolute;top:50px;left:50px;">跟随控制栏的按钮</div>',
					followControls: true,//跟随控制栏
					click: function () {
						console.log('点击了跟随控制栏的按钮')
					}
				},{
					innerHTML: '<div class="yb-player-icon" style="position:absolute;top:50px;right:50px;">永远显示的按钮</div>',
					followControls: false,//不跟随控制栏
					click: function () {
						console.log('点击了永远显示的按钮')
					}
				}],
				//头部控制器配置
				header: {
					disableBack: false,//关闭返回按钮
					disableTitle: false,//关闭标题显示
					disableWorks: false,//关闭分P按钮
					disableRate: false,//关闭倍速选择
					enableThree: false,//开启3D模式切换按钮
					disableMore: false,//关闭展示更多按钮
					disableLock: false,//关闭锁屏
					disableThreeCapture: false,//关闭3D截图
					disableCapture: false,//关闭视频截图
					disableDanmuFilter: false,//关闭弹幕过滤配置
					disableDanmuSetting: false,//关闭弹幕配置
					//更多选项自定义配置
					more: [{
						text: '测试按钮1',
						click: function () {
							console.log('点击了测试按钮1')
						}
					},{
						text: '测试按钮2',
						click: function () {
							console.log('点击了测试按钮2')
						}
					}],
					//左边插槽
					leftSlots: [{
						innerHTML: '<div class="yb-player-icon">左边按钮</div>',
						click: function () {
							console.log('点击了头部左边按钮')
						}
					}],
					//右边插槽
					rightSlots: [{
						innerHTML: '<div class="yb-player-icon">右边按钮</div>',
						click: function () {
							console.log('点击了头部右边按钮')
						}
					}]
				},
				//底部控制栏自定义配置
				controls: {
					disablePrev: false,//关闭播放上一个按钮
					disableNext: false,//关闭播放下一个按钮
					disableToggle: false,//关闭播放\暂停按钮
					disableDanmuSend: false,//关闭发送弹幕按钮
					disableFullscreen: false,//关闭全屏按钮
					disableMuted: false,//关闭静音按钮
					disableDanmuVisible: false,//关闭弹幕显示和隐藏按钮
					disableSubtitle: false,//关闭字幕切换按钮
					disableQuality: false,//关闭画质切换按钮
					disablePanoControlsType: false,//关闭3D模式控制器切换按钮
					//左边插槽
					leftSlots: [{
						innerHTML: `
							<svg viewBox="0 0 24 24">
								<path d="M8 5v14l11-7z"/>
							</svg>
						`,//如果要插入图标，只能使用svg
						click: function () {
							console.log('点击了控制栏左边插槽按钮')
						}
					}],
					//右边插槽
					rightSlots: [{
						innerHTML: `
							<svg viewBox="0 0 24 24">
								<path d="M8 5v14l11-7z"/>
							</svg>
						`,//如果要插入图标，只能使用svg
						click: function () {
							console.log('点击了控制栏右边插槽按钮')
						}
					}]
				},
				//进度条自定义配置
				progress: {
					disablePrev: false,//关闭播放上一个按钮
					disableNext: false,//关闭播放下一个按钮
					disableToggle: false,//关闭播放\暂停按钮
					disableFullscreen: false,//关闭全屏按钮
					disableRange: false,//关闭进度条拖动
					//左边插槽
					leftSlots: [{
						innerHTML: '<div class="yb-player-icon">左边按钮</div>',
						click: function () {
							console.log('点击了进度条左边按钮')
						}
					}],
					//右边插槽
					rightSlots: [{
						innerHTML: '<div class="yb-player-icon">右边按钮</div>',
						click: function () {
							console.log('点击了进度条右边按钮')
						}
					}]
				},
				//手势配置
				gesture: {
					initialVolume: 0,//初始化设备音量
					initialLight: 0,//初始化屏幕亮度
					disableUnFullscreenEvent: false,//关闭非全屏手势事件
					disableLongPress: false,//关闭长按事件
					disableLight: false,//关闭手势控制屏幕亮度
					disableVolume: false,//关闭手势控制设备音量
					disableProgress: false,//关闭手势跳转进度
					disableSingleClick: false,//关闭单击事件
					disableDoubleClick: false,//关闭双击事件
					disableDoubleClick: false,//关闭双击事件
					setLight: function (light) {//自定义改变亮度方法
						console.log('亮度', light)
					},
					setVolume: function (volume) {//自定义改变音量方法
						console.log('音量', volume)
					},
					getLight: function () {//自定义获取亮度方法
						return 1//返回亮度 0-1
					},
					getVolume: function () {//自定义获取音量方法
						return 1//返回音量 0-1
					}
				},
				//分P配置
				work: {
					name: '分P'//自定义名称
				},
				//画质配置
				quality: {
					name: '画质'//自定义名称
				},
				//字幕配置
				subtitle: {
					color: '#ffffff',//文字颜色
					fontSize: 18,//字体大小
					bottom: '10%',//底部边距
					shadowColor: 'rgba(0,0,0,.5)'//阴影颜色
				},
				//3D模式配置
				pano: {
					controlsType: 'orientation',//控制器类型 orbit-手指或鼠标拖动 orientation-陀螺仪控制
					disableDragReverse: false,//关闭反方向拖拽旋转（反向拖拽更符合人的直觉）
					enableDamping: true//添加阻尼效果（滑动更顺畅）
				},
				//弹幕配置
				danmu: {
					accuracy: 1,//绘制精度 auto-自动使用屏幕DPI 任意整数-自定义精度 高精度会导致性能问题，谨慎使用
					speed: 1,//弹幕运行速度
					playbackRate: 1,//弹幕倍速
					color: '#FFFFFF',//弹幕默认颜色
					fontSize: 18,//弹幕默认大小
					fontScale: 1,//弹幕规格（多少倍大小）
					fontFamily: 'Microsoft Yahei',//弹幕默认字体
					opacity: 1,//弹幕透明度
					top: 0,//舞台顶部间距
					bottom: 0,//舞台底部间距
					lineGap: 5,//弹幕行间距
					overlap: false,//开启防重叠
					timeDiffrence: 0,//时间差（用于校准弹幕和视频进度的时间差，一般不需要）
					disableScroll: false,//关闭滚动弹幕
					disableTop: false,//关闭顶端弹幕
					disableBottom: false,//关闭底端弹幕
					disableFilter: false,//关闭弹幕过滤
					filter: []//过滤列表
				}
			}
		}
	}
}
```

#全屏元素和非全屏元素标记
```html
	<!-- 引入播放器 -->
	<yb-video src="video.mp4" :custom="custom" />
```
* vue2使用
```javascript
export default {
	data () {
		return {
			custom: {
				//头部控制器配置
				header: {
					//右边插槽
					rightSlots: [{
						innerHTML: '<div class="yb-player-icon yb-plyer-full">头部按钮1</div>',//yb-plyer-full表示该插槽元素只在全屏时显示
						click: function () {
							console.log('点击了只在全屏时显示的头部按钮')
						}
					},{
						innerHTML: '<div class="yb-player-icon yb-plyer-unfull">头部按钮2</div>',//yb-plyer-unfull表示该插槽元素只在非全屏时显示
						click: function () {
							console.log('点击了只在非全屏时显示的头部按钮')
						}
					}]
				}
			}
		}
	}
}
```
* VUE3使用
```html
	<!-- 引入播放器 -->
	<yb-video ref="videoRef" src="video.mp4" :custom="custom" />
```
```javascript
const custom = ref({
	//头部控制器配置
	header: {
		//插槽
		rightSlots: [{
			innerHTML: '<div class="yb-player-icon yb-plyer-full">头部按钮1</div>',//yb-plyer-full表示该插槽元素只在全屏时显示
			click: function () {
				console.log('点击了只在全屏时显示的头部按钮')
			}
		},{
			innerHTML: '<div class="yb-player-icon yb-plyer-unfull">头部按钮2</div>',//yb-plyer-unfull表示该插槽元素只在非全屏时显示
			click: function () {
				console.log('点击了只在非全屏时显示的头部按钮')
			}
		}]
	}
})
```

#组件插槽（仅在renderjs渲染模式下有效）
* VUE2使用
```html
	<!-- 引入播放器 -->
	<yb-video ref="video" render-type="renderjs" src="video.mp4" >
		<view class="custom-slot" @tap="handleSlotClick">这是组件插槽仅在renderjs渲染模式下有效</view>
		<!-- yb-player-gesture是手势事件标记，如果不添加yb-player-gesture类，点击到该组件会阻止手势事件（比如点击弹出控制栏），自行根据需求添加 -->
		<view class="custom-slot yb-player-gesture" @tap="handleSlotClick">这是组件插槽仅在renderjs渲染模式下有效</view>
	</yb-video>
```
```javascript
export default {
	method: {
		handleSlotClick () {
			this.$refs.video.showToast('点击了组件插槽')
		}
	}
}
```
```css
.custom-slot{
	position:absolute;
	top:50px;
	left:50px;
	color:#fff;
}
```
* VUE3使用
```html
	<!-- 引入播放器 -->
	<yb-video ref="videoRef" render-type="renderjs" src="video.mp4" >
		<view class="custom-slot" @tap="handleSlotClick">这是组件插槽仅在renderjs渲染模式下有效</view>
		<!-- yb-player-gesture是手势事件标记，如果不添加yb-player-gesture类，点击到该组件会阻止手势事件（比如点击弹出控制栏），自行根据需求添加 -->
		<view class="custom-slot yb-player-gesture" @tap="handleSlotClick">这是组件插槽仅在renderjs渲染模式下有效</view>
	</yb-video>
```
```javascript
const videoRef = ref(null)
const handleSlotClick = () => {
	videoRef.value.showToast('点击了组件插槽')
}
```
```css
.custom-slot{
	position:absolute;
	top:50px;
	left:50px;
	color:#fff;
}
```

#IOS特别说明
* IOS播放hls视频流，在新版本的ios系统中，需要指定type为video才能播放，这是因为新版本的ios系统中Hls.isSupported()方法返回的是true，但ios又不支持使用hls.js播放hls视频流
* IOS可能不支持在APP-NVUE环境使用本插件，因为WKWbview内核对于访问本地的html文件，也认为是跨域行为
* IOS即将废弃UIWebview内核，所以ios项目默认使用WKWebview，而WKWebview严格执行cors策略，很多行为都会被认为是跨域行为，导致很多操作无法执行，特别是使用iframe加载本地网页，所以ios只能使用renderjs方式渲染视频（或许H5可以）
* IOS想使用web方式渲染或者在APP-NVUE中使用，需要去manifest.json里面配置webview内核为UIWebview，如下：
```json
	// 在manifest.json配置
	"app-plus": {
		"kernel": {
			"ios": "UIWebview"    //或者 "WKWebview"
		},
		// ...
	}
```
* 如果你修改了webview内核在APP-NVUE-IOS环境使用本插件，会有全屏问题，因为IOS不支持全屏API，只能使用css模拟，但APP-NVUE不支持z-index控制层级，默认后渲染得元素层级更高，所以APP-NVUE-IOS全屏时可能会出现无法遮盖后渲染元素得问题
* 正如上面所说IOS不支持全屏API，所以IOS在APP-VUE和H5得全屏也和安卓有区别，在IOS上使用css模拟全屏无法遮盖原生元素，需要自行遮盖和隐藏，如下：
```json
	// 在pages.json配置引入播放器的页面为沉浸模式
	{
		"path": "pages/index/index",
		"style": {
			"navigationStyle": "custom"//隐藏原生导航栏
		}
	},
```
```html
	<!-- 在pages/index/index页面引入播放器 -->
	<yb-video src="video.mp4" @fullscreenchange="handleFullscreenChange" />
```
```javascript
export default {
	methods: {
		handleFullscreenChange (e) {
			//css模拟的全屏
			if ( e.type == 'css' ) {
				//当前状态是开启全屏
				if ( e.fullscreen ) {
					//可以在这里做无法遮盖原生元素的隐藏
					//插件内部已经调用plus.screen.setFullscreen(true)和plus.hideSystemNavigation() 一般不用调用
				}
				//当前状态是退出全屏
				else {
					//可以在这里做无法遮盖原生元素的显示
					//插件内部已经调用plus.screen.setFullscreen(false)和plus.showSystemNavigation() 一般不用调用
				}
			}
			
		}
	}
}
```
* 真机调试IOS发现横竖屏设置无效，需要去manifest.json配置屏幕方向（配置完成后需重新打包自定义基座或者apk才会生效）
```json
	// 在manifest.json配置screenOrientation的屏幕方向
	 "app-plus" : {
		"screenOrientation": [
			"portrait-primary",
			"portrait-secondary",
			"landscape-primary",
			"landscape-secondary"
		]//ios不配置屏幕方向，无法旋转屏幕
	}
```