<template>
  <div id="item-container" ref="itemContainer">
     <item v-for="(item, index) in items" :key="index" @click.native="showDetials(item.id, item.name)" :path="item.path" :name="item.name"></item>
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
    },
    fetchDataByUser: function() {
      let i = [];
      for (let index = 1; index < 5; index++) {
        i.push(
          {
            id: index,
            name: "aad",
            path: "/public/images/1.jpg"
          }
        )       
      }
      this.items = i;
      this.$http.get('/api/likes').then(response => {
        if (response.data.status === true) {
          this.items = response.data.data.userworks;
        } else {
          Bus.$emit('showErr', response.data.errorMessages);
        }
      }, response => {
        Bus.$emit('showErr', response.data.errorMessages);
      }) 
    },
    fetchDataBySearch: function() {
      let i = [];
      for (let index = 1; index < 5; index++) {
        i.push(
          {
            id: index,
            name: "aad",
            path: "/public/images/1.jpg"
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
      this.$router.push(this.$route.path + '/' + this.detailsId);
    },
    closeDetials: function() {
      this.detailsId = null;
      this.$router.back();
    },
    fetchData: function() {
      let i = [];
      for (let index = 1; index < 20; index++) {
        i.push(
          {
            id: index,
            name: "aad",
            path: "/public/images/logo.png"
          }
        )       
      }
      this.items = i;
       this.$http.get('/api/works').then(response => {
        if (response.data.status === true) {
          this.items = response.data.data.works;
        } else {
          Bus.$emit('showErr', response.data.errorMessages);
        }
      }, error => {
        Bus.$emit('showErr', error.response.errorMessages);
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
