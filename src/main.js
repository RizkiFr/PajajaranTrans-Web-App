import Vue from 'vue'
import './plugins/axios'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VueSession from 'vue-session'
import * as LocationPicker from 'vue2-location-picker'
import axios from 'axios'
import store from './store'

Vue.use(LocationPicker, {
    installComponents: false, // If true, create it globally
})
Vue.use(VueSession)
Vue.config.productionTip = false

axios.defaults.headers.common['Authorization'] = 'Bearer '+sessionStorage.getItem('access_token');

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
