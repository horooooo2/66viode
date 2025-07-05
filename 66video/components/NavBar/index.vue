<template>
	<view class="navbar">
		<image class="back" src="/static/images/setting/icon_Back.png" mode="widthFix" @click="onBack"></image>
		<view v-if="isTitle" class="title">{{ title }}</view>
		<view v-if="isRight" class="slot-right" @click="$emit('right')">{{ rightText }}</view>
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
			isRight: {
				type: Boolean,
				default: false
			},
			isTitle: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			onBack() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navbar {
		width: 100%;
		height: 88rpx;
		position: relative;
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
			line-height: 88rpx;
			text-align: center;
		}
		.slot-right {
			position: absolute;
			top: 50%;
			right: 32rpx;
			transform: translateY(-50%);
			font-size: 28rpx;
			color: #ddd;
		}
	}
</style>