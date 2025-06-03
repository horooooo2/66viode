<template>
	<view class="recommend_title">
		猜你喜欢
	</view>
	<view class="recommend">
		<view class="recommend_item">
			<image class="recommend_img" mode="aspectFill" src="/static/images/detail/img.png"></image>
			<view class="recommend_count">
				<uni-icons type="eye" size="12" color="#fff"></uni-icons>
				<text>999</text>
			</view>
			<view class="recommend_name">名字</view>
		</view>
		<view class="recommend_item">
			<image class="recommend_img" mode="aspectFill" src="/static/images/detail/img.png"></image>
			<view class="recommend_count">
				<uni-icons type="eye" size="12" color="#fff"></uni-icons>
				<text>999</text>
			</view>
			<view class="recommend_name">名字</view>
		</view>
		<view class="recommend_item">
			<image class="recommend_img" mode="aspectFill" src="/static/images/detail/img.png"></image>
			<view class="recommend_count">
				<uni-icons type="eye" size="12" color="#fff"></uni-icons>
				<text>999</text>
			</view>
			<view class="recommend_name">名字</view>
		</view>
	</view>

</template>

<script setup>

	
</script>

<style lang="scss" scoped>
	.recommend_title{
		margin-top: 40rpx;
		color: #fff;
		font-size: 24rpx;
	}
	.recommend{
		margin-top: 22rpx;
		display: flex;
		justify-content: space-around;
		.recommend_item{
			width: 31%;
			position: relative;
			
		}
		.recommend_img{
			width: 100%;
			height: 300rpx;
			border-radius: 18rpx;
		}
		.recommend_count{
			position: absolute;
			left: 10rpx;
			bottom: 50rpx;
			font-size: 20rpx;
		}
		.recommend_name{
			font-size: 22rpx;
			padding: 0rpx 4rpx;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
	}
</style>