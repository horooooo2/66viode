<template>
	<view class="tui-slide-view" :style="{marginTop:marginTop+'rpx',marginBottom:marginBottom+'rpx'}">
		<!-- #ifdef APP || MP-WEIXIN || H5-->
		<view @transitionend="handler.transitionEnd" :show="shown" :change:show="handler.showChange"
			:rebounce="rebounce" :change:rebounce="handler.rebounceChange" :change:duration="handler.durationChange"
			:duration="duration" :change:disable="handler.disableChange" :disable="disable"
			:change:prop="handler.sizeReady" :prop="size" @touchstart="handler.touchstart"
			@touchmove="handler.touchmove" @touchend="handler.touchend" @mousedown="handler.touchstart"
			@mousemove="handler.touchmove" @mouseup="handler.touchend" class="tui-slideview__left tui_wxs_left"
			:style="{ zIndex: zIndex }">
			<slot></slot>
		</view>
		<view class="tui-slideview__right tui_wxs_right" :style="{zIndex:zIndex}">
			<view class="tui-slideview__buttons" v-if="buttons && buttons.length">
				<view v-for="(item, index) in buttons" :key="index" class="tui-slideview__btn__wrap tui_wxs_btn">
					<view @tap="handler.hideButton" :data-isclose="autoClose?1:0" :data-data="item.data"
						:data-index="index" class="tui-slideview__btn"
						:style="{ width: width, height: height, padding: padding, borderRadius: radius, background: item.background }">
						<view v-if="!item[srcField]"
							:style="{ fontSize: fontSize + 'rpx', color: item.color || color }">
							{{ item[textField] || item.text }}
						</view>
						<image v-else :src="item[srcField]"
							:style="{ width: item.width || '48rpx', height: item.height || '48rpx' }" />
					</view>
				</view>
			</view>
		</view>
		<!-- #endif -->

		<!-- #ifndef APP || MP-WEIXIN || H5 -->
		<view class="tui-slideview__left" :style="{transform:moveLeft}" :class="{'tui-swipe__action-ani':ani}"
			@touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
			<slot></slot>
		</view>
		<view class="tui-slideview__right-mp" :class="[elClass]" :style="{zIndex:zIndex,transform:moveRight}">
			<view class="tui-slideview__buttons" v-if="buttons && buttons.length">
				<view v-for="(item, index) in buttons" :key="index" class="tui-slideview__btn__wrap_mp">
					<view @tap="onBtnClick(index,item.data)" class="tui-slideview__btn"
						:style="{ width: width, height: height, padding: padding, borderRadius: radius, background: item.background }">
						<view v-if="!item[srcField]" :style="{ fontSize: fontSize + 'rpx', color: item.color || color }">
							{{ item[textField] }}
						</view>
						<image v-else :src="item[srcField]" :style="{ width: item.width || '48rpx', height: item.height || '48rpx' }" />
					</view>
				</view>
			</view>
		</view>
		<!-- #endif -->

		<view class="tui-slideview__mask" v-if="shown && showMask" @tap.stop="closeButtonGroup"
			@touchstart.stop.prevent="closeButtonGroup"></view>
	</view>
