<template>
	<view class="nickname">
		<view class="navbar">
			<view class="cancel" @click="onBack">取消</view>
			<view class="title">昵称</view>
			<view class="submit">完成</view>
		</view>
		<view class="nickname-container">
			<tui-input v-model="name" placeholder="请输入" clearable></tui-input>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: ''
			}
		},
		methods: {
			onBack() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nickname {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		.navbar {
			position: relative;
			width: 100%;
			height: 88rpx;
			padding: 20rpx 32rpx;
			box-sizing: border-box;
			.cancel {
				position: absolute;
				top: 50%;
				left: 32rpx;
				transform: translateY(-50%);
				color: #ccc;
				font-size: 32rpx;
			}
			.title {
				color: #ccc;
				font-size: 36rpx;
				font-weight: 500;
				line-height: 48rpx;
				text-align: center;
			}
			.submit {
				position: absolute;
				top: 50%;
				right: 32rpx;
				transform: translateY(-50%);
				width: 120rpx;
				height: 64rpx;
				background: linear-gradient(0deg, #D018F5 0%, #FA3296 100%);
				border-radius: 50rpx;
				font-size: 28rpx;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		&-container {
			width: 100%;
			padding: 16rpx 32rpx;
			box-sizing: border-box;
			:deep() {
				.tui-input__wrap {
					background-color: #333 !important;
					border-radius: 20rpx;
				}
				.uni-input-input {
					color: #ccc;
				}
			}
		}
	}
</style>