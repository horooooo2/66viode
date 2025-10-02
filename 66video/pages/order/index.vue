<template>
  <view class="order">
    <!-- 列表数据 -->
    <scroll-view
      scroll-y
      :refresher-enabled="true"
      :refresher-triggered="isRefreshing"
      @refresherrefresh="onRefresh"
      @scrolltolower="loadMore"
      style="height: 100vh"
    >
      <NavBar title="订单记录"></NavBar>

      <list :list="listData"></list>
      <Empty v-if="listData.length === 0" />

      <!-- 底部加载提示 -->
      <view v-if="hasMore" class="loading">加载中...</view>
      <view v-else class="no-more">没有更多数据了</view>
    </scroll-view>
  </view>
</template>

<script>
import NavBar from "@/components/NavBar/index.vue";
import Empty from "@/pages/search/components/empty.vue";
import list from "./components/list.vue";
import { apiOrderList } from "@/common/api/goods.js";

export default {
  components: { NavBar, list, Empty },
  data() {
    return {
      listData: [],
      isRefreshing: false,
      page: 1,
      limit: 10,
      hasMore: true,
    };
  },
  onShow() {
    this.refreshList();
  },
  methods: {
    // 下拉刷新
    onRefresh() {
      this.isRefreshing = true;
      this.page = 1;
      this.getList(() => {
        this.isRefreshing = false; // 关闭下拉刷新动画
      });
    },

    // 上拉加载更多
    loadMore() {
      if (this.hasMore) {
        this.page++;
        this.getList();
      }
    },

    // 获取数据
    getList(cb) {
      apiOrderList({ page: this.page, limit: this.limit })
        .then((res) => {
          let data = res.data;
          this.total = data.total;

          if (this.page === 1) {
            this.listData = data.list;
          } else {
            this.listData = this.listData.concat(data.list);
          }

          this.hasMore = this.listData.length < this.total;

          cb && cb();
        })
        .catch(() => {
          cb && cb();
        });
    },

    // 手动刷新
    refreshList() {
      this.page = 1;
      this.hasMore = true;
      this.getList();
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