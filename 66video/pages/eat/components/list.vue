<template>
	<view class="list">
		<view class="list-item" v-for="(item, index) in list" :id="'list'+item.id" :key="index" @click="toLink('/pages/detail/article', item.id)">
			<image class="flag" src="/static/images/index/hot-icon.png" mode=""></image>
			<image class="poster" :src="item.mobile_image" mode=""></image>
			<view class="mask">{{ item.title }}</view>
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
	.list {
		display: flex;
		flex-direction: column;
		gap: 28rpx;
		padding: 0 32rpx 28rpx;
		box-sizing: border-box;

		.list-item {
			position: relative;
			width: 100%;
			height: 260rpx;
			border-radius: 20rpx;

			.flag {
				position: absolute;
				top: 0;
				left: 20rpx;
				width: 48rpx;
				height: 48rpx;
				z-index: 1;
			}

			.poster {
				width: 100%;
				height: 100%;
			}

			.mask {
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0.4);
				position: absolute;
				top: 0;
				left: 0;
				padding: 40rpx 76rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				color: #fff;
				font-weight: 600;
				line-height: 40rpx;
			}
		}
	}
</style>