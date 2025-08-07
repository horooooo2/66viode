<template>
	<view class="list-box">
		<view class="card" v-for="(item, index) in list" :id="'list'+item.id" :key="index">
			<image class="cover" :src="item.cover_image" mode=""></image>
			<view class="title">{{ item.name }}</view>
			<view class="kucun">库存：{{ item.stock }}</view>
			<view class="button" @click="toLink('/pages/points/detail', item.id)">
				<image class="icon-jf" src="/static/images/points/icon_jf.png" mode=""></image>
				<text>{{ item.price }}</text>
				<view>兑换</view>
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
				uni.navigateTo({ url: `${url}?id=${id}` })
			}
		},
	}
</script>

<style lang="scss" scoped>
	.list-box {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 16rpx 14rpx;
		.card {
			padding: 0 16rpx 16rpx;
			box-sizing: border-box;
			background-color: #333;
			border-radius: 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			.cover {
				width: 224rpx;
				height: 224rpx;
				border-radius: 20rpx;
				margin-bottom: 16rpx;
			}
			
			.title {
				color: #ddd;
				text-align: center;
				font-size: 28rpx;
				font-weight: 400;
				line-height: 40rpx;
				margin-bottom: 24rpx;
			}
			
			.kucun {
				color: #FFF;
				text-align: center;
				font-size: 24rpx;
				font-weight: 400;
				line-height: 36rpx;
				margin-bottom: 8rpx;
			}
			
			.button {
				width: 100%;
				height: 56rpx;
				border-radius: 100rpx;
				background: linear-gradient(270deg, #D018F5 0%, #FA3296 100%);
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 4rpx;
				color: #fff;
				font-size: 28rpx;
				font-weight: 400;
				line-height: 32rpx;
				.icon-jf {
					width: 32rpx;
					height: 32rpx;
				}
				text {
					font-size: 32rpx;
					font-weight: 500;
				}
			}
		}
	}
</style>