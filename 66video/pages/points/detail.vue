<template>
	<view class="point-detail">
		<NavBar :isTitle="false" fallbackUrl='/pages/points/index'></NavBar>
		<view class="detail-container">
			<view class="cover">
				<image :src="dataItem.cover_image" mode=""></image>
			</view>
			<view class="jifen">
				<image class="icon" src="/static/images/points/icon_jf.png" mode=""></image>
				<text>{{ dataItem.price }}</text>
			</view>
			<view class="title">{{ dataItem.name }}</view>
			<view class="kucun">库存：{{ dataItem.stock }}</view>
			<view class="desc-box" v-html="dataItem.description"></view>
			<view class="button" @click="toLink('/pages/points/order')">申请兑换</view>
		</view>
	</view>
</template>

<script>
	import NavBar from '@/components/NavBar/index.vue'
	import {
		apiGoodsDetails,
	} from '@/common/api/goods.js'
	export default {
		components: {
			NavBar
		},
		data() {
			return {
				dataItem: {},
			}
		},
		onLoad(options) {
			this.getData(options.id)
		},
		methods: {
			async getData(id) {
				const {
					code,
					msg,
					data
				} = await apiGoodsDetails({
					id
				})
				if (code === 0) {
					this.dataItem = data
				} else {
					uni.showToast({
						title: msg,
						icon: 'none',
						duration: 2000
					});
				}
			},
			toLink(url) {
				uni.setStorageSync('orderData', this.dataItem);
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.point-detail {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		background-image: url("/static/images/index/bg.png");
		background-position: top center;
		background-repeat: no-repeat;
		background-size: cover;
		display: flex;
		flex-direction: column;

		.detail-container {
			min-height: 0;
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			padding: 16rpx 32rpx;
			box-sizing: border-box;

			.cover {
				width: 266rpx;
				height: 266rpx;
				border-radius: 20rpx;
				background: rgba(255, 255, 255, 0.10);
				margin-bottom: 32rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.jifen {
				display: flex;
				align-items: center;
				color: #FEA71F;
				font-size: 40rpx;
				font-weight: 700;
				line-height: 40rpx;
				gap: 8rpx;

				.icon {
					width: 40rpx;
					height: 40rpx;
				}
			}

			.title {
				width: 80%;
				color: #ddd;
				text-align: center;
				font-size: 40rpx;
				font-weight: 500;
				line-height: 48rpx;
				margin: 16rpx 0;
			}

			.kucun {
				color: #777;
				font-size: 26rpx;
				font-weight: 400;
				line-height: 32rpx;
			}

			.desc-box {
				width: 100%;
				margin-top: 44rpx;
				display: flex;
				color: #fff;
				flex-direction: column;
				gap: 40rpx;

				.desc-item {
					width: 100%;
					display: flex;
					flex-direction: column;
					gap: 16rpx;

					.desc-title {
						color: #ccc;
						font-size: 30rpx;
						font-weight: 500;
						line-height: 40rpx;
					}

					p {
						color: #aaa;
						text-align: justify;
						font-size: 26rpx;
						font-weight: 400;
						line-height: 32rpx;
					}
				}
			}

			.button {
				position: fixed;
				left: 16px;
				right: 16px;
				bottom: 22px;
				// width: 100%;
				height: 88rpx;
				border-radius: 20rpx;
				background: linear-gradient(270deg, #D018F5 0%, #FA3296 100%);
				color: #fff;
				text-align: center;
				font-size: 34rpx;
				font-weight: 400;
				line-height: 88rpx;
			}
		}


	}
</style>