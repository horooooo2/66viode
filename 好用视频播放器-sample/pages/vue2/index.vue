<template>
	<view>
		<yb-video ref="video" title="测试视频" height="auto"
		render-type="renderjs"
		:crossOrigin="crossOrigin"
		:src="src"
		:three="three"
		:danmu="danmu"
		:quality="quality"
		:subtitles="subtitles"
		:works="works"
		:workIndex="workIndex"
		:custom="custom"
		header
		controls
		loop
		object-fit="contain"
		@destroyed="handleDestroyed"
		@workchange="handleWorkChange"
		@qualitychange="handleQualityChange"
		@loadedmetadata="handleLoaded"
		@danmufilterreduce="handleDanmuFilterReduce"
		@danmufilteradd="handleDanmuFilterAdd">
			<view style="position: absolute;top:50px;left:50px;color:#fff" @tap="handleClickSlot">这是组件插槽仅在renderjs渲染类型下有效</view>
		</yb-video>
		<input class="danmu-input" v-model="text" type="text" placeholder="输入弹幕" />
		<button @tap="sendDanmu(1)">发送滚动弹幕</button>
		<button @tap="sendDanmu(5)">发送顶端弹幕</button>
		<button @tap="sendDanmu(4)">发送底端弹幕</button>
		<button @tap="toggle">播放/暂停</button>
		<button @tap="changeSrc(0)">切换3D</button>
		<button @tap="changeSrc(2)">切换2D</button>
		<button @tap="toNvue">NVUE测试</button>
		<button @tap="toVue3">VUE3语法测试（请在vue3版本下测试）</button>
		<button @tap="destroy">销毁视频</button>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				src: '',
				three: '',
				crossOrigin: '',
				danmu: [],
				quality: [],
				works: [],
				workIndex: 0,
				subtitles: [{
					title: 'ASS字幕',
					src: '/static/subtitle/[zmk.pw]我的世界大电影精译v3.ass'
				},{
					title: 'SRT字幕',
					src: '/static/subtitle/wednesday.1080p.web.h264-successfulcrab-hi.srt'
				},{
					title: 'VTT字幕',
					src: '/static/subtitle/sing-song_2025-09-05_103755.vtt'
				}],
				custom: {
					header: {
						more: [{
							text: '测试按钮',
							click: () => {
								this.$refs.video.showToast('点击了测试按钮')
							}
						}]
					},
					progress: {
						rightSlots: [{
							innerHTML: `
								<div class="custom_danmu">
									<svg t="1756368791455" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4446" width="48" height="48"><path d="M628.01 470.03h88.851v71.575h-88.85V470.03zM628.01 361.426h88.851v69.107h-88.85v-69.107zM497.184 470.03h86.382v71.575h-86.382V470.03z" p-id="4447"></path><path d="M798.06 65.29H225.939c-81.839 0-148.204 68.834-148.204 153.746V795.52c0 84.93 67.835 163.189 151.559 163.189h565.393c83.724 0 151.577-78.277 151.577-163.189V219.036c0.001-84.911-66.344-153.746-148.202-153.746zM541.61 213.325c11.497 21.402 23.032 49.363 34.567 83.922-14.815 4.938-31.287 11.535-49.383 19.744-6.596-29.62-16.453-56.771-29.611-81.454l44.427-22.212zM400.927 586.04l-9.876 116.01c-3.318 32.91-17.718 52.644-43.201 59.26a631.2 631.2 0 0 1-77.75 14.796c-3.317-21.412-9.065-41.966-17.284-61.71 37.847 1.658 62.52 1.235 74.056-1.234 11.479-2.47 18.076-13.572 19.735-33.323l9.876-123.42h-118.48c6.558-52.651 9.875-109.413 9.875-170.321H358.97v-91.32c-54.32 0-97.125 0.848-128.357 2.469v-44.435c26.294 1.668 51.832 2.47 76.505 2.47h98.747a1257.144 1257.144 0 0 0-2.488 78.983c0 26.341 0.83 56.78 2.488 91.34H292.323l-4.938 88.86h120.93c-3.318 23.05-5.767 46.884-7.388 71.575z m397.398 101.205c-32.947-1.611-60.9-2.469-83.932-2.469h-86.382c0 37.877 0.79 74.045 2.469 108.614h-49.363c1.62-37.884 2.45-74.055 2.45-108.614H487.31c-26.33 1.67-49.363 3.318-69.116 4.948v-46.903c19.753 1.648 42.785 3.307 69.116 4.928h96.258v-66.648H447.821c1.62-41.108 2.469-85.543 2.469-133.286 0-47.715-0.848-88.86-2.47-123.418h180.19c14.816-34.558 27.952-69.918 39.506-106.145 18.058 8.256 37 15.664 56.753 22.223-16.474 18.123-32.08 46.084-46.895 83.922h86.382c-1.658 31.278-2.469 73.234-2.469 125.878 0 52.681 0.81 96.268 2.47 130.827H628.01v66.648h83.913c21.374 0 50.174-0.81 86.4-2.47v41.965z" p-id="4448"></path><path d="M497.184 361.426h86.382v69.107h-86.382v-69.107z" p-id="4449"></path></svg>
								</div>
							`,
							click: () => {
								this.$refs.video.showToolbar({
									selector: '.custom_danmu',
									list: [{
										text: '重置弹幕',
										click: () => {
											this.loadDanmu()
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
					},
					danmu: {
						//过滤列表
						filter: [{
							pattern: 'ost',
							type: 'string'//普通文本过滤
						},{
							pattern: '发弹幕',
							type: 'string'
						},{
							pattern: '求不卡',
							type: 'string'
						},{
							pattern: '\\d+',
							type: 'regex'//正则过滤
						}]
					}
				},
				text: ''
			}
		},
		onReady () {
			this.changeSrc(3)
		},
		methods: {
			changeSrc (index) {
				var arr = [
					'/static/video/test-360.mp4',//如果网页开启了/h5/的前缀，就需要加上这个/h5/
					'https://v2-zj-scct.kwaicdn.com/upic/2025/08/14/20/BMjAyNTA4MTQyMDEwMDVfMzc5NDk1NDg1Nl8xNzIzNjYyNjIwNDdfMF8z_b_B92c62e9609ee404af820675b37447d6d.mp4?tag=1-1756166590-unknown-0-wo6mf8iejp-e4f1ab14369cda6a&provider=self&clientCacheKey=3x4mikyhc8uu4jk_b.mp4&di=b6859a4d&bp=14944&x-ks-ptid=172366262047&kwai-not-alloc=self-cdn&kcdntag=p:Sichuan;i:ChinaTelecom;ft:UNKNOWN;h:COLD;pn:kuaishouVideoProjection&Aecs=172.19.0.226&ocid=100000971&tt=b&ss=vps',
					'https://files2.changyou.com/vc/dj/2023/1115/loop2.ts',
					'https://ydtnt-jw.oss-cn-zhangjiakou.aliyuncs.com/jw-video/%E8%A7%86%E9%A2%91/%E8%8B%B1%E8%AF%AD/%E5%94%90%E8%BF%9F%E8%AF%8D%E6%B1%87%E7%9A%84%E9%80%BB%E8%BE%91%E5%8D%95%E8%AF%8D%E8%AF%BE/Unit1-1_batch.mp4'
				]
				this.quality = []
				for ( let i = 0 ; i < 3; i++ ) {
					this.quality.push({
						title: i == 0 ? '480p' : i == 1 ? '720p' : '1080p',
						src: arr[index],
						type: 'video'
					})
				}
				this.works = []
				for ( let i = 0 ; i < 10; i++ ) {
					this.works.push({
						title: '第' + (i + 1) + '集',
						src: arr[index]
					})
				}
				this.workIndex = 0
				this.three = index == 0 ? '360' : 'none'
				this.crossOrigin = index == 0 ? 'anonymous' : ''
				this.src = arr[index]
			},
			handleDestroyed () {
				uni.showToast({
					title: '视频已销毁',
					icon: 'none'
				})
				console.log('destroyed');
			},
			handleWorkChange (e) {
				this.src = e.detail.src
				this.$refs.video.showToast('由于测试切换链接和当前播放链接是同一个所以不会触发视频切换')
			},
			handleQualityChange (e) {
				this.$refs.video.showToast('由于所有画质链接都是一样的，所以怎么切换都会索引到第一个画质')
			},
			handleLoaded (e) {
				if ( e.type == 'init' ) {
					this.loadDanmu()
				}
			},
			handleDanmuFilterReduce (e) {
				console.log('reduce', e);
			},
			handleDanmuFilterAdd (e) {
				console.log('add', e);
			},
			async loadDanmu () {
				this.danmu = []
				// for (var i = 0 ; i < 8000; i++) {
				// 	this.danmu.push({
				// 		mode: 1,
				// 		time: 1 * i / 2, // 弹幕出现的时间(单位：毫秒)
				// 		text: '这是新增的一条弹幕' + i, // 弹幕文本内容
				// 		color: '#0ff', // 该条弹幕的颜色，会覆盖全局设置
				// 	})
				// }
				this.danmu = await this.getDanmu()
				this.$nextTick(() => {
					this.$refs.video.loadDanmu()
				})
			},
			getDanmu () {
				const url = '/static/danmu/bilibilimadoka.xml'
				return new Promise(resolve => {
					// #ifdef H5
					uni.request({
						url,
						success: (res) => {
							resolve(this.parseDanmu(res.data))
						}
					})
					// #endif
					// #ifdef APP-PLUS
					plus.io.resolveLocalFileSystemURL(url,( entry ) => {
						// 可通过entry对象操作test.html文件 
						entry.file((file) => {
							var fileReader = new plus.io.FileReader();
							fileReader.readAsText(file, 'utf-8');
							fileReader.onloadend = (evt) => {
								resolve(this.parseDanmu(evt.target.result))
							}
						} );
					}, function ( e ) {
						resolve(null)
					} );
					// #endif
				})
			},
			parseDanmu (content) {
				const pattern = /<d\b[^>]*>(.*?)<\/d\s*>/g;
				const danmuku = []
				let match = ''
				while ((match = pattern.exec(content)) !== null) {
					const attr = match[0].match(/p=\"*([\s\S]*?)\"/)[1]
					const attrs = attr.split(',')
					danmuku.push({
						mode: attrs[1],
						time: Number(attrs[0]),
						color: this.decimalToRgb(Number(attrs[3])),
						fontSize: attrs[2],
						text: match[1]
					})
				}
				return danmuku
			},
			decimalToRgb (decimal) {
				var r = (decimal >> 16) & 255;
				var g = (decimal >> 8) & 255;
				var b = decimal & 255;
				return 'rgb(' + r + ',' + g + ',' + b + ')'
			},
			toggle () {
				this.$refs.video.toggle()
			},
			sendDanmu (mode) {
				if ( !this.text ) return
				this.$refs.video.sendDanmu({
					mode,
					text: this.text,
					color: '#ffffff',
					fontSize: 18
				}, true)//true表示使用边框
				this.$refs.video.showToast({message: '发送弹幕成功', duration: 5000})
			},
			handleClickSlot () {
				this.$refs.video.showToast('点击了组件插槽')
			},
			destroy () {
				this.$refs.video.unload()
			},
			toNvue () {
				uni.navigateTo({
					url: '/pages/nvue/index'
				})
			},
			toVue3 () {
				uni.navigateTo({
					url: '/pages/vue3/index'
				})
			}
		}
	}
</script>

<style>
	.danmu-input {
		border: 1px solid #eee;
		height: 45px;
		padding: 0 10px;
	}
</style>