<template>
	<view class="order">
		<!-- 列表数据 -->
		<mescroll-body ref="mescrollRef" :bottombar='false' :safearea="true" @init="mescrollInit" @down="downCallback"
			:up="upOption" @up="upCallback" @emptyclick="emptyClick">
			<NavBar title="订单记录"></NavBar>

			<list :list="listData" @refreshList='refreshList'></list>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import NavBar from '@/components/NavBar/index.vue'
	import list from "./components/list.vue"
	import {
		apiOrderList
	} from '@/common/api/goods.js'
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			NavBar,
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
				listData: [],
			}
		},
		computed: {},
		onShow() {
			this.canReset && this.refreshList()
			this.canReset = false
		},
		methods: {
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				//联网加载数据
				apiOrderList({
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
		}
	}
</script>

<style lang="scss" scoped>
	.order {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		display: flex;
		flex-direction: column;


	}
</style>