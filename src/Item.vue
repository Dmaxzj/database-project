<template>
  <div class="item-container">
      <b-img-lazy class="img" :src="path"></b-img-lazy>
      <div class="name">{{name}} </div>
  </div>
</template>

<script>
export default {
  name: 'item',
  props: ["path", "name"],
  created: function () {

  },
  data () {
    return {}
  },
  methods: {
    
  }
}
</script>

<style>

.name {
  position: absolute;
  bottom: 0;
  border-radius: 0px 0px 20px 20px;
  width: 100%;
  /*height: 15%;*/
  padding-top: 5px;
  text-align: center;
  font-weight: bold;
  background-color: rgb(255, 255, 255);
  /*filter: blur(1px);*/

}

.img {
  border-radius: 20px 20px 0px 0px;
  width: 160px;
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
  box-shadow: 5px 5px 10px rgb(200, 200, 200);
  padding: 0px;
  overflow: hidden;
}
</style>