/** When your routing table is too long, you can split it into small modules */
import layout from "@/layout"
export default {
  path: "/benefit",
  component: layout,
  redirect: "/benefit/inviteFriends",
  alwaysShow: true, // will always show the root menu
  name: "benefit",
  meta: { title: "福利管理", icon: "article" },
  children: [
    {
      path: "/benefit/inviteFriends",
      name: "inviteFriends",
      redirect: "/inviteFriends/record",
      meta: { title: "邀请好友", icon: "article-ranking" },
      children: [
        {
          path: "/inviteFriends/reward",
          component: () => import("@/views/benefit/inviteFriends/reward.vue"),
          name: "inviteFriends_reward",
          meta: { title: "邀请奖励", icon: "role" }
        },
        {
          path: "/inviteFriends/record",
          component: () => import("@/views/benefit/inviteFriends/record.vue"),
          name: "inviteFriends_record",
          meta: { title: "邀请记录", icon: "role" }
        },
      ]
    },
    {
      path: "/benefit/pointsMall",
      name: "pointsMall",
      redirect: "/pointsMall/goods",
      meta: { title: "积分商城", icon: "article-ranking" },
      children: [
        {
          path: "/pointsMall/goods",
          component: () => import("@/views/benefit/pointsMall/goods.vue"),
          name: "pointsMall_goods",
          meta: { title: "积分商品", icon: "role" }
        },
        {
          path: "/pointsMall/exchange",
          component: () => import("@/views/benefit/pointsMall/exchange.vue"),
          name: "pointsMall_exchange",
          meta: { title: "积分兑换", icon: "role" }
        },
      ]
    },
    {
      path: "/benefit/task",
      name: "task",
      redirect: "/task/group",
      meta: { title: "任务管理", icon: "article-ranking" },
      children: [
        {
          path: "/task/group",
          component: () => import("@/views/benefit/task/group.vue"),
          name: "task_group",
          meta: { title: "任务分组", icon: "role" }
        },
        {
          path: "/task/label",
          component: () => import("@/views/benefit/task/label.vue"),
          name: "task_label",
          meta: { title: "任务标签", icon: "role" }
        },
        {
          path: "/task/list",
          component: () => import("@/views/benefit/task/list.vue"),
          name: "task_list",
          meta: { title: "任务列表", icon: "role" }
        },
        {
          path: "/task/active",
          component: () => import("@/views/benefit/task/active.vue"),
          name: "task_active",
          meta: { title: "任务活跃", icon: "role" }
        },
        {
          path: "/task/apply",
          component: () => import("@/views/benefit/task/apply.vue"),
          name: "task_apply",
          meta: { title: "申请记录", icon: "role" }
        },
        {
          path: "/task/give",
          component: () => import("@/views/benefit/task/give.vue"),
          name: "task_give",
          meta: { title: "发放记录", icon: "role" }
        },
        {
          path: "/task/event",
          component: () => import("@/views/benefit/task/event.vue"),
          name: "task_event",
          meta: { title: "事件类型", icon: "role" }
        },
      ]
    }

  ]
}
