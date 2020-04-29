import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueTouch from 'vue-touch'
import '@/assets/js/rem.js'
import '@/assets/css/reset.css'

Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.use(VueTouch, {
  name: 'v-touch'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
