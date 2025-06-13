<script setup>
import { ElMessage } from "element-plus"

import { onMounted, ref } from "vue"
import { getRoleList } from "@/api/api"
import DistributePermission from "./components/distributePermission.vue"

const showSearch = ref(true)

onMounted(() => {
  getListData()
})

// 数据源
const searchForm = ref({
  id: 0,
  name: "",
  date: "",
  page: 1,
  page_size: 10
})

const tableData = ref([])
const total = ref(0)
const loading = ref(false)
/**
 * 获取角色列表
 */
async function getListData() {
  loading.value = true

  await getRoleList(searchForm.value)
    .then((data) => {
      setTimeout(() => {
        tableData.value = data.obj
        total.value = Number(data.page_info.total_items)
        loading.value = false
      }, 1000)
    })
    .catch(() => {
      loading.value = false
    })
}

/**
 * 分配权限
 */
const distributePermissionVisible = ref(false)
const selectRoleId = ref("")
function handleEdit(row) {
  selectRoleId.value = row.id
  distributePermissionVisible.value = true
}

function searchEvent() {
  searchForm.value.page = 1
  getListData()
}
function onDownTemplate() {
  ElMessage.error("演示模式")
}
</script>

<script>
export default {
  name: "GetRoleList"
}
</script>

<template>
  <div class="home-box">
    <el-form v-show="showSearch" :inline="true" :model="searchForm">
      <el-form-item label="角色ID" prop="id">
        <el-input-number v-model="searchForm.id" controls-position="right" :min="0" />
      </el-form-item>
      <el-form-item label="角色名称">
        <el-input v-model="searchForm.name" placeholder="角色名称" clearable />
      </el-form-item>
      <el-form-item label="操作时间" style="width: 308px;">
        <el-date-picker
          v-model="searchForm.date"
          value-format="YYYY-MM-DD"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          v-auth="'/adminAuth/getRoleList'"
          type="primary"
          style="margin-left: -16px"
          @click="searchEvent"
        >
          查询
        </el-button>
      </el-form-item>
    </el-form>

    <right-toolbar
      v-model:show-search="showSearch" :have-import="false" @query-table="getListData"
      @on-out-click="onDownTemplate"
      @on-add-click="onDownTemplate"
    />
    <el-card>
      <el-table
        v-loading="loading"
        :data="tableData"
        element-loading-text="加载中..."
        border
      >
        <el-table-column prop="id" label="角色ID" width="180" />
        <el-table-column prop="name" label="角色名称" width="180" />

        <el-table-column label="操作时间" min-width="160">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.operator, 'YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>

        <el-table-column prop="address" label="操作" min-width="160">
          <template #default="{ row }">
            <el-button
              v-auth="'/adminAuth/setting'"
              type="primary"
              size="small"
              @click="handleEdit(row)"
            >
              配置权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total > 0"
        v-model:page="searchForm.page"
        v-model:limit="searchForm.page_size"
        :total="total"
        @pagination="getListData"
      />
    </el-card>

    <DistributePermission
      v-model="distributePermissionVisible"
      :role-id="selectRoleId"
    />
  </div>
</template>

<style lang="scss" scoped>
.home-box {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  ::v-deep .el-tag {
    margin-right: 6px;
  }
  .pagination {
    display: flex;
    justify-content: end;
    margin-top: 20px;
  }
}
</style>
