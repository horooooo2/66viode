import ElementPlus from "element-plus"
// import locale from "element-plus/lib/locale/lang/zh-cn"
import locale from "element-plus/es/locale/lang/zh-cn" // Element Plus 中文包
// 注册全部的svg图标
import elementIcons from "@/plugins/svgicon"
import "element-plus/dist/index.css"
import "virtual:svg-icons-register"

export default (app) => {
  app
    .use(ElementPlus, { locale })
    .use(elementIcons) // 全局注册element svg图标
}
