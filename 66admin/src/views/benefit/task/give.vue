<script setup>
import { ElMessage, ElMessageBox } from "element-plus"
import { onMounted, ref, watch } from "vue"

import { useRouter } from "vue-router"
import { getAdmintorList } from "@/api/api"
import {  Refresh, Search } from "@element-plus/icons-vue"
import roleDialog from "./components/roleDialog.vue"
const router = useRouter()

const showSearch = ref(true)
const showDialog = ref(false)
const rowData = ref(null)

// 数据源
const searchForm = ref({
  id: 0,
  account: "",
  role: "",
  date: "",
  page: 1,
  page_size: 10
})

const tableData = ref([])
const total = ref(0)
const loading = ref(false)

onMounted(() => {
  getListData()
})

/**
 * 获取账号列表
 */
async function getListData(data) {
  loading.value = true
  console.log('data.value==',data);
  console.log('searchForm.value==',searchForm.value);
  await getAdmintorList(searchForm.value)
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
 * 编辑按钮点击事件
 */
function onShowClick(row) {
  showDialog.value = true;
  // rowData.value = row;
  if( row ){
    rowData.value = {
      id: 1,
      username: '测试权限',
      permissions:['1-1',2,3]
    }
  }
}


function searchEvent() {
  console.log(searchForm.value)
  searchForm.value.page = 1
  getListData()
}


function resetSearch() {
    //   searchFormRef.value?.resetFields()
    //   handleSearch()
    searchForm.value = {
            id: 0,
            account: "",
            role: "",
            date: "",
            page: 1,
            page_size: 10
    }
    // getListData()

}

</script>

<template>
  <div class="home-box">
    
    <el-card>
        <el-form v-show="showSearch" :inline="true" :model="searchForm">
          <el-form-item label="任务简称">
            <el-input v-model="searchForm.id"  placeholder="请输入" />
          </el-form-item>
          <el-form-item label="记录ID">
            <el-input v-model="searchForm.id"  placeholder="请输入" />
          </el-form-item>
          <el-form-item label="状态" style="width: 220px;">
              <el-select v-model="searchForm.role" placeholder="请选择" clearable>
                  <!-- <el-option
                      v-for="item in roleList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                  /> -->
              </el-select>
          </el-form-item>
          <el-form-item label="类型" style="width: 220px;">
              <el-select v-model="searchForm.role" placeholder="请选择" clearable>
              </el-select>
          </el-form-item>
          <el-form-item label="任务活跃" style="width: 220px;">
              <el-select v-model="searchForm.role" placeholder="请选择" clearable>
              </el-select>
          </el-form-item>
          <el-form-item>
              <el-button
              v-auth="'/adminAuth/list'"
              type="primary"
              style="margin-left: -16px"
              :icon="Search"
              @click="searchEvent"
              >
              搜索
              </el-button>
              <el-button :icon="Refresh" @click="resetSearch">
                  重置
              </el-button>
          </el-form-item>
        </el-form>

      <el-table
        v-loading="loading"
        :data="tableData"
        element-loading-text="加载中..."
        border
      >
        <el-table-column prop="time" label="申请时间" width="180" />
        <el-table-column prop="id" label="用户名" width="180" />
        <el-table-column prop="account" label="类型" width="180" />
        <el-table-column label="奖励" prop="count" width="180" />
        <el-table-column label="状态" width="110">
          <template #default="{ row }">
            <span>{{ row.is_lock == "1" ? "冻结" : "正常" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="count" width="180" />
        <el-table-column prop="date" label="操作时间" width="160" />
        <el-table-column prop="address" label="操作" min-width="180">
          <template #default="{ row }">
            <el-button
              v-auth="'/adminAuth/look'"
              type="primary"
              size="small"
              @click="onShowClick(row)"
            >
              编辑
            </el-button>

          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <pagination
        v-show="total > 0"
        v-model:page="searchForm.page"
        v-model:limit="searchForm.page_size"
        :total="total"
        @pagination="getListData"
      />
    </el-card>

    <roleDialog v-model:dialogVisible="showDialog"  v-model:datas="rowData" @getListData="getListData" />

  </div>
</template>

<style lang="scss" scoped>
.home-box {
  
}
</style>
