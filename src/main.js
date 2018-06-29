import $ from 'jquery/dist/jquery.min.js'
import Vue from 'vue'
import Bus from './Bus.js'
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
  data: function() {
    return {
      isLogin: false,
      username: null,
      userid: null
    }
  },
  created: function() {
    Bus.$on('logout', () => {
      this.isLogin = false;
      this.username = null;
      this.userid = null;
    })
    Bus.$on("loginSuccess", obj => {
      this.userName = obj.username;
      this.userid = obj.userid;
      this.isLogin = true;
    });
  },
  render: h => h(App)
})
