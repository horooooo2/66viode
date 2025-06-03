<template>
	<view class="share">
		<view class="share_t">
			<!-- <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M12.7087 6.977V11.3115H8.75968C5.99444 11.3115 3.6754 13.4029 3.18063 16.1439C3.11689 15.728 3.0835 15.3 3.0835 14.866C3.0835 12.6471 3.95465 10.6286 5.357 9.16552C6.75935 7.70246 8.6929 6.79488 10.8207 6.79488H11.0757C11.6342 6.79488 12.1806 6.85559 12.7087 6.977Z" fill="#DDDDDD"/>
			<path d="M16.9158 9.10481L12.1502 13.8704C11.9681 14.0525 11.6524 13.925 11.6524 13.664V4.13588C11.6524 3.87787 11.965 3.74734 12.1502 3.92947L16.9158 8.69503C17.0281 8.80734 17.0281 8.98946 16.9158 9.10481Z" fill="#DDDDDD"/>
			</svg> -->
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