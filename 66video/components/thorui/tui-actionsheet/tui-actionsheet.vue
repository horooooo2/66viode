<template>
	<view @touchmove.stop.prevent>
		<view class="tui-actionsheet" :class="{'tui-actionsheet-show':show,'tui-actionsheet-radius':radius}"
			:style="{zIndex:getZIndex}">
			<view class="tui-actionsheet-tips" :style="{fontSize:size+'rpx',color:color}" v-if="tips">
				{{tips}}
			</view>
			<view :class="[isCancel?'tui-operate-box':'']">
				<block v-for="(item,index) in itemList" :key="index">
					<view class="tui-actionsheet-btn tui-actionsheet-divider"
						:class="{'tui-btn-last':!isCancel && index==itemList.length-1}"
						hover-class="tui-actionsheet-hover" :hover-stay-time="150" :data-index="index"
						:style="{color:item.color || textColor,fontSize:(item.size || textSize)+'rpx'}"
						@tap="handleClickItem">{{item[textField]}}</view>
				</block>
			</view>
			<view class="tui-actionsheet-btn tui-actionsheet-cancel" hover-class="tui-actionsheet-hover"
				:hover-stay-time="150" :style="{fontSize:textSize+'rpx',color:cancelColor}" v-if="isCancel"
				@tap="handleClickCancel">取消</view>
		</view>
		<view class="tui-actionsheet-mask" :class="{'tui-mask-show':show}" :style="{background:maskColor,zIndex:zIndex}"
			@tap="handleClickMask"></view>
	</view>
</template>

<script>
	export default {
		name: "tuiActionsheet",
		emits: ['click', 'cancel'],
		props: {
			//显示操作菜单
			show: {
				type: Boolean,
				default: false
			},
			//菜单按钮数组，自定义文本颜色，红色参考色：#e53a37
			itemList: {
				type: Array,
				default: function() {
					return [{
						text: "确定",
						color: "#2B2B2B",
						size: 34
					}]
				}
			},
			textField: {
				type: String,
				default: "text"
			},
			textColor: {
				type: String,
				default: '#2B2B2B'
			},
			textSize: {
				type: [Number, String],
				default: 34
			},
			//点击遮罩 是否可关闭
			maskClosable: {
				type: Boolean,
				default: true
			},
			//v2.1.0
			maskColor: {
				type: String,
				default: "rgba(0, 0, 0, 0.6)"
			},
			//提示文字
			tips: {
				type: String,
				default: ""
			},
			//提示文字颜色
			color: {
				type: String,
				default: "#808080"
			},
			//提示文字大小 rpx
			size: {
				type: [Number, String],
				default: 26
			},
			//是否需要圆角
			radius: {
				type: Boolean,
				default: true
			},
			//是否需要取消按钮
			isCancel: {
				type: Boolean,
				default: true
			},
			cancelColor: {
				type: String,
				default: '#1a1a1a'
			},
			zIndex: {
				type: [Number, String],
				default: 998
			}
		},
		computed: {
			getZIndex() {
				return Number(this.zIndex) + 2
			}
		},
		methods: {
			handleClickMask() {
				if (!this.maskClosable) return;
				this.handleClickCancel();
			},
			handleClickItem(e) {
				if (!this.show) return;
				const index = Number(e.currentTarget.dataset.index);
				this.$emit('click', {
					index: index,
					...this.itemList[index]
				});
			},
			handleClickCancel() {
				this.$emit('cancel');
			}
		}
	}
</script>

<style scoped>
	.tui-actionsheet {
		width: 100%;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		visibility: hidden;
		transform: translate3d(0, 100%, 0);
		transform-origin: center;
		transition: all 0.25s ease-in-out;
		background-color: #F7F7F7;
		min-height: 100rpx;
	}

	.tui-actionsheet-radius {
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		overflow: hidden;
	}

	.tui-actionsheet-show {
		transform: translate3d(0, 0, 0);
		visibility: visible;
	}

	.tui-actionsheet-tips {
		width: 100%;
		padding: 40rpx 60rpx;
		box-sizing: border-box;
		text-align: center;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-operate-box {
		padding-bottom: 12rpx;
	}

	.tui-actionsheet-btn {
		width: 100%;
		height: 100rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		position: relative;
	}

	.tui-btn-last {
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-actionsheet-divider::before {
		content: '';
		width: 100%;
		border-top: 1rpx solid #E7E7E7;
		position: absolute;
		top: 0;
		left: 0;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.tui-actionsheet-cancel {
		color: #1a1a1a;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-actionsheet-hover {
		background-color: #f7f7f9;
	}

	.tui-actionsheet-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		transition: all 0.3s ease-in-out;
		opacity: 0;
		visibility: hidden;
	}

	.tui-mask-show {
		opacity: 1;
		visibility: visible;
	}
</style>