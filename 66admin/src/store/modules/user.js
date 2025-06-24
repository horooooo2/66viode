import { ElMessage } from "element-plus"
import { getPermission, login } from "@/api/api"
import { TOKEN, USERINFO } from "@/constant"
import router, { resetRouter } from "@/router"
import { setTimeStamp } from "@/utils/auth"
import { formatPermissionList } from "@/utils/index"
import { getItem, removeAllItem, setItem } from "@/utils/storage"
import { cloneDeep } from 'lodash'

export default {
  namespaced: true,
  state: () => ({
    // token的初始值从storage里取
    token: getItem(TOKEN) || "",
    userInfo: getItem(USERINFO) || {},
    roles: [],
    permissionTree: [], // 总权限树
    eidtPermissionTree: [], //编辑树
    buttons: []
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      setItem(USERINFO, userInfo)
    },
    setRoles: (state, roles) => {
      state.roles = roles
    },
    setButtons: (state, buttons) => {
      state.buttons = buttons
    },
    setTree: (state, tree) => {
      state.permissionTree = tree;
      state.eidtPermissionTree = cloneDeep(tree)
    },
  },
  actions: {
    login(context, userInfo) {
      const { username, password, captcha_code, code_key } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password,
          captcha_code,
          code_key
        })
          .then((data) => {
            this.commit("user/setToken", data.obj.sys_token)
            this.commit("user/setUserInfo", data.obj)
            // 保存登录时间
            setTimeStamp()
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
        // 本地模拟数据
        // console.log("----模拟【登录】接口数据,真实数据需要填写constant.js里的接口域名------")
        // const loginData =import.meta.glob('@/api/loginData.json', { eager: true })
        // let obj = loginData['/src/api/loginData.json'].default
        // this.commit('user/setToken', obj.sys_token)
        // this.commit('user/setUserInfo', obj)
        // // 保存登录时间
        // setTimeStamp()
        // resolve()
      })
    },
    getPermissionData(context) {
      return new Promise((resolve, reject) => {
        getPermission()
          .then((data) => {
            const obj = formatPermissionList(data.obj)
            const role_arr = obj.role_arr// 菜单权限
            const button_arr = obj.button_arr// button权限
            const info = {
              roles: role_arr
            }
            if (role_arr.length == 0) {
              ElMessage.error("您登录的账号暂无权限！") // 提示错误信息
              this.dispatch("user/logout")
            }
            this.commit("user/setTree",data.obj);
            this.commit("user/setRoles", role_arr)
            this.commit("user/setButtons", button_arr)
            resolve(info)
          })
          .catch((err) => {

          })
      })
    },
    logout() {
      resetRouter()
      this.commit("user/setToken", "")
      this.commit("user/setUserInfo", {})
      this.commit("user/setRoles", [])
      this.commit("user/setButtons", [])
      this.commit("app/removeTagsView", {
        type: "all"
      })
      removeAllItem()
      router.push("/login")
    }
  }
}
