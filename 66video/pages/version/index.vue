<template>
	<view class="version">
		<view class="status_bar"></view>
		<NavBar title="关于"></NavBar>
		<view class="container">
			<view class="logo"></view>
			<view class="title">吃瓜</view>
			<view class="num">版本号 1.4.8</view>
			<view class="news-version">
				<view class="label">版本更新</view>
				<view class="right-panel">
					<text>发现新版本</text>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M5 1.3335L4 2.35914L9.75 8.00016L4 13.6412L5 14.6668L12 8.00016L5 1.3335Z" fill="#999999" />
					</svg>
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
	.version {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		display: flex;
		flex-direction: column;

		.container {
			min-height: 0;
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 128rpx 40rpx 0;
			box-sizing: border-box;

			.logo {
				width: 128rpx;
				height: 128rpx;
				border-radius: 28rpx;
				background: linear-gradient(270deg, #D018F5 0%, #FA3296 100%);
				margin-bottom: 64rpx;
			}

			.title {
				color: #ddd;
				font-size: 40rpx;
				font-weight: 400;
				margin-bottom: 16rpx;
			}

			.num {
				color: #999;
				font-size: 30rpx;
				font-weight: 400;
				margin-bottom: 64rpx;
			}

			.news-version {
				width: 100%;
				height: 104rpx;
				border-radius: 12rpx;
				background-color: #202020;
				padding: 0 24rpx 0 32rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.label {
					color: #ddd;
					font-size: 32rpx;
					font-weight: 400;
				}

				.right-panel {
					display: flex;
					align-items: center;

					text {
						color: #FF1A8C;
						font-size: 24rpx;
						font-weight: 400;
						margin-top: -2rpx;
					}
				}
			}
		}
	}
</style>