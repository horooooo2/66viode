<template>
	<view class="entertainment">
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

		<tui-tab sliderHeight="0" backgroundColor="transparent" color="#BBB" selectedColor="#D018F5" bold :tabs="tabs"
			scroll @change="tabChange"></tui-tab>

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
				<view class="value">{{ radioItems.find(item => item.value === sortSelectValue)?.name }}</view>
				<image class="icon" src="/static/images/index/icon_close.png" mode=""></image>
			</view>
			<view class="filter-box" @click="()=>$refs.typePopup.open('bottom')">
				<view class="label">类目：</view>
				<view class="value">{{ typeSelectValue.name }}</view>
				<image class="icon" src="/static/images/index/icon_close.png" mode=""></image>
			</view>
		</view>

		<view class="list">
			<view class="list-item" v-for="val in listData" :key="val.id" @click="goDetail(val)">
				<view class="flag">
					#{{val.category_info.name}}
				</view>
				<image class="poster" :src="val.pc_image" mode=""></image>
				<view class="title">{{val.title}}</view>
			</view>
		</view>
		<Empty v-if="listData.length === 0" class="entertainment_empty"></Empty>

		<tui-bottom-popup backgroundColor="#202020" z-index="1002" :height="450" :show="popupShow" @close="hiddenPopup">
			<view class="sort-box">
				<view class="sort-title">排序方式</view>
				<tui-radio-group @change="sortRadioChange" v-model="sortSelectValue">
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

		
		<uni-popup ref="typePopup" class="typePopup" type="bottom" safe-area background-color="rgb(32, 32, 32)" >
			<view class="sort-box">
				<view class="sort-title">类目</view>
				<div class="type-list">
					<tui-radio-group @change="typeRadioChange" v-model="typeSelectValue.value">
						<tui-label v-for="(item,index) in typeRadioItems[currentTab]" :key="index">
							<tui-list-cell>
								<view class="thorui-align__center sort-item">
									<view class="sort-label">{{item.name}}</view>
									<tui-radio :checked="item.checked" :value="`${item.value}`" color="#D018F5" borderColor="#c5c9d1">
									</tui-radio>
								</view>
							</tui-list-cell>
						</tui-label>
					</tui-radio-group>
				</div>
				
			</view>
		</uni-popup>
		<custom-tabbar :current="2" @change="handleTabChange"></custom-tabbar>
	</view>
</template>

