<template>
	<view class="history">
		<view class="status_bar"></view>
		<NavBar title="历史"></NavBar>
		<view class="history-container">
			<view class="list">
				<view class="list-item" v-for="i in 2" :key="i">
					<view class="panel">
						<view class="left">iPhone 16 Pro Max</view>
						<view class="right price">支出 价格3000</view>
					</view>
					<view class="panel">
						<view class="left">订单号</view>
						<view class="right">120399120381023</view>
					</view>
					<view class="panel">
						<view class="left">备注</view>
						<view class="right">积分商城兑换</view>
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
			toLink(url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.history {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		display: flex;
		flex-direction: column;

		&-container {
			width: 100%;
			padding: 16rpx 32rpx;
			box-sizing: border-box;

			.list {
				display: flex;
				flex-direction: column;
				gap: 16rpx;

				.list-item {
					width: 100%;
					border-radius: 20rpx;
					background-color: #333;
					padding: 20rpx 30rpx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					gap: 12rpx;

					.panel {
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-size: 24rpx;

						.left {
							color: #bfbfbf;
						}

						.right {
							color: #fff;
						}

						.price {
							color: #FF1A8C;
						}
					}
				}
			}
		}
	}
</style>