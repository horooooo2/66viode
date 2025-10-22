<template>
	<view class="article_home">
		<scroll-view scroll-y :refresher-enabled="true" :refresher-triggered="isRefreshing"
			@refresherrefresh="onRefresh" @scrolltolower="loadMore" style="height: 100vh">
			<view class="status_bar"></view>
			<view class="appbox">
				<image src="/static/images/app.png" mode="widthFix"></image>
			</view>
			<Sidebar ref="sidebarRef"></Sidebar>
			<view class="header">
				<view class="logo" @click="onClick">
					<image class="avatarUrl" src="/static/images/left-menu-icon.png"
						style="width: 20px;height: 20px;" />66 Video
				</view>
				<view v-if="isLogin" class="right">
					<Surplus></Surplus>
					<view class="avatar" @click="toPath('/pages/user/index')">
						<image class="avatarUrl" mode="aspectFill"
							:src="userInfo.avatar || '/static/images/mine/avatar.png'" />
					</view>
				</view>
				<view v-else class="button">
					<view class="login" @click="toPath('/pages/login/index?type=1')">登录</view>
					<view class="register" @click="toPath('/pages/login/index?type=2')">注册</view>
				</view>
			</view>

			<view class="search">
				<input class="input" type="text" placeholder="搜索视频关键词" @click="toPath('/pages/search/index')" />
			</view>

			<tui-tab sliderHeight="0" backgroundColor="transparent" color="#BBB" selectedColor="#D018F5" bold
				:tabs="categories" scroll @change="onClickCategories"></tui-tab>

			<view class="tui-banner-swiper">
				<swiper class="tui-banner__height" @change="bannerChange" circular :indicator-dots="false" autoplay
					:interval="4000" :duration="150">
					<block v-for="(item,index) in background" :key="index">
						<swiper-item style="border-radius: 10px;overflow: hidden;">
							<image class="swiper-img" :src="item.img" />
						</swiper-item>
					</block>
				</swiper>
			</view>

			<view class="filter">
				<view class="filter-box" @click="orderPopup = true">
					<view class="label">排序方式：</view>
					<view class="value">{{ orderName }}</view>
					<image class="icon" src="/static/images/index/icon_close.png" />
				</view>
				<view class="filter-box" @click="datePopup = true">
					<view class="label">发布日期：</view>
					<view class="value">{{ dateName }}</view>
					<image class="icon" src="/static/images/index/icon_close.png" />
				</view>
			</view>

			<!-- 数据列表 -->
			<list :list="listData"></list>
			<div v-if="listData.length === 0">
				<Empty />
			</div>


			<!-- 底部加载提示 -->
			<view v-if="hasMore" class="loading">加载中...</view>
			<view v-else class="no-more">没有更多数据了</view>

			<custom-tabbar :current="2" @change="handleTabChange"></custom-tabbar>
		</scroll-view>

		<!-- 排序弹窗 -->
		<tui-bottom-popup backgroundColor="#202020" z-index="1002" :height="350" :show="orderPopup"
			@close="closeOrderPopup">
			<view class="sort-box">
				<view class="sort-title">排序方式</view>
				<tui-radio-group :value="order" @change="onClickOrder">
					<tui-label v-for="(item,index) in orderOptions" :key="index">
						<tui-list-cell>
							<view class="thorui-align__center sort-item">
								<view class="sort-label">{{item.name}}</view>
								<tui-radio :value="item.value" color="#D018F5" borderColor="#c5c9d1" />
							</view>
						</tui-list-cell>
					</tui-label>
				</tui-radio-group>
			</view>
		</tui-bottom-popup>

		<!-- 日期弹窗 -->
		<tui-bottom-popup backgroundColor="#202020" z-index="1002" :show="datePopup" @close="closeDatePopup">
			<view class="sort-box" :class="{ 'with-picker': showPicker }">

				<view class="header">
					<view class="title">发布日期</view>
					<view class="close">
						<view class="btn" @click.stop="clearAll">清除全部</view>
						<image src="/static/images/index/close.png" mode="" @click="closeDatePopup"></image>
					</view>
				</view>
				<view class="date-header" @click="showPicker = !showPicker">
					<view class="title"> <text>日期：</text>{{ displayDate }}</view>
					<image src="/static/images/index/icon-down.png" mode=""></image>
				</view>
				<view class="date-radio-group">
					<view class="date-radio active" v-for="(item,index) in dateOptions" :key="index">
						{{ item.name }}
					</view>
				</view>

				<DatePicker v-if="showPicker" :value="selectedDate" @confirm="onDateConfirm"
					@cancel="showPicker = false" />
			</view>



		</tui-bottom-popup>



	</view>
</template>

