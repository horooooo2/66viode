<template>
	<tui-drawer class="prize-drawer" mode="bottom" :visible="visible" backgroundColor="#202020" @close="closeDrawer">
		<view class="prize-container">
			<view class="content">
				<view class="title">活跃奖励</view>
				<view class="list">
					<view class="list-main" v-for="item in activeList" :key="item.id" @click="onClickActive(item)">
						<view class="top-panel">
							<view class="label">{{ item.active_name }}</view>
							<view class="right-panel">重置时间:{{ activeObj.reset_cycle }}</view>
						</view>
						<Prize :prizeList="item.reward_config"></Prize>
					</view>
				</view>
			</view>
			<view class="button" @click="closeDrawer">关闭</view>
		</view>
	</tui-drawer>
</template>

<script>
	import Prize from "../components/Prize.vue"
	export default {
		components: {
			Prize,
		},
		props: {
			activeObj: {
				type: Object,
				default: () => {}
			}
		},
		computed: {
			activeList() {
				return this.activeObj?.actives || []
			}
		},
		data() {
			return {
				visible: false
			}
		},
		methods: {
			onClickActive(item) {
				this.$emit('change', item)
				this.closeDrawer()
			},
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
	.prize-drawer {
		::v-deep() {
			.tui-drawer-container_bottom {
				border-radius: 40rpx 40rpx 0 0;
			}

			.prize-container {
				min-height: 490rpx;
				max-height: 80%;
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.content {
					min-height: 0;
					flex: 1;
					width: 100%;
					padding: 40rpx 32rpx;
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

					.list {
						width: 100%;
						display: flex;
						flex-direction: column;
						gap: 20rpx;

						.list-main {
							padding: 36rpx 24rpx 24rpx;
							box-sizing: border-box;
							border-radius: 20rpx;
							background: #333;

							.top-panel {
								width: 100%;
								display: flex;
								align-items: center;
								justify-content: space-between;
								margin-bottom: 20rpx;

								.label {
									color: #DDD;
									font-size: 28rpx;
									font-weight: 500;
									line-height: 32rpx;
								}

								.right-panel {
									flex-shrink: 0;
									color: #bbb;
									font-size: 24rpx;
									font-weight: 400;
								}
							}
						}
					}
				}

				.button {
					width: 100%;
					height: 102rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #f4f5f7;
					font-size: 32rpx;
					font-weight: 500;
					border-top: 2rpx solid #333;
					box-sizing: border-box;
				}
			}
		}
	}
</style>