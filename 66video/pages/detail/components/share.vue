<template>
	<view class="share">
		<view class="share_t">
			<uni-icons type="redo" size="18" color="#BBBBBB"></uni-icons>
			<text space='ensp'> 分享到...</text>
		</view>
		<view class="share_item">
			<view class="s_i">
				<view class="s_i_wrap">
					<image class="s_img" mode="heightFix" src="/static/images/detail/qq.png"></image>
				</view>
				<view class="s_i_txt">QQ</view>
			</view>
			<view class="s_i">
				<view class="s_i_wrap">
					<image class="s_img" mode="heightFix" src="/static/images/detail/qq.png"></image>
				</view>
				<view class="s_i_txt">QQ</view>
			</view>
			<view class="s_i">
				<view class="s_i_wrap">
					<image class="s_img" mode="heightFix" src="/static/images/detail/qq.png"></image>
				</view>
				<view class="s_i_txt">QQ</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss"scoped>
	.share{
		margin-top: 30rpx;
		padding: 20rpx;
		background: #191919;
		color: #ddd;
		border-radius: 12rpx;
		.share_t{
			display: flex;
			align-items: center;
			font-size: 24rpx;
		}
		.share_item{
			margin-top: 30rpx;
			display: flex;
			.s_i{
				width: 100rpx;
				padding: 0 6rpx;
				display: flex;
				flex-flow: column;
				justify-content: center;
				align-items: center;
			}
			.s_i_wrap{
				border-radius: 50%;
				width: 70rpx;
				height: 70rpx;
				background: #262626;
				display: flex;
				justify-content: center;
				align-items: center;
				.s_img{
					height: 40rpx;
				}
			}
			.s_i_txt{
				font-size: 22rpx;
				margin-top: 8rpx;
				text-align: center;
			}
		}
	}
	
</style>