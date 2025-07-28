<template>
	<tui-drawer class="rule-drawer" mode="bottom" :visible="visible" backgroundColor="#202020" @close="closeDrawer">
		<view class="rule-container">
			<view class="content">
				<view class="title">详细规则</view>
				<view class="textarea">您的在线时长已经达到 30 分钟，恭喜您获得 3000 积分奖励！您的在线时长已经达到 30 分钟，恭喜您获得 3000 积分奖励！您的在线时长已经达到 30 分钟，恭喜您获得
					3000 积分奖励！</view>
			</view>
			<view class="button" @click="closeDrawer">关闭</view>
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
			closeDrawer(e) {
				this.visible = false
			},
			//调用此方法显示抽屉
			open() {
				this.visible = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.rule-drawer {
		::v-deep() {
			.tui-drawer-container_bottom {
				border-radius: 40rpx 40rpx 0 0;
			}

			.rule-container {
				min-height: 490rpx;
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.content {
					min-height: 0;
					flex: 1;
					width: 100%;
					padding: 40rpx 40rpx 80rpx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					align-items: center;
					.title {
						color: #DDD;
						font-size: 32rpx;
						font-weight: 500;
						line-height: 48rpx;
						margin-bottom: 32rpx;
					}
					.textarea {
						color: #AAA;
						font-size: 28rpx;
						font-weight: 400;
						line-height: 48rpx;
					}
				}

				.button {
					width: 100%;
					height: 102rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #FF1A8C;
					font-size: 32rpx;
					font-weight: 500;
					border-top: 2rpx solid #333;
					box-sizing: border-box;
				}
			}
		}
	}
</style>