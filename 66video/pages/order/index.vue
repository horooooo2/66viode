<template>
	<view class="order">
		<NavBar title="订单记录"></NavBar>
		<view class="order-container">
			<view class="order-card" v-for="i in 3" :key="i">
				<view class="cover">
					<image src="/static/images/points/img.png" mode=""></image>
				</view>
				<view class="right-panel">
					<view class="goods-title">实物Bulgari DIVAS’ DREAM 18K</view>
					<view class="goods-box">
						<view class="goods-num">数量 1</view>
						<view class="goods-status" :class="[ i == 2 ? 'lan' : i == 3 ? 'fen' : '' ]">{{ i == 1 ? '等待发货' : i == 2 ? '待收货' : '确认收货' }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import NavBar from '@/components/NavBar/index.vue'
	export default {
		components: { NavBar }
	}
</script>

<style lang="scss" scoped>
	.order {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		
		.order-container {
			width: 100%;
			min-height: 0;
			flex: 1;
			padding: 16rpx 32rpx;
			box-sizing: border-box;
			
			.order-card {
				padding: 22rpx 24rpx;
				box-sizing: border-box;
				border-radius: 20rpx;
				background: #202020;
				display: flex;
				align-items: center;
				margin-bottom: 16rpx;
				
				.cover {
					width: 136rpx;
					height: 136rpx;
					border-radius: 10rpx;
					background: rgba(255, 255, 255, 0.10);
					margin-right: 20rpx;
					
					image {
						width: 100%;
						height: 100%;
					}
				}
				
				.right-panel {
					min-width: 0;
					flex: 1;
					height: 136rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					color: #ccc;
					.goods-title {
						font-size: 28rpx;
						font-weight: 500;
						line-height: 48rpx;
					}
					.goods-box {
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-size: 24rpx;
						font-weight: 400;
						line-height: 48rpx;
						
						.lan {
							color: #609DF0;
						}
						
						.fen {
							color: #FF1A8C;
						}
					}
				}
			}
		}
	}
</style>