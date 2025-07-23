<template>
	<tui-drawer class="language" mode="left" :visible="visible" @close="close" zIndex="1000" maskZIndex="999"
		backgroundColor="#333">
		<view class="header">
			<image class="back" src="/static/images/sidebar/icon_Back.png" mode="" @click="close"></image>
			<text>语言设置</text>
		</view>
		<view class="d-container">
			<view class="card" v-for="i in 4" :key="i">
				<text>中国大陆-简体中文</text>
				<view class="check">
					<image v-if="i == 2" class="icon" src="/static/images/setting/icon_checkbox_active.svg" mode=""></image>
					<image v-else class="icon" src="/static/images/setting/icon_checkbox.svg" mode=""></image>
				</view>
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
	.language {
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
			overflow: hidden;

			.card {
				width: 100%;
				height: 110rpx;
				padding: 0rpx 26rpx 0rpx 32rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: space-between;

				text {
					min-width: 0;
					flex: 1;
					color: #ddd;
					font-size: 30rpx;
					font-weight: 400;
				}

				.icon {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	}
</style>