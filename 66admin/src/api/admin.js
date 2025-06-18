import axios from "@/utils/axios"
/**
 * 新增管理员
 * @param params
 */
export function addAdmintor(params) {
  return axios({
    url: "/api/addAdmin",
    method: "post",
    data: params
  })
}
