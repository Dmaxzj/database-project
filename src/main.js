import $ from 'jquery/dist/jquery.min.js'
import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import router from './router'
import axios from 'axios'

Vue.prototype.$http = axios

Vue.use(BootstrapVue);



new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
