import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import './assets/element-#F56C6C/index.css'


axios.defaults.baseURL='http://localhost:3000/'


Vue.use(ElementUI);
Vue.prototype.$ajax = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
