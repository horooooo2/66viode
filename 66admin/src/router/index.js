import {
  createRouter,
  createWebHashHistory
} from "vue-router"
import layout from "@/layout"
import { setRouteChange } from "@/hooks/useRouteListener"
import store from "@/store"
import third from "./modules/third"//富文本
import benefit from "./modules/benefit"//福利
import permissions from "./modules/permissions"//权限
import system from "./modules/system"//系统
import operation from "./modules/operation"//运营
import user from "./modules/user"//用户

/** 私有路由表 */
export const privateRoutes = [
  third,
  permissions,
  benefit,
  system,
  operation,
  user,
]
/**
 * 公开路由表
 */
export const publicRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index")
  },
  {
    path: "/",
    // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
    component: layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/index"),
        meta: { title: "首页", icon: "home", affix: true }, // affix=true,tagViews右侧没有关闭按钮
        hidden: true// true不显示在侧边栏
      },
      {
        path: "/404",
        name: "404",
        component: () => import("@/views/error-page/404")
      },
      {
        path: "/401",
        name: "401",
        component: () => import("@/views/error-page/401")
      }
    ]
  }
  // 测试页面
  // {
  //     path: '/test',
  //     component: () => import('@/views/test-page/test'),
  //
  // },
]

/**
 * 初始化路由表
 */
export function resetRouter() {
  if (store.getters.hasRoles) {
    const menus = store.getters.roles
    // removeRoute是根据路由的name去删除路由的，所以我们要对路由的名字进行截取
    // const menus = ['getRoleList','admintorList','adminAuth']
    // console.log("menus==",menus)
    // console.log("router==",router.getRoutes())
    menus.forEach((menu) => {
      const url = menu.url
      const i = url.lastIndexOf("/")
      const name = url.substring(i + 1, url.length)
      router.removeRoute(name)
    })
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  // routes: [...publicRoutes, ...privateRoutes]
  routes: publicRoutes

})

 // 全局后置钩子
 router.afterEach((to) => {
  setRouteChange(to)
})

export default router
