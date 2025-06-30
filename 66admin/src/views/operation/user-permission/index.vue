<script setup>
import { ElMessage, ElMessageBox } from "element-plus"
import { onMounted, ref,reactive } from "vue"
import { getAdmintorList } from "@/api/api"

const initParams = {
  url: "",
};

const myForm = ref({...initParams})
const formRef = ref();
const rules = reactive({
  url: [
    { required: true, message: '请输入链接地址', trigger: 'blur' },
  ],
})

const loading = ref(false)

onMounted(() => {
  getListData()
})

async function getListData(data) {
  loading.value = true
  console.log('myForm.value==',myForm.value);
  await getAdmintorList(myForm.value)
    .then((data) => {
      setTimeout(() => {
        myForm.value.url = data.obj[0].account;
        initParams.url = data.obj[0].account;
        loading.value = false
      }, 1000)
    })
    .catch(() => {
      loading.value = false
    })
}

const submitForm = async (formEl)=>{
  if (!formEl) return
  loading.value = true
  let checkForm =  await formEl.validate((valid) => valid);
  if( !checkForm ){
    loading.value = false;
    return;
  }
  //提交
}

function resetForm(formEl) {
  if (!formEl) return
  formEl.resetFields()
  myForm.value = {...initParams}
}
</script>

<template>
  <div>
    <el-card>
      <template #header>基本信息</template>
      <el-form
        :loading="loading"
        ref="formRef"
        style="max-width: 600px"
        :model="myForm"
        :rules="rules"
        label-width="auto"
      >
        <el-form-item label="动漫观看次数" prop="url">
          <el-input v-model="myForm.url" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="影视观看次数" prop="url">
          <el-input v-model="myForm.url" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="小说阅读次数" prop="url">
          <el-input v-model="myForm.url" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="吃瓜阅读次数" prop="url">
          <el-input v-model="myForm.url" placeholder="请输入"/>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" @click="submitForm(formRef)">提交</el-button>
          <el-button  @click="resetForm(formRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>

</style>
