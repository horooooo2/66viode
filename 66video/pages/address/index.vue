<template>
	<view class="address">
		<NavBar title="选择收货地址"></NavBar>
		<view class="address-container">
			<view class="address-label">我的收货地址</view>
			<view class="address-add" @click="toLink('/pages/address/add')">未找到任何地址</view>
			<view class="address-list">
				<view class="address-card" v-for="i in 2" :key="i">
					<image class="icon-address" src="/static/images/points/icon-address.png" mode=""></image>
					<view class="address-content">
						<view class="userinfo">
							<view class="username">zack</view>
							<view class="phone">+86 123456789</view>
						</view>
						<view class="dizhi">湖北省武汉市经济开发区开发路890号蜂场快递柜</view>
					</view>
					<view class="address-check">
						<image v-if="isCheck" class="icon-check" src="/static/images/setting/icon_checkbox.svg" mode="">
						</image>
						<image v-else class="icon-check" src="/static/images/setting/icon_checkbox_active.svg" mode="">
						</image>
					</view>
				</view>
			</view>
		</view>
		<view class="button">新增</view>
	</view>
</template>

<script>
	import NavBar from '@/components/NavBar/index.vue'
	export default {
		components: {
			NavBar
		},
		data() {
			return {
				isCheck: true
			}
		},
		methods: {
			toLink(url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.address {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		display: flex;
		flex-direction: column;

		.address-container {
			width: 100%;
			min-height: 0;
			flex: 1;
			padding: 32rpx 32rpx 140rpx;
			box-sizing: border-box;

			.address-label {
				color: #999;
				font-size: 28rpx;
				font-weight: 400;
				line-height: 28rpx;
				margin-bottom: 24rpx;
			}

			.address-add {
				border-radius: 16rpx;
				border: 2rpx dashed #FF1A8C;
				background: #101010;
				width: 100%;
				height: 160rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #ccc;
				font-size: 28rpx;
				font-weight: 500;
				line-height: 48rpx;
				margin-bottom: 26rpx;
			}

			.address-list {
				.address-card {
					width: 100%;
					padding: 20rpx 32rpx;
					box-sizing: border-box;
					border-radius: 16rpx;
					background: #202020;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 40rpx;

					.icon-address {
						width: 76rpx;
						height: 76rpx;
						flex-shrink: 0;
						margin-right: 24rpx;
					}

					.address-content {
						min-width: 0;
						flex: 1;

						.userinfo {
							display: flex;
							align-items: center;
							gap: 20rpx;
							color: #ccc;
							line-height: 28rpx;
							margin-bottom: 16rpx;

							.username {
								font-size: 34rpx;
								font-weight: 500;
							}

							.phone {
								font-size: 26rpx;
								font-weight: 400;
							}
						}

						.dizhi {
							color: #aaa;
							font-size: 26rpx;
							font-weight: 400;
							line-height: 40rpx;
						}
					}

					.address-check {
						width: 40rpx;
						height: 40rpx;
						margin-left: 46rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
		
		.button {
			position: fixed;
			bottom: 20rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 686rpx;
			height: 88rpx;
			border-radius: 20rpx;
			background: linear-gradient(270deg, #D018F5 0%, #FA3296 100%);
			color: #fff;
			text-align: center;
			font-size: 34rpx;
			font-weight: 400;
			line-height: 88rpx;
		}
	}
</style>