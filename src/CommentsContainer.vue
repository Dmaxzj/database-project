<template>
	<div v-if="comments" id="comments-container">
	<div class="add-comment-box">
	  <button @click="addComment" class="comment-btn">评论</button>
	  <button v-on:click="cancle" class="cancle">返回</button>
	  <div v-if="commenting">
	  	<textarea v-model="myComment" maxlength="140"></textarea>
	  	<button @click="add" class="confirm-btn">确定</button>
	  </div>
	  </div>
	  <div class="comments-box">
      <comment-item v-on:updateComment="updateHandle" v-bind:isAdmini="isAdmini" v-for="comment in comments" :key="comment._id" v-bind="comment">
       </comment-item>
       </div>
    </div>
</template>

<script>
import Bus from './Bus.js'
import CommentItem from './CommentItem.vue'

export default {
	components: {
		CommentItem
	},
	data: function() {
		return {
			myComment: '',
			commenting: false,
			comments: null,
			isAdmini: false
		}
	},
	created: function() {
		this.fetchData();
		var user = {username: null};
		Bus.$emit('getUsername', user);
		if (user.username == "admini") this.isAdmini = true;
	},
	methods: {
		fetchData() {
			this.$http.get('/api/getComments/' + this.$route.params.id).then(response => {
				this.comments = response.data.comments;
			}, response => {
				console.log('error');
			})
		},
		addComment() {
			this.commenting = !this.commenting;
		},
		add() {
			this.commenting = false;
			this.$http.post('/addComment/' + this.$route.params.id, {
				body: this.myComment
			}).then(response => {
				if (response.data) {
					this.myComment = '';
					this.fetchData();
				} else {
					Bus.$emit('showErr', "请先登录");
				}
			}, response => {
				console.log(response);
			})
		},
		updateHandle() {
			this.myComment = '';
			this.commenting = false;
			this.fetchData();
		},
		cancle() {
			this.$router.back();
		}
	}
}

</script>

<style type="text/css">

</style>