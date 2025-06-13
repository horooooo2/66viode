<script setup>
import screenfull from "screenfull"
import { onMounted, onUnmounted, ref } from "vue"

// 是否全屏
const isFullscreen = ref(false)

// 监听变化
function change() {
  isFullscreen.value = screenfull.isFullscreen
}

// 切换事件
function onToggle() {
  screenfull.toggle()
}

// 设置侦听器
onMounted(() => {
  screenfull.on("change", change)
})

// 删除侦听器
onUnmounted(() => {
  screenfull.off("change", change)
})
</script>

<template>
  <div>
    <svg-icon
      id="guide-full"
      :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="onToggle"
    />
  </div>
</template>

<style lang="scss" scoped></style>
