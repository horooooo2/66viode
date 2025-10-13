<template>
	<view class="custom-tabbar">
		<view v-for="(item, index) in list" :key="index" class="tabbar-item" @click="switchTab(index)">
			<image :src="current === index ? item.selectedIconPath : item.iconPath" class="tabbar-icon" />
			<text :class="{active: current === index}">{{ item.text }}</text>
		</view>
	</view>
	<Sidebar ref="sidebarRef"></Sidebar>
</template>

<script>
	import Sidebar from '@/components/Sidebar/index.vue'
	export default {
		props: {
			current: {
				type: Number,
				default: 1
			}
		},
		components: {
			Sidebar,
		},
		data() {
			return {
				list: [{
						pagePath: "/pages/points/index",
						text: "商城",
						iconPath: "/static/images/tabbar/foot2.png",
						selectedIconPath: "/static/images/tabbar/foot2_active.png"
					},
					{
						pagePath: "/pages/entertainment/index",
						text: "文娱",
						iconPath: "/static/images/tabbar/foot3.png",
						selectedIconPath: "/static/images/tabbar/foot3_active.png"
					},
					{
						pagePath: "/pages/eat/index",
						text: "首页",
						iconPath: "/static/images/tabbar/foot1.png",
						selectedIconPath: "/static/images/tabbar/foot1_active.png"
					},
					{
						pagePath: "/pages/active/index",
						text: "活动",
						iconPath: "/static/images/tabbar/foot4.png",
						selectedIconPath: "/static/images/tabbar/foot4_active.png"
					},
					{
						pagePath: "/pages/user/index",
						text: "我的",
						iconPath: "/static/images/tabbar/foot5.png",
						selectedIconPath: "/static/images/tabbar/foot5_active.png"
					}

				]
			}
		},
		methods: {
			switchTab(index) {
				console.log(index)
				// if(!index){
				// 	return this.$refs.sidebarRef && this.$refs.sidebarRef.open()
				// }
				if (this.current === index) return;

				uni.navigateTo({
					url: this.list[index].pagePath
				});
				// 通知父组件更新current
				this.$emit('change', index);
			},
			showPopup() {
				uni.$emit('showCenterPopup');
			}
		}
	}
</script>

<style>
	.custom-tabbar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background: #101010;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
		z-index: 999;
	}

	.tabbar-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
	}

	.tabbar-item text {
		color: #666;
		font-size: 12px;
	}

	.tabbar-icon {
		width: 40rpx;
		height: 40rpx;
		margin-bottom: 4rpx;
	}

	.active {
		color: #007AFF;
	}

	.center-button {
		position: absolute;
		bottom: 20rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		background: linear-gradient(135deg, #007AFF, #00C6FF);
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 4rpx 10rpx rgba(0, 122, 255, 0.3);
	}

	.center-button image {
		width: 60rpx;
		height: 60rpx;
	}
</style>