<template>
   <!-- 新增/修改 -->
   <el-dialog
      v-model="isShow"
      v-if="isShow"
      :title="formData?.id === undefined ? '新增用户' : '修改用户'"
      width="40%"
      @closed="closeFun"
      align-center
    >
      <el-form ref="formRef" :model="formData"  label-width="auto" label-position="right">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="formData.username" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="权限" class="treeFormItem">
          <el-tree
            ref="treeRef"
            :data="store.state.user.eidtPermissionTree"
            :props="{
              children: 'children',
              label: 'name',
            }"
            show-checkbox
            node-key="id"
            :default-expand-all="true"
            :default-checked-keys="formData.permissions"
          ></el-tree>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="isShow = false">
          取消
        </el-button>
        <el-button type="primary" :loading="loading" @click="handleCreateOrUpdate">
          确认
        </el-button>
      </template>
    </el-dialog>
</template>

<script setup>
import {ref,watchEffect} from 'vue';
import {addAdmintor} from '@/api/admin'
import { ElMessage } from "element-plus"
import { useStore } from "vuex"
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false
  },
  datas: {
    type: Object,
    default: null
  },
})
const emit = defineEmits(["update:datas","getListData"]);
const isShow = ref(false);
const store = useStore();
const treeRef = ref(null);

const resetData = {
    username:'',
    password:'',
    permissions:[],
}
const formData = ref({...resetData});

watchEffect(() => {
  isShow.value = props.dialogVisible;
  console.log('props.datas===',props.datas);
  console.log('store===',store);
  if( props.datas?.id ){
    formData.value = Object.assign( formData.value,props.datas )
  }
});


const loading = ref(false);

const handleCreateOrUpdate = ()=>{
    loading.value = true;
    console.log('formData===',formData);
    console.log('tree===',treeRef.value.getCheckedKeys());
    
    
    // addAdmintor(formData.value).then(res=>{
    //     loading.value = false;
    //     if(res.code == 200){    
    //         ElMessage.success("删除成功");
    //         closeFun();
    //         emit("getListData");
    //     }
    // })
}
const closeFun = ()=>{
    console.log('closeFun',resetData);
  
    emit("update:datas", null);
    emit("update:dialogVisible", false);
    formData.value = {...resetData};
}

</script>

<style lang="scss" scoped>
  .treeFormItem{
    max-height: 500px;
    overflow: auto;
  }
</style>