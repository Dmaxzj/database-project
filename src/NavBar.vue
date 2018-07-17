<template>
<div>
  <b-navbar toggleable="md" class="top-bar">

  <b-navbar-brand>Welcome</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

      <b-nav-form>
        <b-input-group>
          <b-form-input  type="text" placeholder="搜索" v-model="searchKey"/>
          <b-input-group-append>
            <b-button style="z-index: 0"  type="submit" form="??" @click="searchByKey">搜索</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-nav-form>

      <b-nav-item to="/works" @click="toHome">
        主页
      </b-nav-item>
    <b-navbar-nav right v-if="getLoginState">
      <b-nav-item to="/addWork">
        新建
      </b-nav-item>
      <b-nav-item to="/userworks" @click="toUserworks">
        收藏
      </b-nav-item>
      <b-nav-item-dropdown>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>{{getUsername}}</em>
        </template>
        <b-dropdown-item to="/user">用户信息</b-dropdown-item>
        <b-dropdown-item @click="signOut">退出</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
      <b-navbar-nav right v-else>
        <b-nav-item to="login">
          登陆
        </b-nav-item>
        <b-nav-item to="register">
          注册
        </b-nav-item>
      </b-navbar-nav>
        
    </b-navbar-nav>

  </b-collapse>
</b-navbar>
<hr>
</div>
</template>

<script>
import Bus from "./Bus";

export default {
  name: "my-nav-bar",
  data() {
    return {
      isLogin: false,
      userName: null,
      searchKey: ''
    };
  },
  computed: {
    getLoginState: function() {
      return this.$root.isLogin;
    },
    getUsername: function() {
      return this.$root.username;
    }
  },
  methods: {
    signOut: function() {
      this.$http.post("api/user/logout").then(
        respones => {
          Bus.$emit('logout');
          this.$router.push("/works");
        },
        respones => {
          this.$router.push("/works");
        }
      );
    },
    searchByKey: function() {
      if (this.searchKey !== '') {
        this.$router.push('/search?key=' + this.searchKey);
        Bus.$emit('selectData', 'search');
      }
    },
    toHome: function() {
      Bus.$emit('selectData', 'home');
    },
    toUserworks: function() {
      Bus.$emit('selectData', 'likes');
    }
  }
};
</script>

<style>
li {
  padding: 5px;
}

hr {
  height: 1px;
  width: 80%;
  background-color: #c4c4c4;
  margin-top: 0;
  margin-bottom: 40px;
}

.card {
  margin: auto;
  width: 50%;
}

.navbar-brand {
  width: 100px;
  height: 100px;
  border-right: 2px solid rgb(200, 200, 200);
  border-bottom: 2px solid rgb(200, 200, 200);
  box-shadow: 5px 5px 10px rgb(200, 200, 200);
  padding-top: 30px;
  padding-right: 5px;
  border-radius: 50%;
}
</style>