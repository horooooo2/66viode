<script setup>
import { ElMessage, ElMessageBox } from "element-plus"
import { onMounted, ref, watch } from "vue"

import { useRouter } from "vue-router"
import { getAdmintorList } from "@/api/api"
import {  Refresh, Search } from "@element-plus/icons-vue"
const router = useRouter()

const showSearch = ref(true)

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
const roleList = ref([])

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

}

/**
 * 删除按钮点击事件
 */
const onRemoveClick = async(row)=> {
//   ElMessageBox.confirm(
//     `确定要删除${row.account}吗`,
//     { type: "warning" }
//   ).then(async () => {
//     // await deleteUser(row._id)
//     ElMessage.success("删除成功")
//     // 重新渲染数据
//     await getListData()
//   })
// await deleteUser(row._id)
ElMessage.success("删除成功")
    // 重新渲染数据
    await getListData()
}



function searchEvent() {
  console.log(searchForm.value)
  searchForm.value.page = 1
  getListData()
}


function approveFun() {
  console.log('通过666');
  
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

    <right-toolbar
      v-model:show-search="showSearch"
      :haveAdd="false"
      @query-table="getListData"
    >
      <template #toolbarBtn>
        <el-col :span="1.5">
            <el-button
              type="primary"
              @click="approveFun"
            >
              一键通过
            </el-button>
        </el-col>
      </template>
    </right-toolbar>
      <el-table
        v-loading="loading"
        :data="tableData"
        element-loading-text="加载中..."
        border
      >
        <el-table-column prop="id" label="申请时间" width="180" />
        <el-table-column prop="account" label="用户名" width="180" />
        <el-table-column  label="类型" width="110">
          <template #default="{ row }">
            <span>{{ row.is_lock == "1" ? "冻结" : "正常" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="活跃" width="180" />
        <el-table-column prop="count" label="奖励" width="180" />
        <el-table-column  label="状态" width="110">
          <template #default="{ row }">
            <span>{{ row.is_lock == "1" ? "冻结" : "正常" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="备注" width="180" />
        <el-table-column prop="date" label="操作时间" width="160" />
        <el-table-column prop="address" label="操作" fixed="right" min-width="180">
          <template #default="{ row }">
            <el-button
              v-auth="'/adminAuth/look'"
              type="primary"
              size="small"
              @click="onShowClick(row)"
            >
              通过
            </el-button>
            <el-popconfirm width="220" :title="`你确定要删除这行内容吗？`" cancel-button-text="取消"
                confirm-button-text="确定"
                icon-color="red"
                @confirm="onRemoveClick(row)"
            >
                <template #reference>
                    <el-button v-auth="'/adminAuth/del'" size="small" type="danger">删除</el-button>
                </template>
            </el-popconfirm>
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

  </div>
</template>

<style lang="scss" scoped>
.home-box {
  
}
</style>
