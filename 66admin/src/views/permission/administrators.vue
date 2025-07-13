<script setup>
import { ElMessage, ElMessageBox } from "element-plus"
import { onMounted, ref, watch } from "vue"

import { useRouter } from "vue-router"
import { getAdmintorList, getRoleList } from "@/api/api"
import {  Refresh, Search } from "@element-plus/icons-vue"
import adminDialog from "./components/adminDialog.vue"
import adminResetDialog from "./components/adminResetDialog.vue"
const router = useRouter()

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
const roleList = ref([])

onMounted(() => {
  getListData()
  getRoleData()
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
 * 获取角色列表
 */
async function getRoleData() {
  await getRoleList()
    .then((data) => {
      roleList.value = data.obj
    })
    .catch(() => {

    })
}
/**
 * 编辑按钮点击事件
 */
function onShowClick(row) {
  showDialog.value = true;
  if(row){
    rowData.value = row;
  }

}

function onShowResetClick (row) {
  showResetDialog.value = true;
  rowData.value = row;
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


function onDownTemplate() {
  showDialog.value = true;
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
        <el-form-item label="账号" prop="id">
            <el-input-number v-model="searchForm.id" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="姓名">
            <el-input v-model="searchForm.account" placeholder="姓名" clearable />
        </el-form-item>
        <el-form-item label="角色" style="width: 168px;">
            <el-select v-model="searchForm.role" placeholder="请选择" clearable>
                <el-option
                    v-for="item in roleList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                />
            </el-select>
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
            v-auth="'/adminAuth/list'"
            type="primary"
            style="margin-left: -16px"
            :icon="Search"
            @click="searchEvent"
            >
            查询
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
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="account" label="账号" width="180" />
        <el-table-column label="角色" width="180">
          <template #default="{ row }">
            <el-tag type="danger">
              {{ row.role_name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="110">
          <template #default="{ row }">
            <span>{{ row.is_lock == "1" ? "冻结" : "正常" }}</span>
          </template>
        </el-table-column>
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
            <el-button
              v-auth="'/adminAuth/look'"
              type="primary"
              size="small"
              @click="onShowResetClick(row)"
            >
              密码重置
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

    <adminDialog v-model:dialogVisible="showDialog"  v-model:datas="rowData" @getListData="getListData" />
    <adminResetDialog v-model:dialogVisible="showResetDialog"  v-model:datas="rowData" @getListData="getListData" />

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
  ::v-deep .avatar {
    border-radius: 50%;
    width: 60px;
    height: 60px;
  }
}
</style>
