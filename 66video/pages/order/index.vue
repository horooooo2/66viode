<template>
  <view class="order">
    <!-- 列表数据 -->

    <scroll-view
      scroll-y
      :refresher-enabled="true"
      :refresher-triggered="isRefreshing"
      @refresherrefresh="onRefresh"
    >
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
import { apiOrderList } from "@/common/api/goods.js";
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
    };
  },
  computed: {},
  onShow() {
    this.canReset && this.refreshList();
    this.canReset = false;
  },
  created() {
    this.getList();
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
        page: 1,
        limit: 10,
      })
        .then((res) => {
          let data = res.data;
          this.listData =  data.list; //追加新数据
          this.isRefreshing = false;
        })
        .catch(() => {
          this.isRefreshing = false;
        });
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