<template>
  <div id="item-container" ref="itemContainer">
    <p v-if="!items"> 现在还没有作品, 快去创建一个吧~~ </p>
     <item v-for="(itemId, index) in items" :key="index" @click.native="showDetials(itemId)" :workId="itemId"></item>
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
    this.routeHandler(this.$route.path.split('/')[1]);
  },
  data () {
    return {
      detailsId: null,
      items: null
    }
  },
  methods: {
    routeHandler: function(method) {
      const lookUp = {
      'likes': this.fetchDataByUser,
      'search': this.fetchDataBySearch
      }
      const def = this.fetchData;
      const func = lookUp[method] || def;
      func();
      this.items = [234123];
    },
    fetchDataByUser: function() {
      this.$http.get('/api/user/likes').then(response => {
        if (response.data.status === true) {
          this.items = response.data.likes;
        } else {
          Bus.$emit('showErr', response.data.errorMessages);
        }
      }, error => {
        Bus.$emit('showErr', error.response.data.errorMessages);
      }) 
    },
    fetchDataBySearch: function() {
       this.$http.get('/api/search?key=' + this.$route.query.key).then(response => {
        if (response.data.status == true) {
          this.items = response.data.userworks;
        } else {
          Bus.$emit('showErr', response.data.errorMessages);
        }
      }, error => {
        Bus.$emit('showErr', error.response.data.errorMessages);
      }) 
    },
    showDetials: function (id, name) {
      this.detailsId = id;
      this.$router.push(this.$route.path + '/' + this.detailsId);
    },
    closeDetials: function() {
      this.detailsId = null;
      this.$router.back();
    },
    fetchData: function() {
       this.$http.get('/api/work').then(response => {
        if (response.data.status === true) {
          this.items = response.data.workIdList;
        } else {
          Bus.$emit('showErr', response.data.errorMessages);
        }
      }, error => {
        Bus.$emit('showErr', error.response.data.errorMessages);
      }) 
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
