<template>
	<scroll-view class="tui-scroll__view"
		:class="[isFixed && !isSticky?'tui-tabs__fixed':'',isSticky?'tui-tabs__sticky':'',classView]"
		:style="{height: height+'rpx',background:backgroundColor,top: isFixed || isSticky ? top + 'px' : 'auto',zIndex:isFixed || isSticky?zIndex:'auto'}"
		:scroll-x="scroll" :scroll-with-animation="scrolling" :show-scrollbar="false" :scroll-left="scrollLeft">
		<view class="tui-tabs__wrap">
			<view class="tui-tabs__list" :class="[scroll ? 'tui-tabs__scroll' : '']" :style="{height: height+'rpx'}">
				<view class="tui-tabs__item" :style="{height: height+'rpx'}" v-for="(item,index) in tabList"
					:key="index" @tap="handleClick(index,item)">
					<view class="tui-item__child" :class="[childClass]"
						:style="{color: currentTab == index ? getSelectedColor : color,fontSize: size + 'rpx',fontWeight: bold && currentTab == index ? 'bold' : 'normal',transform:`scale(${currentTab == index?scale:1})`}">
						{{item[field]}}
					</view>
				</view>
				<view class="tui-tabs__line tui-transition"
					:style="{background: getSliderBgColor,height:sliderHeight,borderRadius: sliderRadius,bottom: bottom,width: lineWidth+'px',transform: `translateX(${translateX}px)`}">
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		name: 'tuiTab',
		emits: ['change'],
		options: {
			virtualHost: true
		},
		props: {
			// 标签页数据源
			tabs: {
				type: Array,
				default () {
					return []
				}
			},
			//显示文本字段名称
			field: {
				type: String,
				default: 'name'
			},
			// 当前选项卡
			current: {
				type: Number,
				default: 0
			},
			// 是否可以滚动
			scroll: {
				type: Boolean,
				default: false
			},
			// tab高度 rpx
			height: {
				type: [Number, String],
				default: 80
			},
			//组件左侧距离屏幕的间隙 单位rpx
			leftGap: {
				type: [Number, String],
				default: 0
			},
			backgroundColor: {
				type: String,
				default: '#fff'
			},
			//字体大小
			size: {
				type: Number,
				default: 28
			},
			//字体颜色
			color: {
				type: String,
				default: '#666'
			},
			//选中后字体颜色
			selectedColor: {
				type: String,
				default: ''
			},
			//选中后 是否加粗 ，未选中则无效
			bold: {
				type: Boolean,
				default: false
			},
			//2.3.0+
			scale: {
				type: [Number, String],
				default: 1
			},
			//滑块高度
			sliderHeight: {
				type: String,
				default: '2px'
			},
			//滑块背景颜色
			sliderBgColor: {
				type: String,
				default: ''
			},
			//滑块 radius
			sliderRadius: {
				type: String,
				default: '2px'
			},
			//line、block
			sliderType: {
				type: String,
				default: 'line'
			},
			//滑块bottom
			bottom: {
				type: String,
				default: '0'
			},
			//是否固定
			isFixed: {
				type: Boolean,
				default: false
			},
			//吸顶效果，为true时isFixed失效
			isSticky: {
				type: Boolean,
				default: false
			},
			//isFixed=true时，tab top值 px
			top: {
				type: Number,
				// #ifndef H5
				default: 0,
				// #endif
				// #ifdef H5
				default: 44
				// #endif
			},
			zIndex: {
				type: [Number, String],
				default: 996
			}
		},
		computed: {
			getSelectedColor() {
				return this.selectedColor || (uni && uni.$tui && uni.$tui.color.primary) || '#5677fc'
			},
			getSliderBgColor() {
				return this.sliderBgColor || (uni && uni.$tui && uni.$tui.color.primary) || '#5677fc'
			}
		},
		watch: {
			/**
			 * 监听数据变化, 如果改变重新初始化参数
			 */
			tabs(newVal, oldVal) {
				// 异步加载数据时候, 延迟执行 init 方法, 防止无法正确获取 dom 信息
				this.tabItems = []
				this.scrollLeft = 0;
				this.scrolling = false
				this.isInit = true;
				this.handleData(newVal || []);
				this.$nextTick(() => {
					setTimeout(() => this.init(), 200);
				})
			},
			/**
			 *  监听 currentTab 变化, 做对应处理
			 */
			current(newVal, oldVal) {
				if (this.isInit) {
					this.currentTab = newVal
				} else {
					this.scrollByIndex(newVal);
				}
			},
			leftGap(newVal) {
				this.gap = uni.upx2px(Number(newVal))
			}
		},
		created() {
			this.handleData(this.tabs || []);
			this.currentTab = this.current;
		},
		mounted() {
			this.gap = uni.upx2px(Number(this.leftGap))
			this.$nextTick(() => {
				setTimeout(() => {
					this.init()
				}, 50)
			})
		},
		data() {
			let childClass = `tui_10_${Math.ceil(Math.random() * 10e5).toString(36)}`;
			let classView = `tui_01_${Math.ceil(Math.random() * 10e5).toString(36)}`;
			return {
				childClass,
				classView,
				/* 未渲染数据 */
				windowWidth: 0, // 屏幕宽度
				tabItems: [], // 所有 tab 节点信息

				/* 渲染数据 */
				scrolling: true, // 控制 scroll-view 滚动以在异步加载数据的时候能正确获得 dom 信息
				needTransition: false, // 下划线是否需要过渡动画
				translateX: 0, // 下划 line 的左边距离
				lineWidth: 0, // 下划 line 宽度
				scrollLeft: 0, // scroll-view 左边滚动距离
				currentTab: 0,
				gap: -1,
				isInit: false,
				tabList: []
			};
		},
		methods: {
			handleData(vals) {
				let list = []
				if (typeof vals[0] !== 'object') {
					list = vals.map(item => {
						return {
							[this.field]: item
						}
					})
				} else {
					list = [...vals]
				}
				this.tabList = list;
			},
			/**
			 * 切换菜单
			 */
			handleClick(index, item) {
				const len = this.tabList.length - 1;
				if (index > len || this.isInit) return;
				this.scrollByIndex(index);
				this.$emit('change', {
					index: index,
					item: item
				});
			},
			/**
			 * 滑动到指定位置
			 * @param tabCur: 当前激活的tabItem的索引
			 * @param needTransition: 下划线是否需要过渡动画, 第一次进来应设置为false
			 */
			scrollByIndex(tabCur, needTransition = true) {
				let item = this.tabItems[tabCur];
				if (!item) return;
				let itemWidth = item.width || 0,
					itemLeft = item.left || 0;
				this.needTransition = needTransition;
				this.currentTab = tabCur;
				// 超出滚动的情况
				const isBlock = this.sliderType == 'block' ? true : false;
				if (this.scroll) {
					// 保持滚动后当前 item '尽可能' 在屏幕中间
					if (needTransition) {
						let scrollLeft = itemLeft - (this.windowWidth - itemWidth) / 2;
						this.scrollLeft = scrollLeft;
					}
					this.translateX = itemLeft - this.gap - (isBlock ? 12 : 0);
					this.lineWidth = itemWidth + (isBlock ? 24 : 0)
				} else {
					// 不超出滚动的情况
					this.translateX = itemLeft - this.gap - (isBlock ? 12 : 0);
					this.lineWidth = itemWidth + (isBlock ? 24 : 0)
				}
			},
			/**
			 *  初始化函数
			 */
			init() {
				const {
					windowWidth
				} = uni.getSystemInfoSync();
				// this.windowWidth = windowWidth || 375
				const query = uni.createSelectorQuery().in(this);
				let len = this.tabList.length - 1;
				len = Math.max(len, 0)
				this.currentTab = this.currentTab > len ? 0 : this.currentTab;

				// #ifndef MP-BAIDU
				query
					.select('.tui-scroll__view')
					.boundingClientRect(res => {
						if (res) {
							this.windowWidth = res.width || windowWidth;
						}
					}).selectAll(".tui-item__child").boundingClientRect((res) => {
						this.scrolling = true;
						this.tabItems = res;
						this.isInit = false;
						this.scrollByIndex(this.currentTab, false);
					})
					.exec();
				// #endif

				// #ifdef MP-BAIDU
				query
					.select(`.${this.classView}`)
					.boundingClientRect(res => {
						if (res) {
							this.windowWidth = res.width || windowWidth;
						}
					}).selectAll(`.${this.childClass}`).boundingClientRect((res) => {
						this.scrolling = true;
						this.tabItems = res;
						this.isInit = false;
						this.scrollByIndex(this.currentTab, false);
					})
					.exec();
				// #endif
				// query.selectAll(".tui-item__child").boundingClientRect((res) => {
				// 	this.scrolling = true;
				// 	this.tabItems = res;
				// 	this.scrollByIndex(this.currentTab, false);
				// }).exec();
			}
		}
	};
