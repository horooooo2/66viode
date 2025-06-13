import copyText from "./common/copyText"
import permission from "./permission"

export default (app) => {
  app.directive("auth", permission)
  app.directive("copyText", copyText)
}
