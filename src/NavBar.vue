<template>
<div>
  <b-navbar toggleable="md" class="top-bar">

  <b-navbar-brand>Title</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

      <b-nav-form>
        <b-form-input size="sm" class="mr-sm-3" type="text" placeholder="Search"/>
        <b-button size="sm" class="my-2 my-sm-2" type="submit" form="??">Search</b-button>
      </b-nav-form>

      <b-nav-item to="/">
        主页
      </b-nav-item>
    <b-navbar-nav right v-if="isLogin">
      <b-nav-item to="/addWork">
        新建
      </b-nav-item>
      <b-nav-item to="/userwork">
        收藏
      </b-nav-item>
      <b-nav-item-dropdown>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>{{userName}}</em>
        </template>
        <b-dropdown-item to="/user">Profile</b-dropdown-item>
        <b-dropdown-item @click="signOut">Signout</b-dropdown-item>
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
import Bus from './Bus'

export default {
  name: "my-nav-bar",
  created: function() {
    Bus.$on("loginSuccess", (userName) => {
      this.userName = userName;
      this.isLogin = true;
    })
  },
  data() {
    return {
      isLogin: false,
      userName: null
    };
  },
  methods: {
    signOut: function() {
      this.isLogin = false;
    }
  }
};
</script>

<style>
li {
  padding: 5px;
}

hr {
  width: 80%;
  border: 1px #c4c4c4 solid;
  margin-top: 0;
  margin-bottom: 20px;
}
</style>