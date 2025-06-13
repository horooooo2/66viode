import {onBeforeMount, onMounted,onBeforeUnmount,} from 'vue'
import { useStore } from "vuex"


/** 参考 Bootstrap 的响应式设计将最大移动端宽度设置为 992 */
const MAX_MOBILE_WIDTH = 992

/**
 * @name 浏览器宽度变化 Composable
 * @description 根据浏览器宽度变化，变换 Layout 布局
 */
export function useResize() {
    const appStore = useStore()

  // 用于判断当前设备是否为移动端
  const isMobile = () => {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < MAX_MOBILE_WIDTH
  }

  // 用于处理窗口大小变化事件
  const resizeHandler = () => {
    if (!document.hidden) {
      const _isMobile = isMobile()
      appStore.commit('app/setSidebarOpened',!_isMobile)
    }
  }

  // 在组件挂载前添加窗口大小变化事件监听器
  onBeforeMount(() => {
    window.addEventListener("resize", resizeHandler)
  })

  // 在组件挂载后根据窗口大小判断设备类型并调整布局
//   onMounted(() => {
//     if (isMobile()) {
//         appStore.commit('app/setSidebarOpened',!isMobile())
//     }
//   })

  // 在组件卸载前移除窗口大小变化事件监听器
  onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeHandler)
  })
}
