<template>
	<view class="phone">
		<NavBar title="手机号"></NavBar>
		<view class="phone-container">
			<view class="label">手机号码</view>
			<input class="input" type="text" placeholder="请输入手机号" />
			<view class="button">提交</view>
		</view>
	</view>
</template>

<script>
	import NavBar from '@/components/NavBar/index.vue'
	export default {
		components: {
			NavBar
		}
	}
</script>

<style lang="scss" scoped>
	.phone {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		&-container {
			width: 100%;
			padding: 16rpx 32rpx;
			box-sizing: border-box;
			.label {
				color: #999;
				font-size: 28rpx;
				margin-bottom: 16rpx;
			}
			.input {
				width: 100%;
				height: 96rpx;
				background-color: #202020;
				border-radius: 20rpx;
				padding: 32rpx 16rpx 32rpx 24rpx;
				box-sizing: border-box;
				:deep() {
					.uni-input-placeholder {
						color: #555;
						font-size: 32rpx;
					}
					.uni-input-input {
						color: #ccc;
						font-size: 32rpx;
					}
				}
			}
			.button {
				width: 100%;
				height: 88rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 12rpx;
				background: linear-gradient(270deg, #D018F5 0%, #FA3296 100%);
				color: #fff;
				font-size: 34rpx;
				margin-top: 80rpx;
			}
		}
	}
</style>