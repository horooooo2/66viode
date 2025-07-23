<template>
	<tui-drawer class="sponsor" mode="left" :visible="visible" @close="close" zIndex="1000" maskZIndex="999"
		backgroundColor="#333">
		<view class="header">
			<image class="back" src="/static/images/sidebar/icon_Back.png" mode="" @click="close"></image>
			<text>赞助</text>
		</view>
		<view class="d-container">
			<view class="card" v-for="i in 8" :key="i">
				<image class="icon" src="/static/images/sidebar/image 3.png" mode=""></image>
				<text>微信</text>
			</view>
		</view>
	</tui-drawer>
</template>

<script>
	export default {
		data() {
			return {
				visible: false
			}
		},
		methods: {
			open() {
				this.visible = true
			},
			close() {
				this.visible = false
			},
		}
	}
</script>

<style lang="scss" scoped>
	.sponsor {
		::v-deep() {
			.tui-drawer-container {
				width: 620rpx;
				border-radius: 0 80rpx 80rpx 0;
				padding: 68rpx 30rpx;
				box-sizing: border-box;
			}
		}

		.header {
			width: 100%;
			display: flex;
			align-items: center;
			height: 60rpx;
			margin-bottom: 36rpx;

			.back {
				width: 48rpx;
				height: 48rpx;
			}

			text {
				font-size: 36rpx;
				color: #ccc;
				font-weight: 500;
			}
		}

		.d-container {
			width: 100%;
			border-radius: 20rpx;
			background: #202020;
			padding: 24rpx 20rpx;
			box-sizing: border-box;
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 36rpx 40rpx;

			.card {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 12rpx;

				.icon {
					width: 96rpx;
					height: 96rpx;
				}

				text {
					color: #fff;
					font-size: 24rpx;
					font-weight: 400;
				}
			}
		}
	}
</style>