<template>
	<view class="leftIcon">
		<uni-icons type="left" size="22" color="#fff" @click="goBack"></uni-icons>
		<view class="title">第一张顶顶顶顶</view>
		<uni-icons class="fx_icon" type="redo" size="22" color="#fff"></uni-icons>
	</view>
	<view class="content">
		
	</view>
</template>

<script setup>
	const goBack=()=>{
		uni.navigateBack();
	}
	
</script>

<style lang="scss" scoped>
	.leftIcon{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9;
		width: 100%;
		height: 80rpx;
		padding-left: 15rpx;
		display: flex;
		align-items: center;
		color: #fff;
		font-size: 24rpx;
		background: transparent;
		.title{
			margin-left: 20rpx;
			color: #fff;
		}
		.fx_icon{
			position: absolute;
			right: 20rpx;
		}
	}
	.content{
		padding: 120rpx 20rpx 20rpx 20rpx;
	    background: #111;
		color: #fff;
	}
</style>