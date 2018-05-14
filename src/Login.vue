<template>
	<b-card bg-variant="light"
          header="登陆界面"
          header-text-variant="center">
    <b-form>
			<b-form-group label="用户名："
                    label-text-align="left">
				<b-form-input type="text"
						          v-model="username"
                      maxlength="20"
                      required
                      placeholder="输入用户名">
				</b-form-input>
			</b-form-group>
      <b-form-group label="密码："
                    label-text-align="left">
				<b-form-input type="password"
						          v-model="password"
                      maxlength="20"
                      required
                      placeholder="输入密码">
				</b-form-input>
			</b-form-group>
				<b-button @click="toRegist" size="lg">注册</b-button>
				<b-button @click="login" size="lg">登陆</b-button>			
    </b-form>
	</b-card>
</template>

<script>
import Bus from "./Bus.js";

export default {
  data: function() {
    return {
      err: {},
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      // this.err = {};
      // this.$http.post('/login', {
      // 	username: this.username,
      // 	password: this.password
      // }).then(response => {
      // 	if (response.data.msg == 'success') {
      // 		this.$router.push('/user');
      // 		Bus.$emit('login', this.username);
      // 	} else {
      // 		Bus.$emit('showErr', response.data.msg);
      // 	}
      // }, response => {
      // 	this.$router.push('/');
      // })
      Bus.$emit("loginSuccess", "Jay");
      this.$router.push('/user')
    },
    toRegist() {
      this.$router.push("/register");
    }
  }
};
</script>

<style type="text/css">

</style>