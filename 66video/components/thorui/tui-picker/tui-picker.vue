<template>
	<view class="tui-picker__box">
		<view class="tui-mask__screen" :style="{zIndex}" :class="[visible?'tui-picker__mask-show':'']" @tap="maskClick">
		</view>
		<view class="tui-picker__wrap" :style="{backgroundColor:backgroundColor,zIndex:getIndex}"
			:class="[visible?'tui-picker__show':'',radius?'tui-picker__radius':'']">
			<view class="tui-picker__header" :style="{backgroundColor:headerBgColor}">
				<view class="tui-picker__btn-cancle" hover-class="tui-picker__opcity" :hover-stay-time="150"
					@tap.stop="hidePicker"
					:style="{color:cancelColor,fontSize:btnSize+'rpx',fontWeight:bold?'bold':'normal'}">{{cancelText}}
				</view>
				<view class="tui-picker__title" :style="{fontSize:titleSize+'rpx',color:titleColor}">{{title}}</view>
				<view class="tui-picker__btn-sure" hover-class="tui-picker__opcity" :hover-stay-time="150"
					@tap.stop="picker"
					:style="{color:getConfirmColor,fontSize:btnSize+'rpx',fontWeight:bold?'bold':'normal'}">
					{{confirmText}}
				</view>
			</view>
			<view @touchstart.stop="pickstart">
				<picker-view :key="maskStyle+layer" :mask-style="maskStyle" :indicator-style="indicatorStyle"
					class="tui-picker__view" :value="vals" :immediate-change="immediate" @change="columnPicker"
					@pickend="pickend">
					<picker-view-column>
						<view :style="{color:color,fontSize:size+'px'}" v-for="(item,index) in layer1__data"
							:key="index" class="tui-picker__item">{{item}}</view>
					</picker-view-column>
					<picker-view-column v-if="layer==2 || layer==3">
						<view :style="{color:color,fontSize:size+'px'}" v-for="(item,index) in layer2__data"
							:key="index" class="tui-picker__item">{{item}}</view>
					</picker-view-column>
					<picker-view-column v-if="layer==3">
						<view :style="{color:color,fontSize:size+'px'}" v-for="(item,index) in layer3__data"
							:key="index" class="tui-picker__item">{{item}}</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "tui-picker",
		emits: ['pickstart', 'pickend', 'hide', 'change'],
		props: {
			//数据层级
			layer: {
				type: [Number, String],
				default: 1
			},
			//data数据
			pickerData: {
				type: Array,
				default () {
					return []
				}
			},
			textField: {
				type: String,
				default: 'text'
			},
			valueField: {
				type: String,
				default: 'value'
			},
			childrenField: {
				type: String,
				default: 'children'
			},
			//是否显示
			show: {
				type: Boolean,
				default: false
			},
			//默认值，text集合
			value: {
				type: Array,
				default () {
					return []
				}
			},
			//设置选择器中间选中框的样式
			indicatorStyle: {
				type: String,
				default: 'height: 48px;'
			},
			//设置蒙层的样式
			maskStyle: {
				type: String,
				default: ''
			},
			//是否显示圆角
			radius: {
				type: Boolean,
				default: false
			},
			//header背景色
			headerBgColor: {
				type: String,
				default: '#fff'
			},
			//显示标题
			title: {
				type: String,
				default: ''
			},
			//标题字体大小
			titleSize: {
				type: [Number, String],
				default: 34
			},
			//标题字体颜色
			titleColor: {
				type: String,
				default: '#333'
			},
			//确认按钮文本
			confirmText: {
				type: String,
				default: '确定'
			},
			//确认按钮文本颜色
			confirmColor: {
				type: String,
				default: ''
			},
			//取消按钮文本
			cancelText: {
				type: String,
				default: '取消'
			},
			//取消按钮文本颜色
			cancelColor: {
				type: String,
				default: '#888'
			},
			//按钮字体大小
			btnSize: {
				type: [Number, String],
				default: 32
			},
			//按钮字体是否加粗
			bold: {
				type: Boolean,
				default: true
			},
			//内容背景色
			backgroundColor: {
				type: String,
				default: '#fff'
			},
			//内容字体颜色
			color: {
				type: String,
				default: '#333'
			},
			//picker内容字体大小 px
			size: {
				type: [Number, String],
				default: 16
			},
			//点击遮罩 是否可关闭
			maskClosable: {
				type: Boolean,
				default: true
			},
			//自定义参数
			params: {
				type: [Number, String],
				default: 0
			},
			zIndex: {
				type: [Number, String],
				default: 998
			}
		},
		computed: {
			getConfirmColor() {
				return this.confirmColor || (uni && uni.$tui && uni.$tui.color.primary) || '#5677fc'
			},
			getIndex() {
				return Number(this.zIndex) + 2
			}
		},
		data() {
			let immediate = true;
			// #ifdef MP-TOUTIAO
			immediate = false
			// #endif
			return {
				immediate,
				visible: false,
				vals: [],
				layer1__data: [],
				layer2__data: [],
				layer3__data: [],
				isEnd: true,
				firstShow: false
			};
		},
		created() {
			this.initData(-1, 0, 0);
			this.$nextTick(() => {
				setTimeout(() => {
					this.setDefaultOptions()
				}, 50)
			})
			this.visible = this.show;
			if (this.visible) {
				this.firstShow = true
			}
		},
		watch: {
			show(val) {
				this.visible = val;
				if (val) {
					setTimeout(() => {
						this.firstShow = true
					}, 260)
				}
			},
			value(vals) {
				if (vals && vals.length > 0) {
					setTimeout(() => {
						this.setDefaultOptions()
					}, 20)
				}
			},
			pickerData(newVal) {
				this.initData(-1, 0, 0)
				this.$nextTick(() => {
					setTimeout(() => {
						this.setDefaultOptions()
					}, 50)
				})
			}
		},
		methods: {
			hidePicker() {
				this.visible = false;
				this.$emit('hide', {
					params: this.params
				})
			},
			maskClick() {
				if (!this.maskClosable) return;
				this.hidePicker()
			},
			getValue(key = 'text', layer = 1) {
				let vals = this.vals;
				let data = this.pickerData;
				let result = ''
				if (layer == 1) {
					result = data[vals[0]][key]
				} else if (layer == 2) {
					if (data[vals[0]][this.childrenField]) {
						result = data[vals[0]][this.childrenField][vals[1]][key]
					}
				} else {
					if (data[vals[0]][this.childrenField] && data[vals[0]][this.childrenField][vals[1]][this
						.childrenField]) {
						result = data[vals[0]][this.childrenField][vals[1]][this.childrenField][vals[2]][key]
					}
				}
				return result;
			},
			loop(index = 0) {
				if (this.isEnd) {
					this.pickerChange()
				} else {
					index++
					if (index >= 30) {
						this.isEnd = true
					}
					setTimeout(() => {
						this.loop(index)
					}, 50)
				}
			},
			picker() {
				this.hidePicker()
				this.loop()
			},
			pickerChange() {
				let text = [];
				let value = [];
				let result = '';
				if (this.pickerData.length > 0) {
					if (this.layer == 1) {
						text = this.getValue(this.textField);
						value = this.getValue(this.valueField);
						result = text;
					} else if (this.layer == 2) {
						text = [this.getValue(this.textField), this.getValue(this.textField, 2)];
						value = [this.getValue(this.valueField), this.getValue(this.valueField, 2)];
						result = text.join('');
					} else {
						text = [this.getValue(this.textField), this.getValue(this.textField, 2), this.getValue(this.textField, 3)];
						value = [this.getValue(this.valueField), this.getValue(this.valueField, 2), this.getValue(this
							.valueField, 3)];
						result = text.join('');
					}
				}

				this.$emit('change', {
					[this.textField]: text,
					[this.valueField]: value,
					index: this.vals,
					result: result,
					params: this.params
				})
			},
			toArr(data) {
				let arr = [];
				if (data && data.length > 0) {
					for (let item of data) {
						arr.push(item[this.textField]);
					}
				}
				return arr;
			},
			checkChildrenData(data, layer, index, idx) {
				let arr = [];
				if (layer == 1) {
					if (data[index])
						arr = data[index][this.childrenField] || [];
				} else {
					if (data[index] && data[index][this.childrenField] && data[index][this.childrenField][idx])
						arr = data[index][this.childrenField][idx][this.childrenField] || [];
				}
				return arr;
			},
			setDefaultOptions() {
				let textArr = this.value;
				let vals = [];
				if (this.layer1__data.length > 0 && textArr.length > 0) {
					textArr.forEach((item, idx) => {
						let index = this[`layer${idx+1}__data`].indexOf(item);
						if (idx == 0) {
							this.layer2__data = this.toArr(this.checkChildrenData(this.pickerData, 1, index))
						} else if (idx == 1) {
							this.layer3__data = this.toArr(this.checkChildrenData(this.pickerData, 2, vals[0],
								index))
						}
						if (index == -1) {
							vals.push(0)
						} else {
							vals.push(index)
						}
					})
				} else {
					if (this.layer == 1) {
						vals = [0]
					} else if (this.layer == 2) {
						vals = [0, 0];
						this.layer2__data = this.toArr(this.checkChildrenData(this.pickerData, 1, 0))
					} else {
						vals = [0, 0, 0];
						this.layer2__data = this.toArr(this.checkChildrenData(this.pickerData, 1, 0))
						this.layer3__data = this.toArr(this.checkChildrenData(this.pickerData, 2, 0,
							0))
					}
				}
				if (this.vals.join(',') == vals.join(',')) return;
				this.$nextTick(() => {
					setTimeout(() => {
						this.vals = vals;
					}, 200)
				})
			},
			initData(layer, index, idx) {
				let data = this.pickerData;
				if (!data || data.length == 0) {
					this.layer1__data = [];
					this.layer2__data = [];
					this.layer3__data = [];
					return;
				}
				if (this.layer == 1) {
					this.layer1__data = this.toArr(data)
				} else if (this.layer == 2) {
					if (layer == -1)
						this.layer1__data = this.toArr(data)

					this.layer2__data = this.toArr(this.checkChildrenData(data, 1, index))
				} else {
					if (layer == -1)
						this.layer1__data = this.toArr(data)

					if (layer == 0 || layer == -1)
						this.layer2__data = this.toArr(this.checkChildrenData(data, 1, index))

					this.layer3__data = this.toArr(this.checkChildrenData(data, 2, index, idx))
				}
			},
			columnPicker: function(e) {
				let value = e.detail.value;
				if (!this.firstShow || value.length != this.layer) return;
				if (this.layer == 1) {
					this.layer__one(value)
				} else if (this.layer == 2) {
					this.layer__two(value)
				} else {
					this.layer__three(value)
				}
				this.isEnd = true
			},
			layer__one(value) {
				if (this.vals[0] != value[0]) {
					this.vals = value;
				}
			},
			layer__two(value) {
				if (this.vals[0] != value[0]) {
					this.initData(0, value[0])
					this.vals = [value[0], 0]
				} else {
					this.vals = value
				}
			},
			layer__three(value) {
				if (this.vals[0] != value[0]) {
					this.initData(0, value[0], 0)
					this.vals = [value[0], 0, 0]
				} else if (this.vals[1] != value[1]) {
					this.initData(0, value[0], value[1])
					this.vals = [value[0], value[1], 0]
				} else {
					this.vals = value
				}
			},
			pickstart(e) {
				this.isEnd = false;
				this.$emit('pickstart', {
					params: this.params
				})
			},
			pickend(e) {
				//仅微信小程序支持
				this.$emit('pickend', {
					params: this.params
				})
			}
		}
	}
