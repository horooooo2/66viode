<template>
	<view class="appbox" v-if="appShow">
		<view class="close" @click="appClose()"></view>
		<image style="height: 90rpx;" src="/static/images/app.png" mode="widthFix"></image>
		<view class="download"></view>
	</view>
</template>

<script>
// 应用下载状态管理常量
const APP_STORAGE_KEY = 'app_download_closed'

export default {
	name:"appDownload",
	data() {
		return {
			appShow: true, // 默认显示，等检查到关闭状态后再隐藏
		};
	},
	mounted() {
		// 组件挂载时检查状态
		this.checkAppShowStatus()
	},
	methods:{
		// 检查是否应该显示
		checkAppShowStatus() {
			const isClosed = this.getAppClosedStatus()
			console.log('检查状态，是否已关闭:', isClosed)
			// 如果关闭过，就隐藏
			if (isClosed) {
				this.appShow = false
			}
		},
		
		// 获取应用下载关闭状态
		getAppClosedStatus() {
			try {
				// 只在H5环境下使用sessionStorage
				if (typeof sessionStorage !== 'undefined') {
					const appCloseData = sessionStorage.getItem(APP_STORAGE_KEY)
					console.log('从sessionStorage获取:', appCloseData)
					
					if (!appCloseData) {
						console.log('没有找到关闭记录，显示组件')
						return false
					}
					
					const data = JSON.parse(appCloseData)
					console.log('解析后的数据:', data)
					return data.closed === true
				}
				console.log('非H5环境，默认显示')
				return false
			} catch (error) {
				console.error('解析应用下载状态失败:', error)
				this.clearAppStatus()
				return false
			}
		},
		
		// 清除应用下载状态
		clearAppStatus() {
			if (typeof sessionStorage !== 'undefined') {
				sessionStorage.removeItem(APP_STORAGE_KEY)
				console.log('已清除应用关闭状态')
			}
		},
		
		// 关闭应用下载
		appClose(){
			console.log('用户点击关闭')
			this.appShow = false
			this.setAppClosedStatus()
		},
		
		// 设置应用下载关闭状态
		setAppClosedStatus() {
			if (typeof sessionStorage !== 'undefined') {
				const closeData = {
					closed: true
				}
				sessionStorage.setItem(APP_STORAGE_KEY, JSON.stringify(closeData))
				console.log('已设置应用关闭状态到sessionStorage')
			}
		}
	}
}
</script>

<style>
.appbox {
			width: 100%;
			margin-bottom: 10rpx;
			position: relative;
			uni-image {
				width: 100%;
				display: block;
			}
			.close{
				width: 100rpx;
				height: 100%;
				position: absolute;
				left: 0;
				z-index: 9999;
			}
			.download{
				width: 200rpx;
				height: 100%;
				position: absolute;
				right: 0;
			}
		}
</style>