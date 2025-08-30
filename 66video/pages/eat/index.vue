<template>
	<view class="article_home">
		<scroll-view
			scroll-y
			:refresher-enabled="true"
			:refresher-triggered="isRefreshing"
			@refresherrefresh="onRefresh"
		>
			<view class="status_bar"></view>
			<view class="header">
				<view class="logo" @click="onClick">66 Video</view>
				<view v-if="isLogin" class="right" @click="toPath('/pages/user/index')">
					<Surplus></Surplus>
					<view class="avatar"></view>
				</view>
				<view v-else class="button">
					<view class="login" @click="toPath('/pages/login/index?type=1')">登录</view>
					<view class="register" @click="toPath('/pages/login/index?type=2')">注册</view>
				</view>
			</view>
			<view class="search">
				<input class="input" type="text" placeholder="搜索视频关键词" @click="toPath('/pages/search/index')"></input>
			</view>

			<tui-tab sliderHeight="0" backgroundColor="transparent" color="#BBB" selectedColor="#D018F5" bold
				:tabs="categories" scroll @change="onClickCategories"></tui-tab>

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
				<view class="filter-box" @click="orderPopup = true">
					<view class="label">排序方式：</view>
					<view class="value">{{ orderName }}</view>
					<image class="icon" src="/static/images/index/icon_close.png" mode=""></image>
				</view>
				<view class="filter-box" @click="datePopup = true">
					<view class="label">发布日期：</view>
					<view class="value">{{ dateName }}</view>
					<image class="icon" src="/static/images/index/icon_close.png" mode=""></image>
				</view>
			</view>
			<!-- 数据列表 -->
			<list :list="listData" @refreshList='refreshList'></list>
			<Empty v-if="listData.length === 0" />
			<custom-tabbar :current="1" @change="handleTabChange"></custom-tabbar>
		</scroll-view>


		<tui-bottom-popup backgroundColor="#202020" z-index="1002" :height="350" :show="orderPopup"
			@close="closeOrderPopup">
			<view class="sort-box">
				<view class="sort-title">排序方式</view>
				<tui-radio-group :value="order" @change="onClickOrder">
					<tui-label v-for="(item,index) in orderOptions" :key="index">
						<tui-list-cell>
							<view class="thorui-align__center sort-item">
								<view class="sort-label">{{item.name}}</view>
								<tui-radio :value="item.value" color="#D018F5" borderColor="#c5c9d1">
								</tui-radio>
							</view>
						</tui-list-cell>
					</tui-label>
				</tui-radio-group>
			</view>
		</tui-bottom-popup>

		<tui-bottom-popup backgroundColor="#202020" z-index="1002" :height="450" :show="datePopup"
			@close="closeDatePopup">
			<view class="sort-box">
				<view class="sort-title">发布日期</view>
				<tui-radio-group :value="date" @change="onClickDate">
					<tui-label v-for="(item,index) in dateOptions" :key="index">
						<tui-list-cell>
							<view class="thorui-align__center sort-item">
								<view class="sort-label">{{item.name}}</view>
								<tui-radio :value="item.value" color="#D018F5" borderColor="#c5c9d1">
								</tui-radio>
							</view>
						</tui-list-cell>
					</tui-label>
				</tui-radio-group>
			</view>
		</tui-bottom-popup>
	</view>
</template>

<script>
	import Sidebar from '@/components/Sidebar/index.vue'
	import CustomTabbar from '@/components/custom-tabbar.vue'
	import Surplus from "@/components/Surplus/index.vue"
	import Empty from "@/pages/search/components/empty.vue";
	import list from "./components/list.vue"
	import {
		apiGetArticleCategories,
		apiGetArticleList,
	} from '@/common/api/content.js'
	import { useUserStore } from '@/store/user'

	export default {
		components: {
			Sidebar,
			CustomTabbar,
			Surplus,
			list,
			Empty
		},
		data() {
			return {
				listData: [], // 数据
				total: 0,
				isRefreshing: false,
				category_id: '',
				categories: [],

				current: 0,
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

				order: 'new',
				orderPopup: false,
				orderOptions: [{
						name: '受欢迎',
						value: 'hot',
					},
					{
						name: '新发布',
						value: 'new',
					},
				],

				date: 'month',
				datePopup: false,
				dateOptions: [{
						name: '今日',
						value: 'today',
					},
					{
						name: '本周',
						value: 'week',
					},
					{
						name: '最近30天',
						value: 'month',
					}
				]
			}
		},
		computed: {
			userStore() {
			  return useUserStore()
			},
			isLogin() {
			  return this.userStore.isLogin
			},
			dateName() {
				return this.dateOptions.filter(item => item.value == this.date)[0].name
			},
			orderName() {
				return this.orderOptions.filter(item => item.value == this.order)[0].name
			},
		},
		onShow() {
			uni.$on('showCenterPopup', this.showCenterPopup);
		},
		onHide() {
			uni.$off('showCenterPopup', this.showCenterPopup);
		},
		created() {
			this.fetchCategories();
		},
		methods: {
			handleTabChange(){

			},
			// 打开侧边栏
			onClick() {
				this.$refs.sidebarRef && this.$refs.sidebarRef.open()
			},
			bannerChange: function(e) {
				this.current = e.detail.current;
			},

			//切换tab，逻辑请自行处理
			onClickCategories(e) {
				this.category_id = e.item.id
				this.refreshList()
			},

			// 排序方式
			onClickOrder(item) {
				this.order = item.detail.value;
				this.closeOrderPopup();
				this.refreshList()
			},
			closeOrderPopup() {
				this.orderPopup = false
			},

			// 发布日期
			onClickDate(item) {
				this.date = item.detail.value;
				this.closeDatePopup();
				this.refreshList()
			},
			closeDatePopup() {
				this.datePopup = false
			},

			toPath: function(path) {
				uni.navigateTo({
					url: path
				})
			},

			fetchCategories() {
				apiGetArticleCategories().then(res => {
					if (res.code === 0) {
						this.categories = res.data
						this.categories.unshift({
							id: '',
							name: '推荐'
						});
					}
				});
				this.getList();
			},
			
			getList() {
				apiGetArticleList({
					category_id: this.category_id,
					order: this.order,
					date: this.date,
					page: 1,
					limit: 10
				}).then(res => {
					let data = res.data;
					this.total = data.total;
					this.listData = data.list;
					this.isRefreshing = false;
				}).catch(() => {
					this.isRefreshing = false;
				})
			},	
			// 刷新列表
			refreshList() {
				this.listData = [] // 先置空列表,显示加载进度
				setTimeout(() => {
					this.getList()
				}, 120)
			},
			onRefresh() {
				this.isRefreshing = true;
				setTimeout(() => {
					this.getList();
				}, 100);
			},
		}
	}
</script>

<style lang="scss">
	.article_home {
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

			.right {
				display: flex;
				gap: 20rpx;

				.avatar {
					width: 64rpx;
					height: 64rpx;
					border-radius: 50%;
					background: linear-gradient(0deg, #D018F5 0%, #FA3296 100%);
				}
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