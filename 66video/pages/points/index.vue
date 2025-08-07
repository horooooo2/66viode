<template>
	<view class="points">
		<!-- 列表数据 -->
		<mescroll-body ref="mescrollRef" :bottombar='false' :safearea="true" @init="mescrollInit" @down="downCallback"
			:up="upOption" @up="upCallback" @emptyclick="emptyClick">
			<view class="status_bar"></view>
			<view class="header">
				<image class="logo" src="/static/images/points/CHIGUALOGO.png" mode="widthFix"></image>
				<view class="right">
					<Surplus></Surplus>
					<view class="avatar"></view>
				</view>
			</view>
			<view class="points-container">
				<view class="point-menus">
					<view class="menus-box">
						<view class="menu-item">
							<image class="icon" src="/static/images/points/icon_cz.png" mode=""></image>
							<text>创作</text>
						</view>
						<view class="menu-item">
							<image class="icon" src="/static/images/points/icon_yqhy.png" mode=""></image>
							<text>邀请好友</text>
						</view>
						<view class="menu-item" @click="toLink('/pages/address/index')">
							<image class="icon" src="/static/images/points/icon_shdz.png" mode=""></image>
							<text>收货地址</text>
						</view>
						<view class="menu-item" @click="toLink('/pages/order/index')">
							<image class="icon" src="/static/images/points/icon_ddjl.png" mode=""></image>
							<text>订单记录</text>
						</view>
					</view>
				</view>
				<view class="point-list">
					<view class="point-title">福利兑换</view>
					<!-- 数据列表 -->
					<list :list="listData" @refreshList='refreshList'></list>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import Surplus from "@/components/Surplus/index.vue"
	import list from "./components/list.vue"
	import {
		apiGoodsList
	} from '@/common/api/goods.js'
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			Surplus,
			list,
		},
		data() {
			return {
				// 分页配置
				upOption: {
					// 首次自动执行
					auto: true,
					// page: {
					// 	size: 10 // 每页数据的数量
					// },
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						tip: '~ 搜索无数据 ~', // 提示
						// btnText: '去看看'
					},
					textNoMore: '没有更多了', // 没有更多数据的提示文本
				},
				listData: [], // 数据
				// 控制onShow事件是否刷新订单列表
				canReset: false,
				total: 0,
			}
		},
		onShow() {
			this.canReset && this.refreshList()
			this.canReset = false
		},
		methods: {
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				//联网加载数据
				apiGoodsList({
					page: page.num,
					limit: page.size,
				}).then(res => {
					let data = res.data;
					let totalPage = data.total;
					this.total = totalPage;
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					this.mescroll.endByPage(data.list.length, totalPage);
					//设置列表数据
					if (page.num == 1) this.listData = []; //如果是第一页需手动制空列表
					this.listData = this.listData.concat(data.list); //追加新数据
				}).catch(() => {
					//联网失败, 结束加载
					this.mescroll.endErr();
				})
			},
			//点击空布局按钮的回调
			emptyClick() {
				uni.showToast({
					title: '点击了按钮,具体逻辑自行实现'
				})
			},
			// 刷新列表
			refreshList() {
				this.listData = [] // 先置空列表,显示加载进度
				setTimeout(() => {
					this.mescroll.resetUpScroll()
				}, 120)
			},
			toLink(url) {
				uni.navigateTo({ url })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.points {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		background-image: url("/static/images/index/bg.png");
		background-position: top center;
		background-repeat: no-repeat;
		background-size: cover;
		display: flex;
		flex-direction: column;

		.header {
			width: 100%;
			height: 100rpx;
			padding: 0 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.logo {
				width: 244rpx;
				height: 28rpx;
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
		}

		.points-container {
			min-height: 0;
			flex: 1;
			width: 100%;
			padding: 24rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;

			.point-menus {
				width: 100%;
				padding: 28rpx 24rpx;
				box-sizing: border-box;
				border-radius: 20rpx;
				background: #202020;
				margin-bottom: 20rpx;

				.menus-box {
					width: 100%;
					display: grid;
					grid-template-columns: repeat(4, 1fr);
					gap: 68rpx;
					border-radius: 20rpx;
					background: #333;
					padding: 26rpx 18rpx;
					box-sizing: border-box;

					.menu-item {
						width: 104rpx;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						gap: 16rpx;

						.icon {
							width: 64rpx;
							height: 64rpx;
						}

						text {
							color: #fff;
							font-size: 26rpx;
						}
					}
				}
			}

			.point-list {
				min-height: 0;
				flex: 1;
				width: 100%;
				display: flex;
				flex-direction: column;
				padding: 0 20rpx 30rpx;
				box-sizing: border-box;
				gap: 8rpx;
				border-radius: 20rpx;
				background: #202020;

				.point-title {
					padding: 22rpx 0;
					box-sizing: border-box;
					color: #ddd;
					font-size: 32rpx;
					font-weight: 500;
					line-height: 36rpx;
					text-align: center;
				}
			}
		}
	}
</style>