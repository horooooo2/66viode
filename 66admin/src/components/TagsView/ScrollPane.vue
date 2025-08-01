<script setup>
import { ref,nextTick,defineProps } from 'vue'
import {useRoute} from 'vue-router'
import { useRouteListener } from "@/hooks/useRouteListener"
// import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue"

const props = defineProps({
  tagRefs:{
    default: []
  }
})

const route = useRoute()


const { listenerRouteChange } = useRouteListener()

/** 滚动条组件元素的引用 */
const scrollbarRef = ref()

/** 滚动条内容元素的引用 */
const scrollbarContentRef = ref()

/** 当前滚动条距离左边的距离 */
let currentScrollLeft = 0

/** 每次滚动距离 */
const translateDistance = 200

/** 滚动时触发 */
function scroll(scrollLeft) {
  currentScrollLeft = scrollLeft.scrollLeft
}

/** 鼠标滚轮滚动时触发 */
function wheelScroll(deltaY) {
  if (deltaY.deltaY.toString().startsWith("-")) {
    scrollTo("left")
  } else {
    scrollTo("right")
  }
}

/** 获取可能需要的宽度 */
function getWidth() {
  // 可滚动内容的长度
  const scrollbarContentRefWidth = scrollbarContentRef.value.clientWidth
  // 滚动可视区宽度
  const scrollbarRefWidth = scrollbarRef.value.wrapRef.clientWidth
  // 最后剩余可滚动的宽度
  const lastDistance = scrollbarContentRefWidth - scrollbarRefWidth - currentScrollLeft
  return { scrollbarContentRefWidth, scrollbarRefWidth, lastDistance }
}

/** 左右滚动 */
function scrollTo(direction, distance = translateDistance) {
  let scrollLeft = 0
  const { scrollbarContentRefWidth, scrollbarRefWidth, lastDistance } = getWidth()
  // 没有横向滚动条，直接结束
  if (scrollbarRefWidth > scrollbarContentRefWidth) return
  if (direction === "left") {
    scrollLeft = Math.max(0, currentScrollLeft - distance)
  } else {
    scrollLeft = Math.min(currentScrollLeft + distance, currentScrollLeft + lastDistance)
  }
  scrollbarRef.value.setScrollLeft(scrollLeft)
}

/** 移动到目标位置 */
function moveTo() {
  const tagRefs = props.tagRefs
  for (let i = 0; i < tagRefs.length; i++) {
    if (route.path === tagRefs[i].$props.to.path) {
      const el = tagRefs[i].$el
      const offsetWidth = el.offsetWidth
      const offsetLeft = el.offsetLeft
      const { scrollbarRefWidth } = getWidth()
      // 当前 tag 在可视区域左边时
      if (offsetLeft < currentScrollLeft) {
        const distance = currentScrollLeft - offsetLeft
        scrollTo("left", distance)
        return
      }
      // 当前 tag 在可视区域右边时
      const width = scrollbarRefWidth + currentScrollLeft - offsetWidth
      if (offsetLeft > width) {
        const distance = offsetLeft - width
        scrollTo("right", distance)
        return
      }
    }
  }
}

// 监听路由变化，移动到目标位置
listenerRouteChange(() => {
  nextTick(moveTo)
})
</script>

<template>
  <div class="scroll-container">
    <el-tooltip content="向左滚动标签">
      <el-icon class="arrow left" @click="scrollTo('left')">
        <ArrowLeft />
      </el-icon>
    </el-tooltip>
    <el-scrollbar ref="scrollbarRef" @wheel.passive="wheelScroll" @scroll="scroll">
      <div ref="scrollbarContentRef" class="scrollbar-content">
        <slot />
      </div>
    </el-scrollbar>
    <el-tooltip content="向右滚动标签">
      <el-icon class="arrow right" @click="scrollTo('right')">
        <ArrowRight />
      </el-icon>
    </el-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.scroll-container {
  height: 100%;
  user-select: none;
  display: flex;
  justify-content: space-between;
  .arrow {
    width: 40px;
    height: 100%;
    font-size: 18px;
    cursor: pointer;
    &.left {
      box-shadow: 5px 0 5px -6px var(--el-border-color-darker);
    }
    &.right {
      box-shadow: -5px 0 5px -6px var(--el-border-color-darker);
    }
  }
  .el-scrollbar {
    flex: 1;
    // 防止换行（超出宽度时，显示滚动条）
    white-space: nowrap;
    .scrollbar-content {
      display: inline-block;
    }
  }
}
</style>
