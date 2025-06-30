<script setup>
import { ElMessage, ElMessageBox } from "element-plus"
import { onMounted, ref } from "vue"

import { useRouter } from "vue-router"
import { getAdmintorList } from "@/api/api"
import {  Refresh, Search } from "@element-plus/icons-vue"
import addDialog from "./components/addDialog.vue"
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

const goInfo = (row)=>{
  router.push({ path: `/user/info`, query: row });
}

</script>

<template>
  <div class="home-box">
    
    <el-card>
        <el-form v-show="showSearch" :inline="true" :model="searchForm">
          <el-form-item label="用户名">
            <el-input v-model="searchForm.id"  placeholder="请输入" />
          </el-form-item>
          <el-form-item label="上级用户">
            <el-input v-model="searchForm.id"  placeholder="请输入" />
          </el-form-item>
          <el-form-item label="状态" style="width: 180px;">
              <el-select v-model="searchForm.role" placeholder="请选择" clearable>
                <el-option value="" :label="'全部'">全部</el-option>
                  <!-- <el-option
                      v-for="item in roleList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                  /> -->
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

    <right-toolbar
      v-model:show-search="showSearch"
      @query-table="getListData"
      @on-add-click="onShowClick"
    />
      <el-table
        v-loading="loading"
        :data="tableData"
        element-loading-text="加载中..."
        border
      >
        <el-table-column prop="id" label="用户名" />
        <el-table-column prop="id" label="上级用户" />
        <el-table-column prop="id" label="昵称" />
        <el-table-column prop="id" label="VIP" />
        <el-table-column prop="id" label="SVIP" />
        <el-table-column label="余额" prop="count" width="180" />
        <el-table-column label="状态" width="110">
          <template #default="{ row }">
            <span>{{ row.is_lock == "1" ? "冻结" : "正常" }}</span>
          </template>
        </el-table-column>
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
            <el-button
              v-auth="'/adminAuth/look'"
              type="primary"
              size="small"
              @click="goInfo(row)"
            >
             查看
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

    <addDialog v-model:dialogVisible="showDialog"  v-model:datas="rowData" @getListData="getListData" />

  </div>
</template>

<style lang="scss" scoped>
.home-box {
  
}
</style>
