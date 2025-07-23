<template>
	<view class="media">
		<view class="media-main">
			<NavBar title="官方媒体"></NavBar>
			<view class="container">
				<view class="list">
					<view class="list-item" v-for="i in 3" :key="i">
						<view class="item-left">
							<view class="title">Telegram</view>
							<view>https：Telegram</view>
						</view>
						<view class="button">打开</view>
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
	.media {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		background-image: url("/static/images/app/bg.png");
		background-repeat: no-repeat;
		background-size: 100%;

		.media-main {
			width: 100%;
			height: 100%;
			background: url("/static/images/app/bg1.png") no-repeat;
			background-size: 100%;
			display: flex;
			flex-direction: column;

			.container {
				min-height: 0;
				flex: 1;
				padding: 32rpx;
				box-sizing: border-box;

				.list {
					width: 100%;
					padding: 52rpx 28rpx;
					box-sizing: border-box;
					border-radius: 40rpx;
					background: rgba(255, 255, 255, 0.05);
					display: flex;
					flex-direction: column;
					gap: 24rpx;

					.list-item {
						width: 100%;
						height: 108rpx;
						border-radius: 100rpx;
						background: rgba(255, 255, 255, 0.05);
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 16rpx 18rpx 16rpx 32rpx;
						box-sizing: border-box;

						.item-left {
							min-width: 0;
							flex: 1;
							display: flex;
							flex-direction: column;
							gap: 4rpx;
							color: #ccc;
							text-align: justify;
							font-size: 24rpx;
							font-weight: 400;

							.title {
								color: #FF1A8C;
								font-size: 32rpx;
								font-weight: 500;
							}
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