<script setup>
// 余额流水
import { ElMessage, ElMessageBox } from "element-plus"
import { onMounted, ref } from "vue"
import { getAdmintorList } from "@/api/api"
import {  Refresh, Search } from "@element-plus/icons-vue"

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
 * 获取列表
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
        <el-form  :inline="true" :model="searchForm">
          <el-form-item label="用户名">
            <el-input v-model="searchForm.id"  placeholder="请输入" />
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="searchForm.role" placeholder="请选择" style="width: 160px;" clearable>
                <el-option value="" :label="'全部'">全部</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据来源">
            <el-select v-model="searchForm.role" placeholder="请选择" style="width: 160px;" clearable>
              <el-option value="" :label="'全部'">全部</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="流水号">
            <el-input v-model="searchForm.id"  placeholder="请输入" />
          </el-form-item>
          <el-form-item label="订单号">
            <el-input v-model="searchForm.id"  placeholder="请输入" />
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
        <el-table-column prop="id" label="流水号" width="110" />
        <el-table-column prop="account" label="订单号" />
        <el-table-column label="用户名" prop="count"  />
        <el-table-column label="用户ID" prop="count"  />
        <el-table-column label="类型" width="110">
          <template #default="{ row }">
            <span>{{ row.is_lock == "1" ? "冻结" : "正常" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="积分数量" width="120" />
        <el-table-column prop="date" label="账变前积分数量" width="160" />
        <el-table-column prop="date" label="账变后积分数量" width="160" />
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


  </div>
</template>

<style lang="scss" scoped>
.home-box {
  
}
</style>
