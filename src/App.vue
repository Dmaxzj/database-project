<template>
  <div id="app">
     <my-nav-bar/>
     <router-view></router-view>
     <error-text></error-text>
  </div>
</template>

<script>
import Item from "./Item.vue"
import MyNavBar from "./NavBar.vue"
import ItemDetials from "./ItemDetials.vue"
import ErrorText from "./ErrorText.vue"

export default {
  components: {
    Item,
    MyNavBar,
    ItemDetials,
    ErrorText
  },
  name: 'app',
  data: function () {
    return {
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-left: auto;
  margin-right: auto;
}

body {
  margin: 0;
  padding: 0;
}


body {
  background-color: rgb(255, 255, 255);
}

</style>
