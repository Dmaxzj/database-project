<template>
  <div class="item-detials-container">
    <b-container  class="content-container">
      <b-row>
        <b-col md="4">
          <b-img :src="path"/>
        </b-col>
        <b-col md="8">
          <b-container>
            <b-row>
              <b-col md="4">
                <p>{{workInfo.title}}</p>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <p>类型: {{workInfo.catagory}}</p>
              </b-col>
              <b-col>
                <p>集数: {{workInfo.episode}}</p>
              </b-col>
            </b-row>           
            <b-row v-if="isLogin">
              <b-col>
                <b-button v-if="privateInfo.isFavorite" @click="changeFavorite">取消收藏</b-button>
                <b-button v-else @click="changeFavorite">收藏</b-button>
              </b-col>
              <b-col md="8">
                <b-input-group>
                  <b-input-group-addon>评价: </b-input-group-addon>
                  <b-form-select v-model="privateInfo.rank" :options="options"></b-form-select>
                  <b-input-group-addon>
                    <b-btn variant="outline-success" @click="changeRank">确定</b-btn>
                  </b-input-group-addon>
                </b-input-group>
                <div class="w-100"></div>
                <b-input-group>
                  <b-input-group-addon>当前看至: </b-input-group-addon>
                    <input type="number" class="form-control" id="watch-number" v-model="privateInfo.watched" @input="limiteNumber()">
                  <b-input-group-addon name="watched">
                    <b-btn variant="outline-success" @click="changeWatched">确定</b-btn>
                  </b-input-group-addon>
                </b-input-group>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12" style="text-align: left">
          <p>{{workInfo.body}} </p>
        </b-col>
      </b-row>
    </b-container>
    <div id="full-screen" @click="onClose" @scroll="scrollDetials"></div>
  </div>
</template>

<script>
import CommentsContainer from "./CommentsContainer.vue";
import Bus from "./Bus.js"
export default {
  name: "item-detials",
  props: ["detialsId"],
  components: {
    CommentsContainer
  },
  data() {
    return {
      path: null,
      workInfo: {
        id: "",
        title: "legal high",
        body:
          "lllegal highasdasdasdasdasdasdvevrvvdcadcasasca\
        cacacascascascascascascascascascascacacascascascascascasc\
        ascascascascacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascas\
        cacacascascascascascascascascascascascascascasca",
        image: "",
        catagory: "legal",
        episode: 12
      },
      privateInfo: {
        isFavorite: true,
        rank: null,
        watched: 2
      },
      options: [
        { value: null, text: "给此作品评价" },
        { value: "BAD", text: "糟糕" },
        { value: "AVERAGE", text: "一般" },
        { value: "GOOD", text: "很棒" }
      ]
    };
  },
  created: function() {
    this.fetchData();
    // 禁用滚动条
    $(document.body).css({
      "padding-right": "17px",
      "overflow-x": "hidden",
      "overflow-y": "hidden"
    });
  },
  mounted: function() {
    // 实现平滑滚动效果
    $("#full-screen").on("mousewheel", function(event) {
      $(".content-container").animate(
        {
          scrollTop:
            $(".content-container").scrollTop() + event.originalEvent.deltaY
        },
        30
      );
    });
  },
  methods: {
    fetchData: function() { 
      this.path = "/public/images/logo.png";
      let id = this.$route.fullPath.split("/");
      id = id[id.length - 1];
      //  this.$http.get('/api/works/' + id).then(response => {
      //   if (response.data.msg == 'success') {
      //     this.workInfo = response.data.workInfo;
      //     this.privateInfo = response.data.privateInfo;
      //   } else {
      //     Bus.$emit('showErr', response.data.err);
      //   }
      // }, response => {
      //   Bus.$emit('showErr', response);
      // })
    },
    limiteNumber: function() {
      if (this.privateInfo.watched > this.workInfo.episode)
        this.privateInfo.watched = this.workInfo.episode;
      else if (this.privateInfo.watched < 0) this.privateInfo.watched = 0;
    },
    onClose: function() {
      this.$emit("closeDetialsHandler");
      $(document.body).css({
        "padding-right": "0px",
        "overflow-x": "auto",
        "overflow-y": "auto"
      });
    },
    scrollDetials: function() {
      console.log($(".content-container"));
      $(".content-container").scrollHeight = 100;
    },
    changeFavorite: function() {
      this.$http
        .put("/api/changeFavorite/?workid=" + this.id, {
          isFavorite: !this.privateInfo.isFavorite
        })
        .then(
          response => {
            if (response.data.msg == "success") {
              this.privateInfo.isFavorite = response.data.isFavorite;
            } else {
              Bus.$emit("showErr", response.data.err);
            }
          },
          response => {
            Bus.$emit("showErr", response);
          }
        );
      this.$root.isLogin = !this.$root.isLogin;
    },
    changeWatched: function() {
      this.$http
        .put("/api/changeWatched/?workid=" + this.id, {
          watched: this.privateInfo.watched
        })
        .then(
          response => {
            if (response.data.msg == "success") {
              this.privateInfo.watched = response.data.watched;
            } else {
              Bus.$emit("showErr", response.data.err);
            }
          },
          error => {
            Bus.$emit("showErr", error.response.error);
          }
        );
    },
    changeRank: function() {
      this.$http
        .put("/api/changeRank/?workid=" + this.id, {
          watched: this.privateInfo.rank
        })
        .then(
          response => {
            if (response.data.msg == "success") {
              this.privateInfo.rank = response.data.rank;
            } else {
              Bus.$emit("showErr", response.data.err);
            }
          },
          response => {
            Bus.$emit("showErr", response);
          }
        );
    }
  },
  computed: {
    isLogin() {
      return this.$root.isLogin;
    }
  }
};
</script>

<style>
.item-detials-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: -16px;
  text-align: left;
}

#full-screen {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: -16px;
  text-align: left;
  background-color: black;
  opacity: 0.3;
  z-index: 1024;
}
.content-container {
  position: relative;
  max-width: 800px;
  margin-top: 5%;
  width: 100%;
  height: 60%;
  background-color: antiquewhite;
  overflow: auto;
  z-index: 1050;
}

.content-container::-webkit-scrollbar {
  width: 2px
}
</style>