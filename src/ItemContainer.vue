<template>
  <div id="item-container">
     <item v-for="(item, index) in items" :key="index" @click.native="showDetials(item.id, item.name)" :path="item.path" :name="item.name"></item>
     <!-- <b-modal id="item-detial-container" ref="itemDetails" hide-footer>
      <item-detials v-if="detailsId" @closeDetialsHandler="closeDetials" :detailsId="detailsId"/>
     </b-modal> -->
     <router-view @closeDetialsHandler="closeDetials" :detailsId="detailsId"></router-view>
  </div>
</template>

<script>
import Item from "./Item.vue"
import ItemDetials from "./ItemDetials.vue"
import Bus from "./Bus"

export default {
  components: {
    Item,
    ItemDetials,
  },
  name: 'item-container',
  created: function () {
    Bus.$on('selectData', this.routeHandler);
    this.fetchDataHandler();
  },
  data () {
    return {
      detailsId: null,
      detailsName: null,
      items: null
    }
  },
  methods: {
    routeHandler: function(method) {
      var lookUp = {
      'userworks': this.fetchDataByUser,
      'search': this.fetchDataBySearch
      }
      var def = this.fetchData;
      var func = lookUp[method] || def;
      func();
    },
    fetchDataHandler: function() {
      var lookUp = {
      '/': this.fetchData,
      '/userworks': this.fetchDataByUser,
      '/search': this.fetchDataBySearch
      }
      var def = this.fetchData;
      var func = lookUp[this.$route.path] || def;
      func();
    },
    fetchDataByUser: function() {
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
      // this.$http.get('/api/userworks').then(response => {
      //   if (response.data.msg == 'success') {
      //     this.items = response.data.userworks;
      //   } else {
      //     Bus.$emit('showErr', response.data.err);
      //   }
      // }, response => {
      //   Bus.$emit('showErr', response);
      // }) 
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
      //  this.$http.get('/api/search?key=' + this.$route.query.key).then(response => {
      //   if (response.data.msg == 'success') {
      //     this.items = response.data.userworks;
      //   } else {
      //     Bus.$emit('showErr', response.data.err);
      //   }
      // }, response => {
      //   Bus.$emit('showErr', response);
      // }) 
    },
    showDetials: function (id, name) {
      this.detailsId = id;
      this.detailsName = name;
      this.$router.push(this.$route.path + '/' + this.detailsId);
    },
    closeDetials: function() {
      this.detailsId = null;
      this.detailsName = null;
      this.$router.back();
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
      //  this.$http.get('/api/works').then(response => {
      //   if (response.data.msg == 'success') {
      //     this.items = response.data.userworks;
      //   } else {
      //     Bus.$emit('showErr', response.data.err);
      //   }
      // }, response => {
      //   Bus.$emit('showErr', response);
      // }) 
    }
  }
}
</script>

<style>

body {
  margin: 0;
  padding: 0;

}


body {
  background-color: rgb(255, 255, 255);
}

#item-detial-container > div {
  max-width: 80%;
}
</style>