</template>
<!-- #ifdef APP || MP-WEIXIN || H5 -->
<script src="./tui-slide-view.wxs" module="handler" lang="wxs"></script>
<!-- #endif -->
<script>
	import mpjs from './tui-slide-view.js'
	export default {
		name: 'tuiSlideView',
		mixins: [mpjs],
		emits: ['click', 'close', 'open'],
		props: {
			buttons: {
				type: Array,
				default () {
					return [{
						text: '删除',
						color: '#fff',
						src: '', // img地址
						width: '', //img 宽
						height: '', //img 高
						background: (uni && uni.$tui && uni.$tui.color.pink) || '#f74d54'
					}];
				}
			},
			textField: {
				type: String,
				default: 'text'
			},
			srcField: {
				type: String,
				default: 'src'
			},
			color: {
				type: String,
				default: '#fff'
			},
			width: {
				type: String,
				default: '100%'
			},
			height: {
				type: String,
				default: '100%'
			},
			padding: {
				type: String,
				default: '0 30rpx'
			},
			radius: {
				type: String,
				default: '0'
			},
			fontSize: {
				type: [Number, String],
				default: 32
			},
			disable: {
				type: Boolean,
				default: false
			},
			show: {
				type: Boolean,
				default: false
			},
			duration: {
				type: Number,
				default: 350
			},
			//滑动多少距离菜单展开
			throttle: {
				type: Number,
				default: 30
			},
			showMask: {
				type: Boolean,
				default: false
			},
			//v2.9.0+
			marginTop: {
				type: [Number, String],
				default: 0
			},
			//v2.9.0+
			marginBottom: {
				type: [Number, String],
				default: 0
			},
			//v2.9.2+ 点击按钮是否自动关闭
			autoClose: {
				type: Boolean,
				default: true
			}
		},
		watch: {
			show(val) {
				this.shown = val;
				this.zIndex = this.shown ? 99 : 9;
			}
		},
		data() {
			const elClass = `tui_slideview_${Math.ceil(Math.random() * 10e5).toString(36)}`
			return {
				size: null,
				rebounce: 0, //回弹距离，暂时废弃
				shown: false,
				zIndex: 9,
				elClass: elClass
			};
		},
		mounted() {
			this.$nextTick(() => {
				setTimeout(() => {
					this.shown = this.show;
					this.updateRight();
				}, 50);
			})
		},
		methods: {
			updateRight() {
				// 获取右侧滑动显示区域的宽度
				const query = uni.createSelectorQuery().in(this);
				query
					.select('.tui_wxs_left')
					.boundingClientRect(res => {
						const btnQuery = uni.createSelectorQuery().in(this);
						btnQuery
							.selectAll('.tui_wxs_btn')
							.boundingClientRect(rects => {
								this.size = {
									buttons: rects,
									button: res,
									show: this.shown,
									disable: this.disable,
									throttle: this.throttle,
									rebounce: this.rebounce,
									duration: this.duration
								};
							})
							.exec();
					})
					.exec();
			},
			buttonTapByWxs(data) {
				if (this.autoClose) {
					this.shown = false;
				}
				this.zIndex = 9;
				this.$emit('click', data);
			},
			hideButton() {
				this.shown = false;
				this.zIndex = 9;
				this.$emit('close', {});
			},
			showButton() {
				this.shown = true;
				this.zIndex = 99;
				this.$emit('open', {});
			},

			transitionEnd() {},
			closeButtonGroup() {
				this.hideButton();
			}
		}
	};
</script>

<style scoped>
	.tui-slide-view {
		position: relative;
		overflow: hidden;
		box-sizing: border-box;
	}

	.tui-slideview__left {
		width: 100%;
		position: relative;
		z-index: 10;
		cursor: pointer;
	}

	.tui-slideview__right {
		position: absolute;
		left: 100%;
		top: 0;
		height: 100%;
	}

	.tui-slideview__right-mp {
		position: absolute;
		bottom: 0;
		top: 0;
		right: 0;
		height: 100%;
		transform: translateX(100%);
	}

	.tui-slideview__btn__wrap {
		position: absolute;
		left: 0;
		bottom: 0;
		text-align: center;
		min-width: 136rpx;
		height: 100%;
		white-space: nowrap;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-slideview__btn__wrap_mp {
		text-align: center;
		min-width: 136rpx;
		height: 100%;
		white-space: nowrap;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-slideview__buttons {
		width: 100%;
		height: 100%;
		cursor: pointer;
	}

	.tui-slideview__btn {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-swipe__action-ani {
		transition-property: transform;
		transition-duration: 0.3s;
		transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
	}

	.tui-slideview__mask {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 50;
	}
</style>