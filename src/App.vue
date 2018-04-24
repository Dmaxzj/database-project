<template>
  <div id="app">
   <!--  <item v-for="item in items" @clickhandler="test(item.name)" :path="item.path" :name="item.name"></item> -->
     <item v-for="item in items" @click.native="test(item.name)" :path="item.path" :name="item.name"></item>
  </div>
</template>

<script>
import Item from "./Item.vue"

export default {
  components: {
    Item
  },
  name: 'app',
  created: {
    
  },
  data () {
    return {
      items: [
        {
          name: "112",
          path: "./src/assets/1.jpg"
        },
        {
          name: "132",
          path: "./src/assets/logo.png"
        }
      ]
    }
  },
  methods: {
    test: function (argument) {
      alert("asda"+argument);
    }
  }
}
</script>

<style>
#app {
  width: 500px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-left: auto;
  margin-right: auto;
}

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
  width: 200px;
  height: 90%;
}

.item-container {
  position: relative;
  width: 200px;
  height: 300px;
  float: left;
  margin-left: 25px;
  margin-right: 25px;
  background-color: rgb(230,230,230);
  border-radius: 20px;
  box-shadow: 5px 5px 10px rgb(200, 200, 200);
  padding: 0px;
  overflow: hidden;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

body {
  background-color: rgb(240, 240, 240);
}
</style>
