<template>
  <div class="item-container">
      <b-img-lazy class="img" :src="path"></b-img-lazy>
  </div>
</template>

<script>
export default {
  name: 'item',
  props: ["workId"],
  created: function () {
    this.path = "api/work/" +  this.workId + "/cover";
  },
  data () {
    return {
      path: null
    }
  },
  methods: {
    
  }
}
</script>

<style>

.img {
  border-radius: 20px 20px 20px 20px;
  height: 100%;
  width: 100%;
}

.item-container {
  position: relative;
  width: 160px;
  height: 240px;
  float: left;
  margin-left: 25px;
  margin-right: 25px;
  margin-bottom: 25px;
  background-color: rgb(230,230,230);
  border-radius: 20px;
  box-shadow:  5px 5px 10px rgb(230,230,230);
  padding: 0px;
  overflow: hidden;
}

.item-container:hover {
  cursor: pointer;
}
</style>