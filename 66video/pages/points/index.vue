<template>
	<view class="points">
		<view class="status_bar"></view>
		<view class="header">
			<image class="logo" src="/static/images/points/CHIGUALOGO.png" mode="widthFix"></image>
			<view class="right">
				<Surplus></Surplus>
				<view class="avatar"></view>
			</view>
		</view>
		<view class="points-container">
			<view class="point-menus">
				<view class="menus-box">
					<view class="menu-item">
						<image class="icon" src="/static/images/points/icon_cz.png" mode=""></image>
						<text>创作</text>
					</view>
					<view class="menu-item">
						<image class="icon" src="/static/images/points/icon_yqhy.png" mode=""></image>
						<text>邀请好友</text>
					</view>
					<view class="menu-item" @click="toLink('/pages/address/index')">
						<image class="icon" src="/static/images/points/icon_shdz.png" mode=""></image>
						<text>收货地址</text>
					</view>
					<view class="menu-item" @click="toLink('/pages/order/index')">
						<image class="icon" src="/static/images/points/icon_ddjl.png" mode=""></image>
						<text>订单记录</text>
					</view>
				</view>
			</view>
			<view class="point-list">
				<view class="point-title">福利兑换</view>
				<view class="list-box">
					<view class="card" v-for="i in 5" :key="i">
						<image class="cover" src="/static/images/points/img.png" mode=""></image>
						<view class="title">Bulgari DIVAS’ DREAM 18K 玫瑰金耳</view>
						<view class="kucun">库存：12</view>
						<view class="button" @click="toLink('/pages/points/detail')">
							<image class="icon-jf" src="/static/images/points/icon_jf.png" mode=""></image>
							<text>888000</text>
							<view>兑换</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Surplus from "@/components/Surplus/index.vue"
	export default {
		components: {
			Surplus,
		},
		methods: {
			toLink(url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.points {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		background-image: url("/static/images/index/bg.png");
		background-position: top center;
		background-repeat: no-repeat;
		background-size: cover;
		display: flex;
		flex-direction: column;

		.header {
			width: 100%;
			height: 100rpx;
			padding: 0 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.logo {
				width: 244rpx;
				height: 28rpx;
			}

			.right {
				display: flex;
				gap: 20rpx;

				.avatar {
					width: 64rpx;
					height: 64rpx;
					border-radius: 50%;
					background: linear-gradient(0deg, #D018F5 0%, #FA3296 100%);
				}
			}
		}

		.points-container {
			min-height: 0;
			flex: 1;
			width: 100%;
			padding: 24rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;

			.point-menus {
				width: 100%;
				padding: 28rpx 24rpx;
				box-sizing: border-box;
				border-radius: 20rpx;
				background: #202020;
				margin-bottom: 20rpx;

				.menus-box {
					width: 100%;
					display: grid;
					grid-template-columns: repeat(4, 1fr);
					gap: 68rpx;
					border-radius: 20rpx;
					background: #333;
					padding: 26rpx 18rpx;
					box-sizing: border-box;

					.menu-item {
						width: 104rpx;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						gap: 16rpx;

						.icon {
							width: 64rpx;
							height: 64rpx;
						}

						text {
							color: #fff;
							font-size: 26rpx;
						}
					}
				}
			}

			.point-list {
				min-height: 0;
				flex: 1;
				width: 100%;
				display: flex;
				flex-direction: column;
				padding: 0 20rpx 30rpx;
				box-sizing: border-box;
				gap: 8rpx;
				border-radius: 20rpx;
				background: #202020;

				.point-title {
					padding: 22rpx 0;
					box-sizing: border-box;
					color: #ddd;
					font-size: 32rpx;
					font-weight: 500;
					line-height: 36rpx;
					text-align: center;
				}
				
				.list-box {
					display: grid;
					grid-template-columns: repeat(2, 1fr);
					gap: 16rpx 14rpx;
					.card {
						padding: 0 16rpx 16rpx;
						box-sizing: border-box;
						background-color: #333;
						border-radius: 20rpx;
						display: flex;
						flex-direction: column;
						align-items: center;
						
						.cover {
							width: 224rpx;
							height: 224rpx;
							border-radius: 20rpx;
							margin-bottom: 16rpx;
						}
						
						.title {
							color: #ddd;
							text-align: center;
							font-size: 28rpx;
							font-weight: 400;
							line-height: 40rpx;
							margin-bottom: 24rpx;
						}
						
						.kucun {
							color: #FFF;
							text-align: center;
							font-size: 24rpx;
							font-weight: 400;
							line-height: 36rpx;
							margin-bottom: 8rpx;
						}
						
						.button {
							width: 100%;
							height: 56rpx;
							border-radius: 100rpx;
							background: linear-gradient(270deg, #D018F5 0%, #FA3296 100%);
							display: flex;
							align-items: center;
							justify-content: center;
							gap: 4rpx;
							color: #fff;
							font-size: 28rpx;
							font-weight: 400;
							line-height: 32rpx;
							.icon-jf {
								width: 32rpx;
								height: 32rpx;
							}
							text {
								font-size: 32rpx;
								font-weight: 500;
							}
						}
					}
				}
			}
		}
	}
</style>