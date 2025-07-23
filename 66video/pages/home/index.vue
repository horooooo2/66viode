<template>
	<view class="home">
		<view class="status_bar"></view>
		<view class="header">
			<view class="logo" @click="onClick">66 Video</view>
			<view class="button">
				<view class="login">登录</view>
				<view class="register">注册</view>
			</view>
		</view>
		<view class="search">
			<input class="input" type="text" placeholder="搜索视频关键词"></input>
		</view>

		<tui-tab sliderHeight="0" backgroundColor="transparent" color="#BBB" selectedColor="#D018F5" bold :tabs="tabs"
			scroll @change="change"></tui-tab>

		<view class="tui-banner-swiper">
			<swiper class="tui-banner__height" @change="bannerChange" circular :indicator-dots="false" autoplay
				:interval="4000" :duration="150">
				<block v-for="(item,index) in background" :key="index">
					<swiper-item style="border-radius: 10px;overflow: hidden;">
						<image class="swiper-img" :src="item.img" mode=""></image>
					</swiper-item>
				</block>
			</swiper>
		</view>

		<view class="filter">
			<view class="filter-box" @click="popupShow = true">
				<view class="label">排序方式：</view>
				<view class="value">最受欢迎的</view>
				<image class="icon" src="/static/images/index/icon_close.png" mode=""></image>
			</view>
			<view class="filter-box" @click="timePopupShow = true">
				<view class="label">发布日期：</view>
				<view class="value">今日</view>
				<image class="icon" src="/static/images/index/icon_close.png" mode=""></image>
			</view>
		</view>

		<view class="list">
			<view class="list-item" v-for="i in 3" :key="i">
				<image class="flag" src="/static/images/index/hot-icon.png" mode=""></image>
				<image class="poster" src="/static/images/index/poster.png" mode=""></image>
				<view class="mask">抖音网红 王幼宁 携手闺蜜团/精神小伙 拿刀霸凌某女子 现场视频流出引全网热议！</view>
			</view>
		</view>

		<tui-bottom-popup backgroundColor="#202020" z-index="1002" :height="450" :show="popupShow" @close="hiddenPopup">
			<view class="sort-box">
				<view class="sort-title">排序方式</view>
				<tui-radio-group>
					<tui-label v-for="(item,index) in radioItems" :key="index">
						<tui-list-cell>
							<view class="thorui-align__center sort-item">
								<view class="sort-label">{{item.name}}</view>
								<tui-radio :checked="item.checked" :value="item.value" color="#D018F5" borderColor="#c5c9d1">
								</tui-radio>
							</view>
						</tui-list-cell>
					</tui-label>
				</tui-radio-group>
			</view>
		</tui-bottom-popup>

		<tui-bottom-popup backgroundColor="#202020" z-index="1002" :height="450" :show="timePopupShow"
			@close="hiddenTimePopup">
			<view class="sort-box">
				<view class="sort-title">发布日期</view>
				<tui-radio-group>
					<tui-label v-for="(item,index) in timeRadioItems" :key="index">
						<tui-list-cell>
							<view class="thorui-align__center sort-item">
								<view class="sort-label">{{item.name}}</view>
								<tui-radio :checked="item.checked" :value="item.value" color="#D018F5" borderColor="#c5c9d1">
								</tui-radio>
							</view>
						</tui-list-cell>
					</tui-label>
				</tui-radio-group>
			</view>
		</tui-bottom-popup>
		
		<Sidebar ref="sidebarRef"></Sidebar>
	</view>
</template>

