<template>
	<view class="order">
		<!-- 列表数据 -->

		<scroll-view scroll-y :refresher-enabled="true" :refresher-triggered="isRefreshing"
			@refresherrefresh="onRefresh">
			<NavBar title="订单记录"></NavBar>

			<list :list="listData" @refreshList="refreshList"></list>
			<Empty v-if="listData.length === 0" />
		</scroll-view>
	</view>
</template>

<script>
	import NavBar from "@/components/NavBar/index.vue";
	import Empty from "@/pages/search/components/empty.vue";
	import list from "./components/list.vue";
	import {
		apiOrderList
	} from "@/common/api/goods.js";
	export default {
		components: {
			NavBar,
			list,
			Empty,
		},
		data() {
			return {
				listData: [],
				isRefreshing: false,
				page: 1, // 当前页
				limit: 10, // 每页数量
				hasMore: true, // 是否还有更多
				canReset: true
			};
		},
		computed: {},
		onShow() {
		  this.canReset && this.refreshList();
		  this.canReset = false;
		},
		// 监听页面触底事件
		onReachBottom() {
			if (this.hasMore) {
				this.page++;
				this.getList();
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.refreshList();
		},
		methods: {
			refreshList() {
				this.listData = []; // 先置空列表,显示加载进度
				setTimeout(() => {
					this.getList();
				}, 120);
			},
			onRefresh() {
				this.isRefreshing = true;
				setTimeout(() => {
					this.getList();
				}, 100);
			},
			getList() {
				apiOrderList({
						page: this.page,
						limit: this.limit
					})
					.then((res) => {
						let data = res.data;
						this.total = data.total;

						// 分页累加，而不是直接覆盖
						if (this.page === 1) {
							this.listData = data.list;
						} else {
							this.listData = this.listData.concat(data.list);
						}

						// 判断是否还有更多
						this.hasMore = this.listData.length < this.total;

						this.isRefreshing = false;
						uni.stopPullDownRefresh(); // 停止下拉刷新动画
					})
					.catch(() => {
						this.isRefreshing = false;
						uni.stopPullDownRefresh();
					});
			},
			// 刷新列表（下拉或切换筛选时）
			refreshList() {
				this.page = 1;
				this.hasMore = true;
				this.listData = [];
				this.getList();
			},

			onRefresh() {
				this.refreshList();
			},
		},
	};
</script>

<style lang="scss" scoped>
	.order {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	scroll-view {
		height: 100vh;
	}
</style>