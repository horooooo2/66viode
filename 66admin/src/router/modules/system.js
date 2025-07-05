/** When your routing table is too long, you can split it into small modules */
import layout from "@/layout"
export default {
  path: "/system",
  component: layout,
  redirect: "/system/url-list",
  alwaysShow: true, // will always show the root menu
  name: "system",
  meta: {
    title: "系统管理",
    icon: "article"
  },
  children: [
    {
      path: "/system/url-list",
      component: () => import("@/views/system/url-list/index.vue"),
      name: "url-list",
      meta: {
        title: "域名列表",
        icon: "article-ranking"
      }
    },
    {
      path: "/system/version",
      component: () => import("@/views/system/version/index.vue"),
      name: "version",
      meta: {
        title: "版本支持",
        icon: "article-ranking"
      }
    },
    {
      path: "/system/translate",
      component: () => import("@/views/system/translate/index.vue"),
      name: "translate",
      meta: {
        title: "翻译支持",
        icon: "article-ranking"
      }
    },
    {
      path: "/system/kf",
      component: () => import("@/views/system/kf/index.vue"),
      name: "systemKF",
      meta: {
        title: "网页客服",
        icon: "article-ranking"
      }
    }
  ]
}
