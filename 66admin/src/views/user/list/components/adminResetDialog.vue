<template>
   <!-- 新增/修改 -->
   <el-dialog
      v-model="isShow"
      :title="'密码重置'"
      width="40%"
      @closed="closeFun"
      align-center
    >
      <el-form ref="formRef" :model="formData"  label-width="auto" label-position="right">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="formData.username" :disabled="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item v-if="datas?.id === undefined" prop="password" label="密码">
          <el-input v-model="formData.password" placeholder="请输入" />
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

const resetData = {
    username:'',
    password:'',
}
const formData = ref({...resetData});

watchEffect(() => {
  isShow.value = props.dialogVisible;
  console.log('props.datas===',props.datas);
  
  if( props.datas?.id ){
    formData.value = Object.assign( formData.value,props.datas )
  }
});


const loading = ref(false);

const handleCreateOrUpdate = ()=>{
    loading.value = true;
    addAdmintor(formData.value).then(res=>{
        loading.value = false;
        if(res.code == 200){    
            ElMessage.success("成功");
            closeFun();
            emit("getListData");
        }
    })
}
const closeFun = ()=>{
    console.log('closeFun',resetData);
  
    emit("update:datas", null);
    emit("update:dialogVisible", false);
    formData.value = {...resetData};
}

</script>

<style lang="scss" scoped>

</style>