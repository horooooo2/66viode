import { createApp } from "vue"
// 分页组件
import Pagination from "@/components/Pagination"
// 自定义表格工具组件
import RightToolbar from "@/components/RightToolbar"

// svg组件
import svgIcon from "@/components/SvgIcon/index.vue"

// directives
import installDirective from "@/directives"
// filter
import installFilter from "@/filters"

// import axios from '@/utils/axios'
// app.config.globalProperties.$axios = axios // 使用globalProperties挂载

import App from "./App.vue"
// element
import installElementPlus from "./plugins/element"
import router from "./router"

import store from "./store"
// 导入权限控制模块
import "./permission"
import "@/styles/index.scss"

const app = createApp(App)
installElementPlus(app)
installDirective(app)
installFilter(app)
// 全局组件挂载
app.component("RightToolbar", RightToolbar)
app.component("Pagination", Pagination)
app.component("svg-icon", svgIcon)

app.use(store)
  .use(router)
  .mount("#app")
