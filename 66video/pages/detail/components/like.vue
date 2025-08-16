<template>
	<view class="like">
		<view class="like_item liek_item_actvie">
			<uni-icons type="heart" size="16" color="#BBBBBB"></uni-icons>
			<text>999喜欢</text>
		</view>
		<view class="like_item">
			<uni-icons type="eye" size="16" color="#BBBBBB"></uni-icons>
			<text>999阅读</text>
		</view>
		<view class="like_item">
			<uni-icons type="chat" size="16" color="#BBBBBB"></uni-icons>
			<text>999评论</text>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss"scoped>
	.like{
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 24rpx;
		.like_item{
			width: 32%;
			height: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 10rpx;
			background: #202020;
			color: #BBBBBB;
			.uni-icons{
				margin-right: 6rpx;
				height: 17px;
			}
			
		}
		// .liek_item_actvie{
		// 	color: #FF1A8C;
		// }
	}
	
</style>