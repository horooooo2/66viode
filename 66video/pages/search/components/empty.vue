<template>
	<view class="empty">
		<image class="empty_img" mode="widthFix" src="/static/images/search/empty.png"></image>
		<view class="empty_txt">未找到相关内容</view>
	</view>
	
</template>

<script setup>
	
	
</script>

<style lang="scss" scoped>
	.empty{
		width: 100%;
		height: 100%;
		display: flex;
		flex-flow: column;
		align-items: center;
		.empty_img{
			width: 200rpx;
		}
		.empty_txt{
			margin-top: 40rpx;
			font-size: 24rpx;
			color: #fff;
		}
	}
	
</style>