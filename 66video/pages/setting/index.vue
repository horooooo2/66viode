<template>
	<view class="setting">
		<NavBar title="设置"></NavBar>
		<view class="setting-container">
			<view class="card-list">
				<view class="card-item" @click="toLink('/pages/setting/phone')">
					<view class="label">换绑手机号</view>
					<image class="arrow" src="/static/images/setting/icon_arrow.png" mode="widthFix"></image>
				</view>
				<view class="card-item" @click="toLink('/pages/setting/email')">
					<view class="label">电子邮箱</view>
					<image class="arrow" src="/static/images/setting/icon_arrow.png" mode="widthFix"></image>
				</view>
				<view class="card-item" @click="toLink('/pages/setting/password')">
					<view class="label">登录密码</view>
					<image class="arrow" src="/static/images/setting/icon_arrow.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import NavBar from '@/components/NavBar/index.vue'
	export default {
		components: {
			NavBar
		},
		methods: {
			toLink(url) {
				uni.navigateTo({ url })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.setting {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		display: flex;
		flex-direction: column;

		&-container {
			width: 100%;
			padding: 16rpx 32rpx;
			box-sizing: border-box;

			.card-list {
				width: 100%;
				background-color: #202020;
				border-radius: 12rpx;
				padding: 0 24rpx 0 32rpx;
				box-sizing: border-box;

				.card-item {
					width: 100%;
					height: 104rpx;
					border-bottom: 1rpx solid #333;
					display: flex;
					align-items: center;
					justify-content: space-between;
					&:last-child {
						border-bottom: none;
					}
					.label {
						color: #ddd;
						font-size: 32rpx;
					}
					.arrow {
						width: 32rpx;
						height: 32rpx;
					}
				}
			}
		}
	}
</style>