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
  data: function () {
    return {
      isLogin: true,
      username: null,
      userId: null
    }
  },
  created: function () {
    this.$http.get('/api/user').then(response => {
      if (response.data.status == true) {
        this.username = response.data.user.username;
        this.isLogin = true;
      }
    }, error => {

    })
    Bus.$on('logout', () => {
      this.isLogin = false;
      this.username = null;
      this.userId = null;
    })
    Bus.$on("loginSuccess", obj => {
      this.username = obj.username;
      this.userId = obj.userid;
      this.isLogin = true;
    });
  },
  render: h => h(App)
})
