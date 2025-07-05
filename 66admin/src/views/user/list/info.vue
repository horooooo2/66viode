<script setup>
import { ElMessage, ElMessageBox } from "element-plus"
import { onMounted, ref, watch } from "vue"

import { useRouter,useRoute } from "vue-router"
import { getAdmintorList } from "@/api/api"
import {  Refresh, Search } from "@element-plus/icons-vue"
import adminDialog from "./components/adminDialog.vue"
import adminResetDialog from "./components/adminResetDialog.vue"
const router = useRouter();
const route = useRoute();

const showSearch = ref(true)
const showDialog = ref(false)
const showResetDialog = ref(false)
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
  getListData();
  console.log('route==',route.query);
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
  if( row ){
    rowData.value = row;
  }
}


</script>


<template>
  <div class="home-box user_info">
    
    <el-card>
      <div class="u_title">
        基本信息
      </div>
      <el-divider />

      <div class="u_title">
        可更改
      </div>

      <el-row :gutter="21">
        <el-col :span="7">
          <span>登录密码：
            <el-button type="primary" link >重置</el-button>
          </span>
        </el-col>
        <el-col :span="7">
          <span>登录密码：
            <el-button type="primary" link >重置</el-button>
          </span>
        </el-col>
        <el-col :span="7">
          <span>登录密码：
            <el-button type="primary" link >重置</el-button>
          </span>
        </el-col>
        <el-col :span="7">
          <span>登录密码：
            <el-button type="primary" link >重置</el-button>
          </span>
        </el-col>

      </el-row>
      <el-button type="primary" >返回</el-button>

    </el-card>
    <!-- <el-card>
      <template #header>可更改</template>
      
    </el-card> -->

    <adminDialog v-model:dialogVisible="showDialog"  v-model:datas="rowData" @getListData="getListData" />
    <adminResetDialog v-model:dialogVisible="showResetDialog"  v-model:datas="rowData" @getListData="getListData" />

  </div>
</template>

<style lang="scss" scoped>
.u_title{
  margin-bottom: 20px;
}
.user_info{
  ::v-deep .el-row .el-col{
    margin-bottom: 20px;
  }
}
</style>
