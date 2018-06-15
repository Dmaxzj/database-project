<template>
	<b-card bg-variant="light"
          header="注册界面"
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
				<b-button @click="reset" size="lg">重置</b-button>
				<b-button @click="regist" size="lg">注册</b-button>			
    </b-form>
	</b-card>
</template>

<script>
import Bus from './Bus.js'

export default {
	data: function() {
		return {
			err: {},
			username: '',
			vpassword: '',
			password: '',
			email: ''
		}
	},
	methods: {
		regist() {
			this.err = {};
			if (this.vpassword != this.password) {
				this.err.vpassword = "两次密码不一样";
				return;
			}
			this.$http.post('api/regist', {
				username: this.username,
				password: this.password,
				email: this.email
			}).then(response => {
				if (response.data.msg == 'success') {
					Bus.$emit('loginSuccess', this.username);
					this.$router.push('api/user');
				} else if (response.data.err) {
					Bus.$emit('showErr', response.data.err)
				} 
			}, response => {
				Bus.$emit("showErr", response);
			})
		},
		reset() {
			this.err = {};
			this.username=this.vpassword=this.password=this.studentId=this.phone=this.email='';
		}
	}
}

</script>

<style type="text/css">

</style>