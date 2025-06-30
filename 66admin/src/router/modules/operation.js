/** When your routing table is too long, you can split it into small modules */
import layout from "@/layout"
export default {
  path: "/operation",
  component: layout,
  redirect: "/operation/adList",
  alwaysShow: true, // will always show the root menu
  name: "operation",
  meta: {
    title: "运营管理",
    icon: "article"
  },
  children: [
    {
      path: "/operation/adList",
      component: () => import("@/views/operation/adList/index.vue"),
      name: "adList",
      meta: { title: "广告列表", icon: "article-ranking" }
    },
    {
      path: "/operation/user-permission",
      component: () => import("@/views/operation/user-permission/index.vue"),
      name: "user-permission",
      meta: { title: "普通用户权限", icon: "article-ranking" }
    },
    {
      path: "/operation/vip-permission",
      component: () => import("@/views/operation/vip-permission/index.vue"),
      name: "vip-permission",
      meta: { title: "vip用户权限", icon: "article-ranking" }
    },
    {
      path: "/operation/notify",
      component: () => import("@/views/operation/notify/index.vue"),
      name: "notify",
      meta: { title: "消息通知", icon: "article-ranking" }
    },
    {
      path: "/operation/remark",
      component: () => import("@/views/operation/remark/index.vue"),
      name: "remark",
      meta: { title: "评论列表", icon: "article-ranking" }
    },
    {
      path: "/operation/nickname",
      component: () => import("@/views/operation/nickname/index.vue"),
      name: "nickname",
      meta: { title: "昵称列表", icon: "article-ranking" }
    },
    {
      path: "/operation/content",
      name: "content",
      redirect: "/content/label",
      meta: { title: "内容管理", icon: "article-ranking" },
      children: [
        {
          path: "/content/label",
          component: () => import("@/views/operation/content/label/index.vue"),
          name: "content-label",
          meta: { title: "标签列表", icon: "article-ranking" }
        },
        {
          path: "/content/article",
          component: () => import("@/views/operation/content/article/index.vue"),
          name: "content-article",
          meta: { title: "文章列表", icon: "article-ranking" }
        },
        {
          path: "/content/video",
          component: () => import("@/views/operation/content/video/index.vue"),
          name: "content-video",
          meta: { title: "视频列表", icon: "article-ranking" }
        },
        {
          path: "/content/image",
          component: () => import("@/views/operation/content/image/index.vue"),
          name: "content-image",
          meta: { title: "图片列表", icon: "article-ranking" }
        },
        {
          path: "/content/novel",
          component: () => import("@/views/operation/content/novel/index.vue"),
          name: "content-novel",
          meta: { title: "小说列表", icon: "article-ranking" }
        },
      ]
    }

  ]
}
