<template>
    <b-card>
        <b-card-header header="用户信息"/>
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
                username: "jay",
                email: "dengzijie395@gmail.com"
            }
		}
	},
	created: function() {
		// this.$http.get('/api/user').then(response => {
		// 	this.user = response.data.user;
		// }, response => {
		// 	this.$router.back();
		// })
	}
}

</script>

<style type="text/css">


</style>