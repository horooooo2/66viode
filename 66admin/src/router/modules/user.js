/** When your routing table is too long, you can split it into small modules */
import layout from "@/layout"
export default {
  path: "/user",
  component: layout,
  redirect: "/user/list",
  alwaysShow: true, // will always show the root menu
  name: "userManage",
  meta: {
    title: "用户管理",
    icon: "article"
  },
  children: [
    {
      path: "/user/list",
      component: () => import("@/views/user/list/index.vue"),
      name: "userList",  
      meta: {title: "用户列表", icon: "article-ranking" }
    },
    {
      path: "/user/balance",
      component: () => import("@/views/user/balance/index.vue"),
      name: "userBalance",
      meta: { title: "余额流水", icon: "article-ranking" }
    },
    {
      path: "/user/info",
      component: () => import("@/views/user/list/info.vue"),
      name: "userInfo",
      meta: { title: "用户列表-查看", icon: "article-ranking" },
      hidden: true// true不显示在侧边栏
    }

  ]
}
