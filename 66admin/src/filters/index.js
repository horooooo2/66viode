import dayjs from "dayjs"

// val：毫秒级时间戳
function dateFilter(val, format = "YYYY-MM-DD") {
  if (!isNaN(val)) {
    val = Number.parseInt(val)
  }

  return dayjs(val).format(format)
}

export default (app) => {
  app.config.globalProperties.$filters = {
    dateFilter
  }
}