<script>
	import Sidebar from '@/components/Sidebar/index.vue'
	export default {
		components: {
			Sidebar
		},
		data() {
			return {
				current: 0,
				currentTab: 0,
				tabs: ['推荐', '食品', '水果蔬菜', '新款男装', '内衣', '女装', '百货', '医药', '手机', '鞋包'],
				background: [{
						img: '/static/images/index/banner.png'
					},
					{
						img: '/static/images/index/banner.png'
					},
					{
						img: '/static/images/index/banner.png'
					}
				],
				popupShow: false,
				radioItems: [{
						name: '受欢迎的',
						value: '1',
						checked: true
					},
					{
						name: '新品发布',
						value: '2',
						checked: false
					},
					{
						name: '新品发布',
						value: '3',
						checked: false
					}
				],

				timePopupShow: false,
				timeRadioItems: [{
						name: '今日',
						value: '1',
						checked: true
					},
					{
						name: '本周',
						value: '2',
						checked: false
					},
					{
						name: '最近30天',
						value: '3',
						checked: false
					}
				]
			}
		},
		methods: {
			// 打开侧边栏
			onClick() {
				this.$refs.sidebarRef && this.$refs.sidebarRef.open()
			},
			//切换tab，逻辑请自行处理
			change(e) {
				this.currentTab = e.index
			},
			bannerChange: function(e) {
				this.current = e.detail.current;
			},

			hiddenPopup() {
				this.popupShow = false
			},
			hiddenTimePopup() {
				this.timePopupShow = false
			},
		}
	}
</script>

<style lang="scss">
	.home {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		background-image: url("/static/images/index/bg.png");
		background-position: top center;
		background-repeat: no-repeat;
		background-size: cover;

		.header {
			width: 100%;
			height: 50px;
			padding: 0 16px;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.logo {
				font-size: 16px;
				font-weight: bold;
				color: #fff;
			}

			.button {
				display: flex;

				.login,
				.register {
					width: 74px;
					height: 30px;
					text-align: center;
					line-height: 30px;
					color: #ffffff;
					font-size: 13px;
				}

				.login {
					border-radius: 40px;
					background: rgba(251, 95, 251, 0.20);
					margin-right: 10px;
				}

				.register {
					border-radius: 40px;
					background: var(--_, linear-gradient(0deg, #D018F5 0%, #FA3296 100%));
				}
			}
		}
		
		.search {
			width: 100%;
			padding: 0 32rpx;
			box-sizing: border-box;
			.input {
				width: 100%;
				height: 72rpx;
				background-color: rgba(16, 16, 16, 0.6);
				border-radius: 100rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 32rpx;
				box-sizing: border-box;
			}
			.uni-input-placeholder {
				color: #828282;
				left: 50%;
				transform: translateX(-50%);
				text-align: center;
				font-size: 28rpx;
			}
		}

		.tui-banner-swiper {
			margin-top: 22rpx;
			width: 100%;
			padding: 0 32rpx;
			box-sizing: border-box;

			.tui-banner__height {
				height: 290rpx;
			}

			.swiper-img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		.filter {
			width: 100%;
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 20rpx;
			padding: 0 32rpx;
			box-sizing: border-box;
			margin: 28rpx 0;

			.filter-box {
				border-radius: 12rpx;
				background: rgba(255, 255, 255, 0.05);
				height: 68rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 12rpx 24rpx;
				box-sizing: border-box;
				color: #bbb;
				font-size: 24rpx;

				.icon {
					width: 28rpx;
					height: 28rpx;
					border-radius: 50%;
					margin-left: 10rpx;
				}
			}
		}

		.list {
			display: flex;
			flex-direction: column;
			gap: 28rpx;
			padding: 0 32rpx 28rpx;
			box-sizing: border-box;

			.list-item {
				position: relative;
				width: 100%;
				height: 260rpx;
				border-radius: 20rpx;

				.flag {
					position: absolute;
					top: 0;
					left: 20rpx;
					width: 48rpx;
					height: 48rpx;
					z-index: 1;
				}

				.poster {
					width: 100%;
					height: 100%;
				}

				.mask {
					width: 100%;
					height: 100%;
					background-color: rgba(0, 0, 0, 0.4);
					position: absolute;
					top: 0;
					left: 0;
					padding: 40rpx 76rpx;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 28rpx;
					color: #fff;
					font-weight: 600;
					line-height: 40rpx;
				}
			}
		}

		.sort-box {
			padding: 28rpx 40rpx 40rpx;
			box-sizing: border-box;

			.sort-title {
				color: #ddd;
				font-size: 32rpx;
				font-weight: 500;
				line-height: 48rpx;
				margin-bottom: 10rpx;
				text-align: center;
			}

			:deep() {
				.tui-list-cell {
					background-color: transparent !important;
					height: 108rpx;
				}

				.tui-cell__line {
					border-bottom: none;
				}
			}

			.sort-item {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.sort-label {
					color: #ccc;
					font-size: 28rpx;
				}
			}
		}
	}
</style>