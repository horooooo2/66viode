import App from './App'
import './common/styles/index.scss'
import { createPinia } from 'pinia'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount();

// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import installDirective from './common/util/directive.js'
export function createApp() {
  const app = createSSRApp(App);
  installDirective(app);
  const pinia = createPinia()
  app.use(pinia)
  return {
    app
  }
}
// #endif