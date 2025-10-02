<template>
	<view class="navbar">
		<image class="back" src="/static/images/setting/icon_Back.png" mode="widthFix" @click="onBack"></image>
		<view v-if="isTitle" class="title">{{ title }}</view>
		<view class="slot-right">
			<slot name="right"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			rightText: {
				type: String,
				default: ''
			},
			fallbackUrl: {
				type: String,
				default: '/pages/eat/index'
			},
			isTitle: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			onBack() {
				uni.navigateTo({
					url: this.fallbackUrl
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navbar {
		width: 100%;
		height: 88rpx;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;

		.back {
			position: absolute;
			top: 50%;
			left: 32rpx;
			transform: translateY(-50%);
			width: 48rpx;
			height: 48rpx;
		}

		.title {
			color: #ddd;
			font-size: 36rpx;
		}

		.slot-right {
			position: absolute;
			top: 50%;
			right: 32rpx;
			transform: translateY(-50%);
		}
	}
</style>