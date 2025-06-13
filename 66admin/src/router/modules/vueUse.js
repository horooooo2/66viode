/** When your routing table is too long, you can split it into small modules */

import Layout from "@/layout"

export default {
  path: "/vueUse",
  component: Layout,
  redirect: "/vueUse/component",
  alwaysShow: true, // will always show the root menu
  name: "vueUse",
  meta: {
    title: "vueUse学习",
    icon: "personnel"
  },
  children: [
    {
      path: "/vueUse/component",
      redirect: "/component/createReusableTemplate",
      name: "component",
      meta: { title: "component", icon: "example" },
      children: [
        {
          path: "/component/createReusableTemplate",
          component: () => import("@/views/vue-use/component/createReusableTemplate.vue"),
          name: "createReusableTemplate",
          meta: { title: "createReusableT", icon: "star" }
        }

      ]
    }
  ]
}
