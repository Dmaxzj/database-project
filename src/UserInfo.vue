<template>
    <b-card id="user-info-card"
            bg-variant="light"
            header="用户信息"
            header-text-variant="center">
        <b-card-body>
            <b-list-group>
                <b-list-group-item>
                    <label>用户名：</label>
                    {{user.username}}
                </b-list-group-item>
                <b-list-group-item>
                    <label>邮箱：</label>
                    {{user.email}}
                </b-list-group-item>
            </b-list-group>
        </b-card-body>
    </b-card>
</template>

<script>

export default {
	data: function() {
		return {
			user: {
                username: '',
                email: ''
            }
		}
	},
	created: function() {
		this.$http.get('/api/user').then(response => {
            if (response.data.status == true) {
                this.user.username = response.data.user.username;
                this.user.email = response.data.user.email;
            } else {
                this.$router.back();
            }
		}, error => {
			this.$router.back();
		})
	}
}

</script>

<style type="text/css">
#user-info-card {
	position: relative;
	margin-top: 50px;
	min-width: 400px;
	font-size: 16pt;
}

#user-info-card label{
    float: left;
}

#user-info-card .card-header {
	font-weight: bold;
}

</style>