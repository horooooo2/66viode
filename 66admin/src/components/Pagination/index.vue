<script>
import { scrollTo } from "@/utils/scroll-to"

export default {
  name: "Pagination",
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    },
    // 移动端页码按钮的数量端默认值5
    pagerCount: {
      type: Number,
      default: document.body.clientWidth < 992 ? 5 : 7
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit("update:page", val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit("update:limit", val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      if (this.currentPage * val > this.total) {
        this.currentPage = 1
      }
      this.$emit('update:page', this.currentPage);
      this.$emit('update:limit', val);
      this.$emit("pagination", { page: this.currentPage, limit: val })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    handleCurrentChange(val) {
      this.$emit('update:page', val);
      this.$emit('update:limit', this.pageSize);
      this.$emit("pagination", { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    }
  }
}
</script>

<template>
  <div :class="{ hidden }" class="pagination-container">
    <!-- v-model:current-page="currentPage"
      v-model:page-size="pageSize" -->
    <el-pagination
      :background="background"
      :layout="layout"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :pager-count="pagerCount"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped>
  .pagination-container {
  padding: 32px 16px;
  background: #fff;
}
.pagination-container.hidden {
  display: none;
}
</style>
