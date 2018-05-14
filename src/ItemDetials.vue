<template>
  <div class="item-detials-container">
      <img :src="path"/>
      <div v-if="workInfo">
        <div>
          <label>标题: {{workInfo.title}}</label>
        </div>
        <p>介绍:</p>
        <p>{{workInfo.body}} </p>

        <label>标签: {{workInfo.catagory}}</label>
        <label>集数: {{workInfo.episode}}</label>
		</div>
    <div v-if="isLogin">
      <b-button v-if="privateInfo.isFavorite">取消收藏</b-button>
      <b-button v-else>收藏</b-button>
    </div>
    <div v-if="privateInfo.isFavorite">
      <span>{{privateInfo.rank}}</span>
      <span>{{privateInfo.watched}}</span>
    </div>
    <comments-container/>
      <button @click="closeDetials"></button>
  </div>
</template>

<script>
import CommentsContainer from './CommentsContainer.vue'

export default {
  name: "item-detials",
  props: ["detialId"],
  components: {
    CommentsContainer
  },
  data() {
    return {
      path: null,
      workInfo: {
        title: "legal high",
        body: "lllegal high",
        image: "",
        catagory: "legal",
        episode: "12"
      },
      isLogin: true,
      privateInfo: {
        isFavorite: true,
        rank: "Good",
        watched: 2
      }
    };
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    closeDetials: function() {
      this.$emit("closeDetialsHandler");
    },
    fetchData: function() {
      if (this.detialId) {
        this.path = "./src/assets/logo.png";
      } else {
        this.path = null;
      }
    }
  }
};
</script>

<style>
.item-detials-container {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 80%;
  background-color: azure;
  z-index: 2;
}
</style>