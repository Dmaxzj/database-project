<template>
	<b-card id="article-card"
            :header="author"
            :footer="formatTime"
            :title="title"
            header-tag="header">
		<slot>无内容</slot>
	</b-card>
    
</template>

<script>
import Bus from './Bus.js'

export default {
    props: ['title', 'author', '_id', "time"],
    computed: {
        formatTime: function() {
            let date = new Date();
            date.setTime(Date.parse(this.time));
            return date.toLocaleString();
        }
    }
}

</script>

<style type="text/css">
#article-card  {
  float: left;
  text-align: left;
  word-wrap: break-word;
  word-break: normal;
  height: 300px;
  margin: 0 5% 5% 5%;
  width: 40%;
}
</style>