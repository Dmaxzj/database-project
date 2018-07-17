<template>
	<b-card
		  id="register-card"
		  bg-variant="light"
          header="注册界面"
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
        <b-form-group label="重复密码："
                    label-text-align="left">
				<b-form-input type="password"
						          v-model="vpassword"
                      maxlength="20"
                      required
                      placeholder="确认密码">
				</b-form-input>
			</b-form-group>
      <b-form-group label="邮箱："
                    label-text-align="left">
				<b-form-input type="email"
						          v-model="email"
                      maxlength="20"
                      required
                      placeholder="输入邮箱">
				</b-form-input>
      </b-form-group>
				<b-button @click="reset" size="lg" class="reset-btn">重置</b-button>
				<b-button @click="regist" :variant="'primary'" size="lg" class="register-btn">注册</b-button>			
    </b-form>
	</b-card>
</template>

<script>
import Bus from './Bus.js'

export default {
	data: function() {
		return {
			err: null,
			username: '',
			vpassword: '',
			password: '',
			email: ''
		}
	},
	methods: {
		regist() {
			this.err = null;
			if (!(this.username && this.password && this.vpassword && this.email)) {
				this.err = "信息不能为空"
				return;
			}
			if (this.vpassword != this.password) {
				this.err = "两次密码不一样";
				return;
			}
			this.$http.post('api/user/register', {
				username: this.username,
				password: this.password,
				email: this.email
			}).then(response => {
				if (response.data.status == true) {
					Bus.$emit('loginSuccess', this.username);
					this.$router.push('/user');
				} else if (response.data.errorMessages) {
					Bus.$emit('showErr', response.data.errorMessages)
				} 
			}, error => {
				Bus.$emit("showErr", error.response.data.errorMessages);
			})
		},
		reset() {
			this.err = null;
			this.username=this.vpassword=this.password=this.email='';
		}
	}
}

</script>

<style type="text/css">
#register-card {
	position: relative;
	margin-top: 50px;
	width: 30%;
	min-width: 400px;
	font-size: 16pt;
}

#register-card .card-header {
	font-weight: bold;
}

#register-card p {
	height: 30px;
	font-size: 15pt;
	width: 100%;
}

#register-card .card-body {
	padding-top: 5px;
	padding-bottom: 60px;
}

#register-card .reset-btn {
	position: absolute;
	left: 1.25rem;
	background-color: inherit;
	border: 0;
	color: black;
	box-shadow: inherit;
}

#register-card .reset-btn:hover
 {
	color: rgb(150,150,150);
}

#register-card .register-btn {
	width: 8rem;
	position: absolute;
	right: 1.25rem;
}



</style>