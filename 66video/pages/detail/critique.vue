<template>
	<view class="critique">
		<view class="critique_t">
			评论 <text>999</text>
		</view>
		<view class="critique_cont">
			<view class="c_item">
				<view class="c_name">ss名字</view>
				<view class="c_cont">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</view>
				<view class="c_time">2025年5月10日 12:55 评论</view>
			</view>
			<view class="c_item">
				<view class="c_name">ss名字</view>
				<view class="c_cont">内容内容内容</view>
				<view class="c_time">2025年5月10日 12:55 评论</view>
			</view>
			<view class="c_item">
				<view class="c_name">ss名字</view>
				<view class="c_cont">内容内容内容</view>
				<view class="c_time">2025年5月10日 12:55 评论</view>
			</view>
		</view>
		<view>
			<input class="uni-input" @input="onKeyInput" placeholder="输入同步到view中" />
		</view>
	
	</view>
</template>

<script>
</script>

<style lang="scss"scoped>
	.critique{
		margin-top: 20rpx;
		padding: 20rpx;
		background: #191919;
		color: #fff;
		border-top-left-radius: 12rpx;
		border-top-right-radius: 12rpx;
		.critique_t{
			font-size: 24rpx;
			margin-bottom: 10rpx;
		}
		.critique_cont{
			max-height: 600rpx;
			overflow: auto;
		}
		.c_item{
			padding: 20rpx 0;
			border-bottom: 1px solid #202020;
			.c_name{
				font-size: 23rpx;
				color: #FF1A8C;
			}
			.c_cont{
				margin-top: 10rpx;
				font-size: 24rpx;
			}
			.c_time{
				margin-top: 20rpx;
				font-size: 18rpx;
				color: #888888;
			}
		}
	}
	
</style>