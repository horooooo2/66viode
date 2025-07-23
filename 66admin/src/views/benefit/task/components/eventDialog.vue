<template>
  <!-- 新增/修改 -->
  <el-dialog
     v-model="isShow"
     v-if="isShow"
     :title="formData?.id === undefined ? '新增' : '编辑'"
     width="40%"
     @closed="closeFun"
     align-center
   >
     <el-form ref="formRef" :model="formData"  :rules="rules" label-width="auto" label-position="right">
       <el-form-item prop="username" label="事件类型" >
          <el-input v-model="formData.username" placeholder="请输入" />
       </el-form-item>
       <el-form-item prop="sort" label="排序" >
          <el-input v-model="formData.sort" placeholder="请输入" />
       </el-form-item>
       <el-form-item prop="status" label="状态" >
            <el-select v-model="formData.status" placeholder="请选择" clearable>
              <el-option label="启用" :value="1" /> 
              <el-option label="禁用" :value="2" /> 
                  <!-- <el-option
                      v-for="item in roleList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                  /> -->
            </el-select>
       </el-form-item>
     </el-form>
     <template #footer>
       <el-button @click="closeFun()">
         取消
       </el-button>
       <el-button type="primary" :loading="loading" @click="handleCreateOrUpdate(formRef)">
         确认
       </el-button>
     </template>
   </el-dialog>
</template>

<script setup>
import {ref,watchEffect,reactive } from 'vue';
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
const formRef  = ref(null);

const rules = reactive({
 username: [
   { required: true, message: '请输入用户名', trigger: 'blur' },
 ],
})

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

const handleCreateOrUpdate = async(formEl)=>{
  
   console.log('formData===',formData);
   if (!formEl) return
   loading.value = true;
   let checkForm =  await formEl.validate((valid) => valid);
   if( !checkForm ){
     loading.value = false;
     return;
   }
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
   formRef?.value?.resetFields();
   // formData.value = {...resetData};
}

</script>

<style lang="scss" scoped>

</style>