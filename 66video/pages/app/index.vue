<template>
	<view class="app">
		<view class="app-main">
			<NavBar title="APP下载"></NavBar>
			<view class="container">
				<image class="cover" src="/static/images/app/img.png" mode="widthFix"></image>
				<view class="list">
					<view class="title">应用下载</view>
					<view class="list-item">
						<view class="label">IOS标准版</view>
						<view class="button">立即下载</view>
					</view>
					<view class="list-item">
						<view class="label">IOS极速版</view>
						<view class="button">立即下载</view>
					</view>
					<view class="list-item">
						<view class="label">安卓标准版</view>
						<view class="button">立即下载</view>
					</view>
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

		}
	}
</script>

<style lang="scss" scoped>
	.app {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		background-image: url("/static/images/app/bg.png");
		background-repeat: no-repeat;
		background-size: 100%;

		.app-main {
			width: 100%;
			height: 100%;
			background: url("/static/images/app/bg1.png") no-repeat;
			background-size: 100%;
			display: flex;
			flex-direction: column;

			.container {
				min-height: 0;
				flex: 1;

				.cover {
					width: 602rpx;
					margin: 0 auto;
					display: block;
				}

				.list {
					width: 100%;
					padding: 52rpx 28rpx;
					box-sizing: border-box;
					border-radius: 40rpx;
					background: rgba(255, 255, 255, 0.05);
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 32rpx;

					.title {
						color: #ddd;
						font-size: 32rpx;
						font-weight: 500;
						line-height: 32rpx;
					}

					.list-item {
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 20rpx 18rpx 20rpx 32rpx;
						box-sizing: border-box;
						height: 96rpx;
						border-radius: 100rpx;
						background: rgba(255, 255, 255, 0.05);

						.label {
							color: #FF1A8C;
							font-size: 32rpx;
							line-height: 48rpx;
							font-weight: 500;
						}

						.button {
							flex-shrink: 0;
							padding: 12rpx 32rpx;
							box-sizing: border-box;
							border-radius: 80rpx;
							background: linear-gradient(289deg, #BA16DB 12.94%, #E05A9D 87.06%);
							color: #fff;
							font-size: 26rpx;
							font-weight: 400;
						}
					}
				}
			}
		}
	}
</style>