<script>
	import CustomTabbar from '@/components/custom-tabbar.vue'
	import Surplus from "@/components/Surplus/index.vue"
	import Empty from "@/pages/search/components/empty.vue"
	import {
		apiGetVideoCategories,
		apiGetImageCategories,
		apiGetNovelCategories,
		apiGetImageList,
		apiGetVideoList,
		apiGetNovelList
	} from '@/common/api/content.js'
	export default {
		components: {
			CustomTabbar,
			Surplus,
			Empty
		},
		data() {
			return {
				current: 0,
				currentTab: 'image',
				tabs: [{name: '动漫频道',id: 'image'}, {name: '小说频道',id: 'novel'}, {name: '影视频道',id: 'video'}],
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
				sortSelectValue: 'new',
				radioItems: [{
						name: '受欢迎的',
						value: 'hot',
						checked: true
					},
					{
						name: '新品发布',
						value: 'new',
						checked: false
					}
				],
				//选中的类目
				typeSelectValue: {
					parentId: 'image',
					name: '全部',
					value: 'all'
				},
				typeRadioItems: {
					'image': [],
					'novel': [],
					'video': []
				},
				listData: [],
			}
		},
		computed: {
			isLogin() {
				return !!uni.getStorageSync('storage_user_data')?.token
			},
			listParams() {
				return {
					category_id: this.typeSelectValue.value !== 'all' ? this.typeSelectValue.value : '',
					order: this.sortSelectValue,
					page: 1,
					limit: 10
				}
			}
		},
		created() {
			this.fetchCategories();
			this.getList();
		},
		methods: {
			// 打开侧边栏
			onClick() {
				this.$refs.sidebarRef && this.$refs.sidebarRef.open()
			},
			//切换tab，逻辑请自行处理
			tabChange(e) {
				console.log('tabChange==', e);
				this.currentTab = e.item.id;
				//初始化
				this.sortSelectValue = 'new';
				this.typeSelectValue = {
					parentId: this.currentTab,
					name: '全部',
					value: 'all'
				};
				this.getList();
			},
			bannerChange(e) {
				this.current = e.detail.current;
			},

			hiddenPopup() {
				this.popupShow = false
			},
			sortRadioChange(e) {
				if (e.detail.value === this.sortSelectValue) {
					return;
				}
				this.sortSelectValue = e.detail.value;
				this.popupShow = false;
				this.getList();
			},
			typeRadioChange(e) {
				if( e.detail.value === this.typeSelectValue.value ){
					return;
				}
				this.typeSelectValue = {
					parentId: this.currentTab,
					name: this.typeRadioItems[this.currentTab].find(item => item.value === parseInt(e.detail.value))?.name || '全部',
					value: e.detail.value
				};
				this.$refs.typePopup.close();
				this.getList();
			},
			toPath: function(path) {
				uni.navigateTo({
					url: path
				})
			},
			async fetchCategories() {
				apiGetImageCategories().then(res => {
					console.log('image 漫画 categories==', res);
					if (res.code === 0 && res?.data?.length) {
						// this.videoCategories = res.data;
						this.typeRadioItems['image'] = res.data.map(item => ({
							name: item.name,
							value: item.id,
							checked: false
						}));
						this.typeRadioItems['image'].unshift({
							name: '全部',
							value: 'all',
							checked: true
						});
					}
				});
				apiGetVideoCategories().then(res => {
					console.log('video categories==', res);
					if (res.code === 0 && res?.data?.length) {
						this.typeRadioItems['video'] = res.data.map(item => ({
							name: item.name,
							value: item.id,
							checked: false
						}));
						this.typeRadioItems['video'].unshift({
							name: '全部',
							value: 'all',
							checked: true
						});
					}
				});
				apiGetNovelCategories().then(res => {
					console.log('novel 小说 categories==', res);
					if (res.code === 0 && res?.data?.length) {
						this.typeRadioItems['novel'] = res.data.map(item => ({
							name: item.name,
							value: item.id,
							checked: false
						}));
						this.typeRadioItems['novel'].unshift({
							name: '全部',
							value: 'all',
							checked: true
						});
					}
				});
			},
			async getList() {
				console.log('listParams==', this.listParams);
				let res = {};
				if (this.currentTab === 'image') {
					res = await apiGetImageList({ ...this.listParams, loading: true })
				} else if (this.currentTab === 'video') {
					res = await apiGetVideoList({ ...this.listParams, loading: true })
				} else if (this.currentTab === 'novel') {
					res = await apiGetNovelList({ ...this.listParams, loading: true })
				}
				if (res.code === 0) {
					this.listData = res.data.list;
				}
			},
			goDetail(item) {
				console.log('item==', item);
				uni.navigateTo({
					url: `/pages/detail/anime?id=${item.id}&type=${this.currentTab}`
				})
			},
				
		}
	}
</script>

<style lang="scss">
	.entertainment {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		background-image: url("/static/images/index/bg.png");
		background-position: top center;
		background-repeat: no-repeat;
		background-size: cover;
		.entertainment_empty{
			color: #fff;
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

		.list {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 32rpx 16rpx;
			padding: 32rpx 30rpx;
			box-sizing: border-box;
			.list-item {
				position: relative;
				width: 100%;
				border-radius: 16rpx;

				.flag {
					position: absolute;
					top: 8rpx;
					left: 8rpx;
					border-radius: 68rpx;
					background: linear-gradient(295deg, #FA4664 15.68%, #FB6755 84.32%);
					z-index: 1;
					color: #fff;
					font-size: 20rpx;
					font-weight: 400;
					padding: 4rpx 8rpx;
				}

				.poster {
					width: 100%;
					height: 150px;
					border-radius: 8px;
				}

				.title {
					font-size: 26rpx;
					font-weight: 400;
					color: #eee;
					margin-top: 16rpx;
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
		.type-list {
			height: 400rpx;
			overflow-y: auto;
		}
		.typePopup{
			z-index: 99999;
		}
	}
</style>