<script>
	import {
		apiGetUserInfo
	} from '@/common/api/user.js'
	import Sidebar from '@/components/Sidebar/index.vue'
	import CustomTabbar from '@/components/custom-tabbar.vue'
	import Surplus from "@/components/Surplus/index.vue"
	import Empty from "@/pages/search/components/empty.vue"
	import list from "./components/list.vue"
	import {
		apiGetArticleCategories,
		apiGetArticleList
	} from '@/common/api/content.js'
	import {
		useUserStore
	} from '@/store/user'
	import DatePicker from './components/DatePicker.vue'

	export default {
		components: {
			Sidebar,
			CustomTabbar,
			Surplus,
			list,
			Empty,
			DatePicker
		},
		data() {
			return {
				showPicker: false,
				selectedDate: '2024-05-31',
				page: 1,
				limit: 10,
				hasMore: true,
				listData: [],
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
				userInfo: '',
				orderPopup: false,
				orderOptions: [{
						name: '受欢迎',
						value: 'hot'
					},
					{
						name: '新发布',
						value: 'new'
					}
				],

				date: 'month',
				datePopup: false,
				dateOptions: [{
						name: '今日',
						value: 'today'
					},
					{
						name: '本周',
						value: 'week'
					},
					{
						name: '最近30天',
						value: 'month'
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
				return this.dateOptions.find(item => item.value == this.date).name
			},
			orderName() {
				return this.orderOptions.find(item => item.value == this.order).name
			},
			displayDate() {
				return this.selectedDate || '请选择日期'
			}
		},
		onShow() {
			uni.$on('showCenterPopup', this.showCenterPopup)
			this.fetchCategories()
			if (this.isLogin) {
				this.getUserInfo()
			}
		},
		onHide() {
			uni.$off('showCenterPopup', this.showCenterPopup)
		},
		methods: {
			onDateConfirm(date) {
				console.log('确认选择:', date)
				this.selectedDate = date
				this.showPicker = false
			},
			clearAll() {
				// 清除：设为空或设成默认
				this.startDate = ''
				this.endDate = ''
			},
			closeDatePopup() {
				this.datePopup = false
				this.pickerVisible = false
			},
			handleTabChange() {},
			async getUserInfo() {
				const {
					data
				} = await apiGetUserInfo()
				this.userInfo = data
			},
			onClick() {
				this.$refs.sidebarRef && this.$refs.sidebarRef.open()
			},
			bannerChange(e) {
				this.current = e.detail.current
			},

			// 切换分类
			onClickCategories(e) {
				this.category_id = e.item.id
				this.refreshList()
			},

			// 排序
			onClickOrder(item) {
				this.order = item.detail.value
				this.closeOrderPopup()
				this.refreshList()
			},
			closeOrderPopup() {
				this.orderPopup = false
			},

			// 日期
			onClickDate(item) {
				this.date = item.detail.value
				this.closeDatePopup()
				this.refreshList()
			},
			closeDatePopup() {
				this.datePopup = false
			},

			toPath(path) {
				uni.navigateTo({
					url: path
				})
			},

			// 分类数据
			fetchCategories() {
				apiGetArticleCategories().then(res => {
					if (res.code === 0) {
						this.categories = [{
							id: '',
							name: '推荐'
						}, ...res.data]
					}
					this.getList()
				})
			},

			// 列表数据
			getList(cb) {
				apiGetArticleList({
						category_id: this.category_id,
						order: this.order,
						date: this.date,
						page: this.page,
						limit: this.limit
					})
					.then(res => {
						let data = res.data
						this.total = data.total

						if (this.page === 1) {
							this.listData = data.list
						} else {
							this.listData = this.listData.concat(data.list)
						}

						this.hasMore = this.listData.length < this.total
						this.isRefreshing = false
						cb && cb()
					})
					.catch(() => {
						this.isRefreshing = false
						cb && cb()
					})
			},

			// 下拉刷新
			onRefresh() {
				this.isRefreshing = true
				this.page = 1
				this.hasMore = true
				this.getList(() => {
					this.isRefreshing = false
				})
			},

			// 上拉加载
			loadMore() {
				if (this.hasMore) {
					this.page++
					this.getList()
				}
			},

			// 手动刷新
			refreshList() {
				this.page = 1
				this.hasMore = true
				this.listData = []
				this.getList()
			}
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

		.appbox {
			width: 100%;
			margin-bottom: 10rpx;

			uni-image {
				width: 100%;
				display: block;
			}
		}

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
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					margin-right: 10px;
				}
			}

			.right {
				display: flex;
				gap: 20rpx;

				.avatar {
					width: 64rpx;
					height: 64rpx;
					border-radius: 50%;
					background: linear-gradient(0deg, #D018F5 0%, #FA3296 100%);

					.avatarUrl {
						width: 100%;
						height: 100%;
						display: block;
						border-radius: 50%;
					}
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

			.with-picker {
				padding-bottom: 320rpx;
			}



			.header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0;

				.title {
					color: #fff;
					font-size: 32rpx;
				}

				.close {
					display: flex;
					align-items: center;

					.btn {
						color: rgba(255, 26, 140, 1);
						font-size: 32rpx;
					}

					image {
						width: 48rpx;
						height: 48rpx;
						margin-left: 20rpx;
					}
				}
			}

			.date-header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-radius: 16rpx;
				background: #333;
				padding: 8rpx 12rpx;
				margin-bottom: 40rpx;

				.title {
					color: #fff;
					font-weight: 400;

					text {
						margin-right: 8rpx;
					}
				}

				image {
					width: 48rpx;
					height: 48rpx;
				}
			}

			.date-radio-group {
				display: flex;
				align-items: center;

				.date-radio {
					border-radius: 20rpx;
					border: 2rpx solid #F4F5F7;
					padding: 8rpx 20rpx;
					color: #F4F5F7;
					margin-right: 24rpx;

					&:last-child {
						margin-right: 0;
					}

					&.active {
						color: #FF1A8C;
						border: 2rpx solid #FF1A8C;
					}
				}
			}

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
<style scoped>
	body {
		overflow: hidden !important;
	}
</style>