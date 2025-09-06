<template>
	<tui-drawer class="tag-drawer" mode="bottom" :visible="visible" backgroundColor="#202020" @close="closeDrawer">
		<view class="tag-container">
			<view class="content">
				<view class="title-panel">
					<view class="title">标签</view>
					<view class="clear" @click="onClickChange({ tag_name: '全部', id: '' })">清除全部</view>
				</view>
				<view class="list">
					<view class="item" v-for="item in tagList" :key="item.id" :class="{ active: item.id == tagIndex }"
						@click="onClickChange(item)">
						<view class="check">
							<image v-if="item.id == tagIndex" src="/static/images/setting/icon_checkbox_active.svg"
								mode=""></image>
							<image v-else src="/static/images/setting/icon_checkbox.svg" mode=""></image>
						</view>
						<view class="level">{{ item.tag_name }}</view>
						<view class="desc">{{ item.task_count }}个奖励任务</view>
					</view>
				</view>
			</view>
			<view class="button" @click="closeDrawer">关闭</view>
		</view>
	</tui-drawer>
</template>

<script>
	export default {
		props: {
			tagList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				visible: false,

				tagIndex: null,
			}
		},
		methods: {
			onClickChange(item) {
				this.tagIndex = item.id
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
	.tag-drawer {
		::v-deep() {
			.tui-drawer-container_bottom {
				border-radius: 40rpx 40rpx 0 0;
			}

			.tag-container {
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
					padding: 40rpx 32rpx 54rpx;
					box-sizing: border-box;
					overflow-y: auto;

					.title-panel {
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-bottom: 40rpx;

						.title {
							color: #DDD;
							font-size: 32rpx;
							font-weight: 500;
							line-height: 48rpx;
						}

						.clear {
							color: #FF1A8C;
							font-size: 28rpx;
							font-weight: 400;
							line-height: 48rpx;
						}
					}

					.list {
						display: flex;
						flex-direction: column;
						gap: 20rpx;

						.item {
							width: 100%;
							padding: 32rpx 20rpx;
							box-sizing: border-box;
							border-radius: 20rpx;
							border: 2rpx solid transparent;
							background: #333;
							display: flex;
							align-items: center;
							justify-content: space-between;

							.check {
								width: 32rpx;
								height: 32rpx;

								image {
									width: 100%;
									height: 100%;
								}
							}

							.level {
								min-width: 0;
								flex: 1;
								color: #fff;
								font-size: 28rpx;
								margin-left: 24rpx;
							}

							.desc {
								color: #CCC;
								font-size: 28rpx;
								font-weight: 400;
							}
						}

						.active {
							border-color: #D018F5;
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