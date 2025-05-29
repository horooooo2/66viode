<template>
	<view class="sponsor">
		<view class="sponsor_t">
			赞助
		</view>
		<view class="sponsor_item">
			<view class="s_i">
				<image class="s_img" mode="heightFix" src="/static/images/detail/wx.png"></image>
				<view class="s_i_txt">微信</view>
			</view>
			<view class="s_i">
				<image class="s_img" mode="heightFix" src="/static/images/detail/wx.png"></image>
				<view class="s_i_txt">微信</view>
			</view>
			<view class="s_i">
				<image class="s_img" mode="heightFix" src="/static/images/detail/wx.png"></image>
				<view class="s_i_txt">微信</view>
			</view>
			<view class="s_i">
				<image class="s_img" mode="heightFix" src="/static/images/detail/wx.png"></image>
				<view class="s_i_txt">微信</view>
			</view>
			<view class="s_i">
				<image class="s_img" mode="heightFix" src="/static/images/detail/wx.png"></image>
				<view class="s_i_txt">微信</view>
			</view>
			
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss"scoped>
	.sponsor{
		margin-top: 20rpx;
		color: #fff;
		.sponsor_t{
			font-size: 24rpx;
		}
		.sponsor_item{
			margin-top: 30rpx;
			padding: 10rpx 10rpx 10rpx 10rpx;
			background: #191919;
			border-radius: 12rpx;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.s_i{
				width: 120rpx;
				padding: 10rpx 2rpx;
				display: flex;
				flex-flow: column;
				justify-content: center;
				align-items: center;
			}
			.s_img{
				width: 70rpx;
				height: 70rpx;
			}
			.s_i_txt{
				font-size: 22rpx;
				margin-top: 8rpx;
				text-align: center;
			}
		}
	}
	
</style>