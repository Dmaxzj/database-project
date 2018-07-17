<template>
	<b-card id="login-card"
          bg-variant="light"
          header="登陆界面"
          header-text-variant="center">
    <p :class="{'alert-danger': err}">{{err}}</p>
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
				<b-button @click="toRegist" :variant="'link'" class="link-to-register" size="lg">注册</b-button>
				<b-button @click="login" :disabled="hadError" :variant="'primary'" class="login-btn btn-primary" size="lg">登陆</b-button>			
    </b-form>
	</b-card>
</template>

<script>
import Bus from "./Bus.js";

export default {
  data: function() {
    return {
      err: null,
      username: "",
      password: ""
    };
  },
  computed: {
    hadError: function() {
      if (this.username.length < 6 || this.password.length < 6) return true;
      else return false;
    }
  },
  methods: {
    login() {
      this.err = null;
      this.$http.post('api/user/login', {
      	username: this.username,
      	password: this.password
      }).then(response => {
      	if (response.data.status === true) {
      		this.$router.push('/user');
      		Bus.$emit('loginSuccess', {
            username: this.username
          });
      	} else {
      		Bus.$emit('showErr', response.data.errorMessages);
      	}
      }, error => {
      	Bus.$emit("showErr", error.response.data.errorMessages);
      })
    },
    toRegist() {
      this.$router.push("/register");
    }
  }
};
</script>

<style type="text/css">
  #login-card {
	position: relative;
	margin-top: 50px;
	width: 30%;
	min-width: 400px;
	font-size: 16pt;
}

#login-card .card-header {
	font-weight: bold;
}

#login-card p {
	height: 30px;
	font-size: 15pt;
	width: 100%;
}

#login-card .card-body {
	padding-top: 5px;
	padding-bottom: 60px;
}

#login-card .link-to-register {
	position: absolute;
	left: 1.25rem;
}

#login-card .login-btn {
	width: 8rem;
	position: absolute;
	right: 1.25rem;
  transition: all ease-in-out 0.3s 0s;
}

#login-card .disabled {
    background-color: #6c757d;
    border-color: #6c757d;
}
</style>