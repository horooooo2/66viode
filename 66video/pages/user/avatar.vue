<template>
	<view class="avatar">
		<view class="navbar">
			<view class="cancel" @click="onBack">取消</view>
			<view class="title">头像</view>
			<view class="submit">完成</view>
		</view>
		<view class="avatar-container">
			<image class="img" src="/static/images/avatar/img1.png" mode="widthFix"></image>
			<image class="img" src="/static/images/avatar/img2.png" mode="widthFix"></image>
			<image class="img" src="/static/images/avatar/img3.png" mode="widthFix"></image>
			<image class="img" src="/static/images/avatar/img4.png" mode="widthFix"></image>
			<image class="img" src="/static/images/avatar/img5.png" mode="widthFix"></image>
			<image class="img" src="/static/images/avatar/img6.png" mode="widthFix"></image>
			<image class="img" src="/static/images/avatar/img7.png" mode="widthFix"></image>
			<image class="img" src="/static/images/avatar/img8.png" mode="widthFix"></image>
			<image class="img" src="/static/images/avatar/img9.png" mode="widthFix"></image>
			<image class="img" src="/static/images/avatar/img10.png" mode="widthFix"></image>
			<image class="img" src="/static/images/avatar/img11.png" mode="widthFix"></image>
			<image class="img" src="/static/images/avatar/img12.png" mode="widthFix"></image>
			<image class="img" src="/static/images/avatar/img13.png" mode="widthFix"></image>
			<image class="img" src="/static/images/avatar/img14.png" mode="widthFix"></image>
			<image class="img" src="/static/images/avatar/img15.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			onBack() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.avatar {
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
			padding: 56rpx 68rpx;
			box-sizing: border-box;
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 60rpx 40rpx;
			.img {
				width: 124rpx;
			}
		}
	}
</style>