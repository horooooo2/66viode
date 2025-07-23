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
     <el-form ref="formRef" :model="formData"  :rules="rules" label-width="auto" label-position="right">
       <el-form-item prop="username" label="商品名称" >
         <el-input v-model="formData.username" placeholder="请输入" />
       </el-form-item>
       <el-form-item prop="username" label="商品价格" >
         <el-input v-model="formData.username" placeholder="请输入" />
       </el-form-item>
       <el-form-item prop="username" label="商品描述" >
         <el-input v-model="formData.username" placeholder="请输入" />
       </el-form-item>
       <el-form-item prop="username" label="库存" >
         <el-input v-model="formData.username" placeholder="请输入" />
       </el-form-item>
       <el-form-item prop="username" label="类型" >
         <el-select v-model="formData.role" placeholder="请选择" clearable>
            <el-option value="" label="全部">全部</el-option>
                  <!-- <el-option
                      v-for="item in roleList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                  /> -->
          </el-select>
       </el-form-item>
       <el-form-item prop="username" label="电脑端" >
        <el-upload
            v-model:file-list="fileList"
            class="uploader"
            :before-upload="beforeAvatarUpload"
            :limit="1"
          >
            <el-button type="default"><el-icon><Upload /></el-icon>上传文件</el-button>
            <template #tip>
              <div class="el-upload__tip">
                支持拓展名：.png .jpg .jpeg
              </div>
            </template>
          </el-upload>
      </el-form-item>
      <el-form-item prop="username" label="移动端" >
        <el-upload
            v-model:file-list="fileList"
            class="uploader"
            :before-upload="beforeAvatarUpload"
            :limit="1"
          >
            <el-button type="default"><el-icon><Upload /></el-icon>上传文件</el-button>
            <template #tip>
              <div class="el-upload__tip">
                支持拓展名：.png .jpg .jpeg
              </div>
            </template>
          </el-upload>
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
const treeRef = ref(null);
const formRef  = ref(null);

const rules = reactive({
 username: [
   { required: true, message: '请输入用户名', trigger: 'blur' },
 ],
})

const fileList = ref([]);

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
   console.log('tree===',treeRef.value.getCheckedKeys());
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


 //图片上传
 const beforeAvatarUpload = file => {
      const isJPG = /\/(jpg|jpeg|png|gif|GIF|JPG|PNG|svg|SVG)$/.test(file.type)
      const isLt10M = file.size / 1024 / 1024 < 10

      if (!isJPG) {
        ElMessage.error(`格式错误, jpg、jpeg、png、gif、svg!`)
        return
      }
      if (!isLt10M) {
        ElMessage.error(`文件大小不能超过10MB!`)
        return
      }
      
      
      var reader = new FileReader()
      reader.readAsDataURL(file) // 读取文件作为URL可访问地址
      reader.onload = function() {
        // fileImg.value = reader.result
        fileList.value = [{
          name: file.name,
          url: reader.result
        }]
      }

      return false
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