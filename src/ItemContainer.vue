<template>
  <div id="item-container">
     <item v-for="(item, index) in items" :key="index" @click.native="test(item.id, $event)" :path="item.path" :name="item.name"></item>
     <item-detials v-if="detialsId" @closeDetialsHandler="closeDetials" :detialId="detialsId"/>
  </div>
</template>

<script>
import Item from "./Item.vue"
import ItemDetials from "./ItemDetials.vue"

export default {
  components: {
    Item,
    ItemDetials,
  },
  name: 'item-container',
  watch: {
    '$route': 'fetchDataHandler'
  },
  created: function () {
    this.fetchDataHandler();
  },
  data () {
    return {
      detialsId: null,
      items: null
    }
  },
  methods: {
    fetchDataHandler: function() {
      var lookUp = {
      '/': this.fetchData,
      '/userwork': this.fetchDataById,
      '/search': this.fetchDataBySearch
      }
      if (lookUp[this.$route.path])
        lookUp[this.$route.path]();
      else
        this.fetchData();
    },
    fetchDataById: function() {
      var i = [];
      for (let index = 1; index < 5; index++) {
        i.push(
          {
            id: index,
            name: "aad",
            path: "./src/assets/1.jpg"
          }
        )       
      }
      this.items = i;
    },
    fetchDataBySearch: function() {
      var i = [];
      for (let index = 1; index < 5; index++) {
        i.push(
          {
            id: index,
            name: "aad",
            path: "./src/assets/1.jpg"
          }
        )       
      }
      this.items = i;
    },
    test: function (id, event) {
      document.getElementsByTagName("body")[0].classList.add("disable");
      this.detialsId = id;
    },
    closeDetials: function() {
      document.getElementsByTagName("body")[0].classList.remove("disable");
      this.detialsId = null;
    },
    fetchData: function() {
      var i = [];
      for (let index = 1; index < 20; index++) {
        i.push(
          {
            id: index,
            name: "aad",
            path: "./src/assets/logo.png"
          }
        )       
      }
      this.items = i;
    }
  }
}
</script>

<style>

body {
  margin: 0;
  padding: 0;
}

.disable {
  opacity: 0.5;
}



body {
  background-color: rgb(255, 255, 255);
}
</style>