</script>

<style scoped>
	.tui-mask__screen {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		transition: all 0.3s ease-in-out;
		opacity: 0;
		visibility: hidden;
	}

	.tui-picker__mask-show {
		opacity: 1;
		visibility: visible;
	}

	.tui-picker__wrap {
		width: 100%;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		visibility: hidden;
		transform: translate3d(0, 100%, 0);
		transform-origin: center;
		transition: all 0.3s ease-in-out;
		min-height: 20rpx;
	}

	.tui-picker__radius {
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
		overflow: hidden;
	}

	.tui-picker__show {
		transform: translate3d(0, 0, 0);
		visibility: visible;
	}

	.tui-picker__header {
		width: 100%;
		height: 92rpx;
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		position: relative;
	}

	.tui-picker__header::after {
		content: '';
		position: absolute;
		border-bottom: 1rpx solid rgba(0, 0, 0, .1);
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
		right: 0;
		left: 0;
	}

	.tui-picker__btn-cancle {
		padding: 20rpx;
		flex-shrink: 0;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.tui-picker__btn-sure {
		padding: 20rpx;
		flex-shrink: 0;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.tui-picker__title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		flex: 1;
		padding: 0 30rpx;
		box-sizing: border-box;
		text-align: center;
	}

	.tui-picker__view {
		width: 100%;
		height: 260px;
	}

	.tui-picker__item {
		line-height: 48px;
		text-align: center;
	}

	.tui-picker__opcity {
		opacity: 0.5;
	}
</style>