</script>

<style scoped>
	.tui-scroll__view {
		width: 100%;
		height: 80rpx;
		overflow: hidden;
	}

	.tui-tabs__fixed {
		position: fixed;
		left: 0;
	}

	.tui-tabs__sticky {
		position: sticky;
		left: 0;
	}

	.tui-tabs__wrap {
		padding-bottom: 20rpx;
	}

	.tui-tabs__list {
		position: relative;
		height: 80rpx;
		display: flex;
	}

	.tui-tabs__scroll {
		white-space: nowrap !important;
		display: block !important;
	}

	.tui-tabs__scroll .tui-tabs__item {
		padding: 0 30rpx;
		display: inline-flex;
	}

	.tui-tabs__scroll .tui-item__child {
		display: block !important;
	}

	.tui-tabs__item {
		flex: 1;
		text-align: center;
		padding: 0 10rpx;
		box-sizing: border-box;
		transition: color 0.3s ease-in-out;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		z-index: 2;
	}

	.tui-item__child {
		display: inline-block;
		transition: transform 0.3s;
		transform-origin: center center;
	}

	.tui-tabs__line {
		position: absolute;
		left: 0;
		width: 0;
		z-index: 1;
	}

	.tui-tabs__line.tui-transition {
		transition: width 0.3s, transform 0.3s;
	}

	/* #ifndef APP-NVUE */
	::-webkit-scrollbar {
		width: 0 !important;
		height: 0 !important;
		color: transparent !important;
		display: none;
	}

	/* #endif */
</style>