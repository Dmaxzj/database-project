<template>
  <div class="item-detials-container">
    <div class="wrap">

      <!-- 主页面 -->
    <b-container v-if="state==type.mainPage || state == type.userInfo" class="content-container">
      <b-row>
        <b-col md="4">
          <b-img :src="path"/>
        </b-col>
        <b-col md="8">
          <b-container>
            <b-row>
              <b-col md="4">
                <p>{{workInfo.name}} </p>
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
          </b-container>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12" style="text-align: left">
          <article class="work-description">{{workInfo.description}} </article>
        </b-col>
      </b-row>
  
    </b-container>


      <!-- 编辑页面 -->
    <b-container v-else-if="state==type.editing"  class="content-container">
    <b-form id="edit-page">
      <b-form-group label="标题："
                    label-text-align="left">
        <b-form-input type="text"
                       v-model="editWork.name"
                      maxlength="40"
                      required>
        </b-form-input>
      </b-form-group>
      <b-row>
        <b-col>
          <b-form-input>
          </b-form-input>
        </b-col>
        <b-col>
          <b-form-input>
          </b-form-input>
        </b-col>
      </b-row>
      <b-row v-for="(metaData, index) in metaDatas" :key="index">
        {{metaData}}
        <v-buttoo @click="deleteMetaData(index)">删除</v-buttoo>
      </b-row>
      <b-form-group label="介绍："
                    label-text-align="left">
        <b-form-textarea  type="text"
                          v-model="editWork.description"
                          :rows="4"
                          :max-rows="4"
                          required
                          style="resize: none">
        </b-form-textarea>
      </b-form-group>
      <div id="select-picture">
        选择图片
        <b-form-file v-model="picture" :state="Boolean(picture)" accept="image/*"></b-form-file>
      </div>
      <b-form-group label="集数："
                    label-text-align="left">
        <b-form-input  type="number"
                          v-model="editWork.episode"
                          required>
        </b-form-input>
      </b-form-group>		
    </b-form>
    </b-container>



  

    <div v-else class="content-container">
      <b-container class="content-container">
        <b-row v-for="(comment, index) in comments" :key="index">
          <b-col md="12">
            {{comment.author}}
          </b-col>
          <b-col md="12">
            {{comment.body}}
          </b-col>
        </b-row>
      </b-container>
      <div id="comment-box">
        <b-input-group>
          <b-form-input type="text" v-model="commentBuffer" placeholder="评论">
          </b-form-input>
        </b-input-group>
      </div>

    </div>
      
      <div id="bottom-nav-bar" v-if="isLogin">
         <b-container id="user-info" v-if="state==type.userInfo">
        <b-row>
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
        <b-button v-if="state==type.mainPage" @click="state = type.comment">评论</b-button>
        <b-button v-if="state != type.mainPage && state != type.edit" @click="state = type.mainPage">返回</b-button>
        <b-button v-if="state==type.mainPage" @click="state = type.userInfo">查看</b-button>
        <b-button v-if="state != type.editing" @click="onEditingClick">编辑</b-button>
      </div>
    </div>
    <div id="full-screen" @click="onClose" @scroll="scrollDetials"></div>
  </div>
</template>

<script>
import CommentsContainer from "./CommentsContainer.vue";
import Bus from "./Bus.js";

export default {
  name: "item-detials",
  components: {
    CommentsContainer
  },
  data() {
    return {
      path: null,
      state: 3,
      type: {
        editing: 1,
        comment: 2,
        mainPage: 3,
        userInfo: 4
      },
      workInfo: {
        id: "",
        name: "legal high",
        description:
          "dasdasdasdasasdasdasdasasdasd\
        asdasdasdasssssssssssssssssssssssssssssssssssssssdasd \
        asdasdasdasssssssssssssssssssssssssssssssssssssssdasd \
\
        asdasdasdasdasdddddddddddddddddddddddddddsdasdasdasdsdasdasdasdasddadasdasasdasdasasdasdasdasdasdasdasdasdasdasdasdasdasd asdasasdasdas",
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
      ],
      picture: null,
      editWork: {
        name: "legal high",
        description:
          "dasdasdasdasasdasdasdasasdasd\
        asdasdasdasssssssssssssssssssssssssssssssssssssssdasd \
        asdasdasdasssssssssssssssssssssssssssssssssssssssdasd \
        asdasdasdasssssssssssssssssssssssssssssssssssssssdasd \
        asdasdasdasssssssssssssssssssssssssssssssssssssssdasd \
        asdasdasdasssssssssssssssssssssssssssssssssssssssdasd \
        asdasdasdasssssssssssssssssssssssssssssssssssssssdasd \
        asdasdasdasssssssssssssssssssssssssssssssssssssssdasd \
        asdasdasdasssssssssssssssssssssssssssssssssssssssdasd \
        asdasdasdasssssssssssssssssssssssssssssssssssssssdasd \
        asdasdasdasssssssssssssssssssssssssssssssssssssssdasd \
        asdasdasdasssssssssssssssssssssssssssssssssssssssdasd \
        asdasdasdasdasdddddddddddddddddddddddddddsdasdasdasdsdasdasdasdasddadasdasasdasdasasdasdasdasdasdasdasdasdasdasdasdasdasd asdasasdasdas",
        catagory: "legal",
        episode: 12
      }
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
      $(".content-container").stop();
      $(".content-container").animate(
        {
          scrollTop:
            $(".content-container").scrollTop() + event.originalEvent.deltaY
        },
        150,
        "linear"
      );
    });
  },
  methods: {
    fetchData: function() {
      this.path = "/public/images/logo.png";
      let id = this.$route.fullPath.split("/");
      id = id[id.length - 1];
      //  this.$http.get('/api/work/' + id).then(response => {
      //   if (response.data.success == true) {
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
    },
    onEditingClick: function() {
      this.state = this.state == this.type.editing ? this.type.mainPage : this.type.editing;
      this.editWork.name = this.workInfo.name;
      this.editWork.description = this.workInfo.description;
      this.editWork.episode = this.workInfo.episode;
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

.work-description {
  word-wrap: break-word;
  word-break: normal;
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
  width: 100%;
  height: 90%;
  overflow-y: auto;
  overflow-x: hidden;
}

.content-container::-webkit-scrollbar {
  width: 5px;
}

.content-container::-webkit-scrollbar-track {
  background-color: #dae4e5;
} /* 滚动条的滑轨背景颜色 */
.content-container::-webkit-scrollbar-thumb {
  background-color: #5e5e5e;
  border-radius: 2px;
}
.wrap {
  position: relative;
  width: 800px;
  height: 60%;
  margin: auto;
  margin-top: 5%;
  z-index: 1050;
  border-radius: 5px;
  background-color: white;
}

#bottom-nav-bar {
  position: relative;
  border-top: 1px solid black;
}

#bottom-nav-bar button {
  float: right;
}

#user-info {
  position: absolute;
  top: -110px;
  margin: 0 1%;
  border: 1px solid black;
  border-radius: 2px;
  height: 100px;
  width: 98%;
  background-color: white;

}
</style>