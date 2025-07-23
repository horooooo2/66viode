<template>
	<view class="surplus">
		<text>999.27</text>
		<image class="icon-add" src="/static/images/icon-add.png" mode=""></image>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.surplus {
		width: 208rpx;
		padding: 16rpx 18rpx;
		display: flex;
		align-items: center;
		gap: 46rpx;
		border-radius: 32rpx;
		border: 2rpx solid #DE21D4;
		background: #1C1C1C;
		box-sizing: border-box;

		.icon-add {
			width: 28rpx;
			height: 28rpx;
		}

		text {
			font-size: 26rpx;
			color: #fff;
			font-weight: 700;
		}
	}
</style>