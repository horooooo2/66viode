<template>
	<view class="points">
		<appDownload></appDownload>
		 <scroll-view
			scroll-y
			:refresher-enabled="true"
			:refresher-triggered="isRefreshing"
			@refresherrefresh="onRefresh"
		>
			<view class="status_bar"></view>
			<view class="header">
				<image class="logo" :src="logo" mode="widthFix"></image>
				<!-- <view class="right">
					<Surplus></Surplus>
					<view class="avatar"></view>
				</view> -->
			</view>
			<view class="points-container">
				<view class="point-menus">
					<view class="menus-box">
						<!-- <view class="menu-item">
							<image class="icon" src="/static/images/points/icon_cz.png" mode=""></image>
							<text>创作</text>
						</view> -->
						<view class="menu-item" @click="toLink('/pages/friends/index')">
							<image class="icon" src="/static/images/points/icon_yqhy.png" mode=""></image>
							<text>邀请好友</text>
						</view>
						<view class="menu-item" @click="toLink('/pages/address/index')">
							<image class="icon" src="/static/images/points/icon_shdz.png" mode=""></image>
							<text>收货地址</text>
						</view>
						<view class="menu-item" @click="toLink('/pages/order/index')">
							<image class="icon" src="/static/images/points/icon_ddjl.png" mode=""></image>
							<text>订单记录</text>
						</view>
					</view>
				</view>
				<view class="point-list">
					<view class="point-title">福利兑换</view>
					<!-- 数据列表 -->
					<list :list="listData" @refreshList='refreshList'></list>
				</view>
			</view>
		</scroll-view>
		<custom-tabbar :current="0" @change="handleTabChange"></custom-tabbar>
	</view>
</template>

<script>
	import NavBar from '@/components/NavBar/index.vue'
	import Surplus from "@/components/Surplus/index.vue"
	import Empty from "@/pages/search/components/empty.vue";
	import list from "./components/list.vue"
	import appDownload from "@/components/appDownload.vue";
	import CustomTabbar from '@/components/custom-tabbar.vue'
	import {
		apiGoodsList
	} from '@/common/api/goods.js'
	export default {
		components: {
			Surplus,
			list,
			CustomTabbar,
			appDownload,
			Empty,
			NavBar
		},
		data() {
			return {
				isRefreshing: false,
				listData: [], // 数据
				// 控制onShow事件是否刷新订单列表
				canReset: false,
				total: 0,
				logo: ''
			}
		},
		onShow() {
			this.canReset && this.refreshList()
			this.canReset = false
		},
		created() {
			this.getList();
			this.logo = uni.getStorageSync('logo');
		},
		methods: {
			// 刷新列表
			refreshList() {
				this.listData = [] // 先置空列表,显示加载进度
				setTimeout(() => {
					this.getList()
				}, 120)
			},
			onRefresh() {
				this.isRefreshing = true;
				setTimeout(() => {
					this.getList();
				}, 100);
			},
			getList() {
				apiGoodsList({
					page: 1,
					limit: 10,
				}).then(res => {
					let data = res.data;
					this.total = data.total;

					this.listData = data.list; //追加新数据
					this.isRefreshing = false;
				}).catch(() => {
					this.isRefreshing = false;
				})
			},
			toLink(url) {
				uni.navigateTo({ url })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.points {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		background-image: url("/static/images/index/bg.png");
		background-position: top center;
		background-repeat: no-repeat;
		background-size: cover;
		display: flex;
		flex-direction: column;

		.header {
			width: 100%;
			height: 100rpx;
			padding: 0 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.logo {
				width: 40rpx;
				height: 40rpx;
			}

			.right {
				display: flex;
				gap: 20rpx;

				.avatar {
					width: 64rpx;
					height: 64rpx;
					border-radius: 50%;
					background: linear-gradient(0deg, #D018F5 0%, #FA3296 100%);
				}
			}
		}

		.points-container {
			min-height: 0;
			flex: 1;
			width: 100%;
			padding: 24rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;

			.point-menus {
				width: 100%;
				padding: 28rpx 24rpx;
				box-sizing: border-box;
				border-radius: 20rpx;
				background: #202020;
				margin-bottom: 20rpx;

				.menus-box {
					width: 100%;
					display: grid;
					grid-template-columns: repeat(3, 1fr);
					gap: 68rpx;
					border-radius: 20rpx;
					background: #333;
					padding: 26rpx 18rpx;
					box-sizing: border-box;

					.menu-item {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						gap: 16rpx;

						.icon {
							width: 64rpx;
							height: 64rpx;
						}

						text {
							color: #fff;
							font-size: 26rpx;
						}
					}
				}
			}

			.point-list {
				min-height: 0;
				flex: 1;
				width: 100%;
				display: flex;
				flex-direction: column;
				padding: 0 20rpx 30rpx;
				box-sizing: border-box;
				gap: 8rpx;
				border-radius: 20rpx;
				background: #202020;

				.point-title {
					padding: 22rpx 0;
					box-sizing: border-box;
					color: #ddd;
					font-size: 32rpx;
					font-weight: 500;
					line-height: 36rpx;
					text-align: center;
				}
			}
		}
	}
</style>