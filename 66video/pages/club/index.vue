<template>
	<view class="club">
		<view class="club-main">
			<NavBar title="VIP俱乐部"></NavBar>
			<view class="banner">
				<!-- <view class="userinfo">
					<view class="avatar">
						<image src="/static/images/mine/avatar.png" mode=""></image>
					</view>
					<text>zack</text>
				</view> -->
				<view class="vip-box">
					<view class="status" v-if="!userInfo.vip_status.is_vip">未开通</view>
					<view class="status" v-else>已开通</view>
					<view class="button">积分兑换</view>
				</view>
			</view>
			<view class="container">
				<view class="title-box">
					<view class="line"></view>
					<view class="title">我的特权</view>
					<view class="more">
						<image src="/static/images/club/lock.png" mode=""></image>
						<text>已解锁全部特权</text>
					</view>
				</view>
				<view class="list">
					<view class="list-item">
						<image class="icon" src="/static/images/club/img1.png" mode=""></image>
						<view class="label">尊贵标识</view>
						<view class="desc">评论尊贵标识</view>
					</view>
				</view>
				<view class="title-box">
					<view class="line"></view>
					<view class="title">悦读特权</view>
					<view class="more">
						<image src="/static/images/club/lock.png" mode=""></image>
						<text>已解锁全部特权</text>
					</view>
				</view>
				<view class="list">
					<view class="list-item">
						<image class="icon" src="/static/images/club/img2.png" mode=""></image>
						<view class="label">观影次数</view>
						<view class="desc">观看次数1/每月</view>
					</view>
					<view class="list-item">
						<image class="icon" src="/static/images/club/img3.png" mode=""></image>
						<view class="label">无限观影</view>
						<view class="desc">影视无限观看</view>
					</view>
					<view class="list-item">
						<image class="icon" src="/static/images/club/img4.png" mode=""></image>
						<view class="label">无限悦读</view>
						<view class="desc">小说无限悦读</view>
					</view>
					<view class="list-item">
						<image class="icon" src="/static/images/club/img5.png" mode=""></image>
						<view class="label">吃瓜悦读</view>
						<view class="desc">吃瓜无限悦读</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {apiGetUserInfo} from '@/common/api/user.js'
	import NavBar from '@/components/NavBar/index.vue'
	export default {
		components: {
			NavBar
		},
		data(){
			return {
				userInfo: {
					vip_status: {
						is_vip: false
					}
				}
			}
		},
		created() {
			this.getUserInfo();
		},
		methods: {
			async getUserInfo(){
				const {code,msg,data} = await apiGetUserInfo();
				this.userInfo = data
			},
		}
	}
</script>

<style lang="scss" scoped>
	.club {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		background-image: url("/static/images/app/bg.png");
		background-repeat: no-repeat;
		background-size: 100%;

		.club-main {
			width: 100%;
			height: 100%;
			background: url("/static/images/app/bg1.png") no-repeat;
			background-size: 100%;
			display: flex;
			flex-direction: column;

			.banner {
				width: 100%;
				height: 460rpx;
				padding: 24rpx 32rpx 36rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.userinfo {
					display: flex;
					align-items: center;
					gap: 16rpx;

					.avatar {
						width: 44rpx;
						height: 44rpx;
						border-radius: 50%;
						background-color: #FFEFB8;
						padding: 2rpx;
						box-sizing: border-box;

						image {
							width: 100%;
							height: 100%;
						}
					}

					text {
						color: #E5CA8A;
						font-size: 24rpx;
						font-weight: 400;
					}
				}

				.vip-box {
					position: relative;
					width: 100%;
					height: 400rpx;
					border-radius: 20rpx;
					background: url("/static/images/mine/Frame 427318765.png") no-repeat;
					background-size: 100% 100%;

					.flag {
						position: absolute;
						top: 0;
						left: 0;
						border-radius: 20rpx 4rpx 20rpx 2rpx;
						background: #56397C;
						padding: 2rpx 12rpx;
						box-sizing: border-box;
						color: #FFEFB8;
						font-size: 20rpx;
						font-weight: 400;
						line-height: 32rpx;
					}

					.status {
						position: absolute;
						left: 22rpx;
						bottom: 42rpx;
						color: #B39DD9;
						font-size: 24rpx;
						font-weight: 400;
						line-height: 24rpx;
						letter-spacing: 2rpx;
					}

					.button {
						position: absolute;
						right: 44rpx;
						bottom: 30rpx;
						width: 160rpx;
						height: 56rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 40rpx;
						background: linear-gradient(90deg, #E4E2FC 0%, #F4F2FF 44.15%, #E0D8FB 100%);
						color: #341660;
						font-size: 28rpx;
						font-weight: 500;
					}
				}
			}

			.container {
				min-height: 0;
				flex: 1;

				.title-box {
					width: 100%;
					height: 80rpx;
					display: flex;
					align-items: center;

					.line {
						width: 4rpx;
						height: 32rpx;
						border-radius: 2rpx;
						background: linear-gradient(89deg, #E0CDA3 0.89%, #D9BE83 99.06%);
					}

					.title {
						color: #fff;
						font-size: 32rpx;
						font-weight: 500;
						line-height: 32rpx;
						margin: 0 16rpx 0 28rpx;
					}

					.more {
						width: fit-content;
						height: 32rpx;
						padding: 0 8rpx;
						box-sizing: border-box;
						border-radius: 8rpx;
						background: #362846;
						display: flex;
						align-items: center;
						gap: 4rpx;

						image {
							width: 20rpx;
							height: 20rpx;
						}

						text {
							color: #AEA8B1;
							font-size: 20rpx;
							font-weight: 400;
							line-height: 32rpx;
						}
					}
				}

				.list {
					width: 100%;
					padding: 32rpx;
					box-sizing: border-box;
					display: grid;
					grid-template-columns: repeat(3, 1fr);
					gap: 36rpx 52rpx;
					margin-bottom: 20rpx;

					.list-item {
						display: flex;
						flex-direction: column;
						align-items: center;
						gap: 8rpx;

						.icon {
							width: 88rpx;
							height: 88rpx;
						}

						.label {
							color: #FFF;
							font-size: 28rpx;
							font-weight: 400;
							line-height: 32rpx;
						}

						.desc {
							color: #CCC;
							text-align: center;
							font-size: 24rpx;
							font-weight: 400;
							line-height: 32rpx;
						}
					}
				}
			}
		}
	}
</style>