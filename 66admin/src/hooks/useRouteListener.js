
import mitt from "mitt"
import {onBeforeUnmount} from 'vue'
const emitter = mitt()

const key = Symbol("ROUTE_CHANGE")

let latestRoute= null

/** 设置最新的路由信息，触发路由变化事件 */
export function setRouteChange(to) {
  // 触发事件
  emitter.emit(key, to)
  // 缓存最新的路由信息
  latestRoute = to
}

/**
 * @name 订阅路由变化 Composable
 * @description 1. 单独用 watch 监听路由会浪费渲染性能
 * @description 2. 可优先选择使用该发布订阅模式去进行分发管理
 */
export function useRouteListener() {
  // 回调函数集合
  const callbackList= []

  // 监听路由变化（可以选择立即执行）
  const listenerRouteChange = (callback, immediate = false) => {
    // 缓存回调函数
    callbackList.push(callback)
    // 监听事件
    emitter.on(key, callback)
    // 可以选择立即执行一次回调函数
    immediate && latestRoute && callback(latestRoute)
  }

  // 移除路由变化事件监听器
  const removeRouteListener = (callback) => {
    emitter.off(key, callback)
  }

  // 组件销毁前移除监听器
  onBeforeUnmount(() => {
    callbackList.forEach(removeRouteListener)
  })

  return { listenerRouteChange, removeRouteListener }
}
