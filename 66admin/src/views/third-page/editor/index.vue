<script setup>
import { ref } from "vue"
import Editor from "../components/Editor.vue"

const detail = ref({})

detail.value = "富文本编辑器测试输入"
// 创建成功
function onSuccess() {
  console.log("onSuccess")
}
</script>

<template>
  <div class="container">
    <Editor
      :detail="detail"
      @on-success="onSuccess"
    />
  </div>
</template>
