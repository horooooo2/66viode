<template>
	<view class="order-container">
		<view class="order-card" v-for="(item,index) in list" :id="'list'+item.id" :key="index">
			<view class="cover">
				<image :src="item.goods_info.cover_image" mode=""></image>
			</view>
			<view class="right-panel">
				<view class="goods-title">{{ item.goods_info.name }}</view>
				<view class="goods-box">
					<view class="goods-num">数量 {{ item.count }}</view>
					<view class="goods-status" :class="[ item.status == 1 || item.status == 4 ? '' : item.status == 2 ? 'lan' : 'fen' ]">
						{{ item.status == 1 ? '等待发货' : item.status == 2 ? '待收货' : item.status == 3 ? '确认收货' : '信息错误' }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			}
		},
		methods: {
			toLink(url, id) {
				uni.navigateTo({
					url: `${url}?id=${id}`
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
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
</style>