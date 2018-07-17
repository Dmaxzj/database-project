<template>
  <div class="item-detials-container">
    <div class="wrap">
    <header>
      asdfasdf
      {{workInfo.name}}
     <svg t="1531829082607" @click="onClose" class="close-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1039" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M505.173333 416.426666 122.88 27.306666c-27.306667-27.306667-68.266667-27.306667-102.4 0l0 0c-27.306667 27.306667-27.306667 68.266667 0 102.4L409.6 512l-389.12 389.12c-27.306667 27.306667-27.306667 68.266667 0 102.4l0 0c27.306667 27.306667 68.266667 27.306667 102.4 0l389.12-389.12 389.12 389.12c27.306667 27.306667 68.266667 27.306667 102.4 0l0 0c27.306667-27.306667 27.306667-68.266667 0-102.4L607.573333 512l389.12-389.12c27.306667-27.306667 27.306667-68.266667 0-102.4l0 0c-27.306667-27.306667-68.266667-27.306667-102.4 0L505.173333 416.426666 505.173333 416.426666z" p-id="1040" fill="#707070"></path></svg>
    </header>
      <!-- 主页面 -->
    <b-container v-if="state==type.mainPage || state == type.userInfo" class="content-container">
      <b-row>
        <b-col md="4">
          <b-img :src="path"/>
        </b-col>
        <b-col md="8">
          <b-container>
            <b-row>
              <b-col>
                <p>集数: {{workInfo.episodes}}</p>
              </b-col>
            </b-row>

            <b-container id="user-info" v-if="isLogin">
              <b-row>
                <b-col>
                  <b-button v-if="privateInfo.isFavorite" @click="changeFavorite" class="like-btn">取消收藏</b-button>
                  <b-button v-else @click="changeFavorite">收藏</b-button>
                </b-col>
              </b-row>
                <b-row>
                  <b-col>
                  <b-input-group prepend="评价">
                      <b-form-select v-model="privateInfo.rank" :options="options"></b-form-select>
                    <b-input-group-addon>
                      <b-btn variant="outline-success" @click="changeRank">修改</b-btn>
                    </b-input-group-addon>
                  </b-input-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                  <b-input-group prepend="当前看至">
                      <input type="number" class="form-control" id="watch-number" v-model="privateInfo.watched" @input="limiteNumber()">
                    <b-input-group-addon name="watched">
                      <b-btn variant="outline-success" @click="changeWatched">修改</b-btn>
                    </b-input-group-addon>
                  </b-input-group>
                  </b-col>
              </b-row>
            </b-container>

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
      <b-input-group label="标题："
                    label-text-align="left">
        <b-form-input type="text"
                       v-model="editWork.name"
                      maxlength="40"
                      required>
        </b-form-input>
        <b-input-group-append>
            <b-btn variant="outline-success" @click="updateWorkInfo('title')">提交</b-btn>
        </b-input-group-append>
      </b-input-group>
      <b-input-group label="介绍："
                    label-text-align="left">
        <b-form-textarea  type="text"
                          v-model="editWork.description"
                          :rows="4"
                          :max-rows="4"
                          required
                          style="resize: none">
        </b-form-textarea>
          <b-input-group-append>
            <b-btn variant="outline-success" @click="updateWorkInfo('description')">提交</b-btn>
          </b-input-group-append>
      </b-input-group>
      <b-input-group id="select-picture">
        <b-form-file v-model="picture" :state="Boolean(picture)" accept="image/*"></b-form-file>
          <b-input-group-append>
            <b-btn variant="outline-success" @click="updateCover">提交</b-btn>
          </b-input-group-append>
      </b-input-group>

      <b-input-group label="集数：">
        <b-form-input  type="number"
                          v-model="editWork.episodes"
                          required>
        </b-form-input>
      <b-input-group-append>
            <b-btn variant="outline-success" @click="updateWorkInfo('episodes')">提交</b-btn>
      </b-input-group-append>
      </b-input-group>		
    </b-form>
    </b-container>

    <div v-else class="content-container">
      <b-container id="comment-page" class="content-container">
        <b-row v-for="(comment, index) in workInfo.comments" :key="index">
          <b-col md="12">
            {{comment.content}}
          </b-col>
        </b-row>
      </b-container>
      <div id="comment-box">
        <b-input-group>
          <b-form-input type="text" v-model="commentBuffer" placeholder="评论">
          </b-form-input>
          <b-input-group-append>
            <b-btn variant="outline-success" @click="addComment">发送</b-btn>
          </b-input-group-append>
        </b-input-group>
      </div>

    </div>
      
      <div id="bottom-nav-bar" v-if="isLogin">
         
        <b-button v-if="state==type.mainPage" :variant="'primary'" @click="state = type.comment">评论</b-button>
        <b-button v-if="state != type.mainPage && state != type.edit" @click="state = type.mainPage">返回</b-button>
        <!-- <b-button v-if="state==type.mainPage" @click="state = type.userInfo">查看</b-button> -->
        <b-button v-if="state != type.editing" :variant="'primary'" @click="onEditingClick">编辑</b-button>
      </div>
    </div>
    <div id="full-screen" @click="onClose" @scroll="scrollDetials"></div>
  </div>
</template>

<script>
import Bus from "./Bus.js";

export default {
  name: "item-detials",
  data() {
    return {
      path: '/src/assets/1.png',
      state: 3,
      type: {
        editing: 1,
        comment: 2,
        mainPage: 3,
        userInfo: 4
      },
      workInfo: {
        description: "",
        episodes: 12,
        comments: [
          {
            content: 'asdfasdfa'
          },
          {
            content: 'asdfasdfa'
          },
          {
            content: 'asdfadsdasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasdfa'
          },
          {
            content: 'asdfasdfa'
          },
          {
            content: 'asdfasdfa'
          },
          {
            content: 'asdfasdfa'
          }
        ]
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
      },
      commentBuffer: null
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
      let id = this.$route.fullPath.split("/");
      id = id[id.length - 1];
      this.workInfo._id = id;
      // this.path = "api/work/" +  id + "/cover";
       this.$http.get('/api/work/' + id).then(response => {
        if (response.data.status == true) {
          this.workInfo = response.data.work;
          this.privateInfo = response.data.privateInfo;
        } else {
          Bus.$emit('showErr', response.data.errorMessages);
        }
      }, error => {
        Bus.$emit('showErr', error.response.data.errorMessages);
      })
    },
    limiteNumber: function() {
      if (this.privateInfo.watched > this.workInfo.episodes)
        this.privateInfo.watched = this.workInfo.episodes;
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
      $(".content-container").scrollHeight = 100;
    },
    changeFavorite: function() {
      this.$http
        .put("/api/work/" + this.workInfo._id +
        this.privateInfo.isFavorite == true ?
        "/unlike" : "/like")
        .then(
          response => {
            if (response.data.status == true) {
              this.privateInfo.isFavorite = !this.privateInfo.isFavorite;
            } else {
              Bus.$emit("showErr", response.data.errorMessages);
            }
          },
          error => {
            Bus.$emit("showErr", error.response.data.errorMessages);
          }
        );
    },
    changeWatched: function() {
      this.$http
        .put("/api/changeWatched/?workid=" + this.id, {
          watched: this.privateInfo.watched
        })
        .then(
          response => {
            if (response.data.status == true) {
              this.privateInfo.watched = response.data.watched;
            } else {
              Bus.$emit("showErr", response.data.errorMessages);
            }
          },
          error => {
            Bus.$emit("showErr", error.response.data.errorMessages);
          }
        );
    },
    changeRank: function() {
      this.$http
        .put("/api/" + this.id, {
          watched: this.privateInfo.rank
        })
        .then(
          response => {
            if (response.data.status == true) {
              this.privateInfo.rank = response.data.rank;
            } else {
              Bus.$emit("showErr", response.data.errorMessages);
            }
          },
          error => {
            Bus.$emit("showErr", error.response.data.errorMessages);
          }
        );
    },
    onEditingClick: function() {
      this.state = this.state == this.type.editing ? this.type.mainPage : this.type.editing;
      this.editWork.name = this.workInfo.name;
      this.editWork.description = this.workInfo.description + "";
      this.editWork.episodes = this.workInfo.episodes;
    },
    addComment: function() {
      this.$http
        .post("/api/work/" + this.workInfo._id + "/comment/new", {
          content: this.commentBuffer
        })
        .then(
          response => {
            if (response.data.status == true) {
              this.privateInfo.watched = response.data.watched;
            } else {
              Bus.$emit("showErr", response.data.errorMessages);
            }
            this.$http.get("/api/work/" + this.workInfo._id + "/comment").then(response => {
              if (response.data.status == true) {
                this.workInfo.comments = response.data.comments;
              }
            }, error => {
              Bus.$emit("showErr", error.response.data.errorMessages);
            })
          },
          error => {
            Bus.$emit("showErr", error.response.data.errorMessages);
          }
        );
    },
    updateCover: function() {
      let formData = new FormData();
      formData.append("file", this.picture);
      this.$http
        .post("/api/work/" + response.data.work._id + "/cover", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(
          response => {
            if (response.data.status == true) {
              const temp = this.path;
              this.path = null;
              this.path = temp;
              this.state = this.type.mainPage;
            }
          },
          error => {
            Bus.$emit("showErr", error.response.data.errorMessages);
          }
        );
    },
    updateWorkInfo: function(param) {
      if (param == 'title') {
        this.workInfo.name = this.editWork.name
      } else if (param == 'desciption') {
        this.workInfo.description = this.editWork.description;
      } else {
        this.workInfo.episodes = this.editWork.episodes;
      }
      this.$http
        .put("/api/work/" + this.workInfo._id + "/update",{ work: this.workInfo})
        .then(
          response => {
            if (response.data.status == true) {
              this.state = this.type.mainPage;
            } else {
              Bus.$emit("showErr", response.data.errorMessages);
            }
          },
          error => {
            Bus.$emit("showErr", error.response.data.errorMessages);
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
  z-index: 8;
}
.content-container {
  position: relative;
  width: 100%;
  height: 80%;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: inherit;
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
  width: 500px;
  height: 80%;
  margin: auto;
  margin-top: 3%;
  z-index: 10;
  border-radius: 10px;
  background-color: white;
}

#bottom-nav-bar {
  position: relative;
  background-color: rgb(230, 230, 230);
  height: 10%;
  border-radius: 0 0 10px 10px;
}

#bottom-nav-bar button {
  position: absolute;
  margin-top: 1%;
  width: 30%;
  height: 80%;
}

#bottom-nav-bar :nth-child(1) {
  right: 2%;
}

#bottom-nav-bar :nth-child(2) {
  left: 2%;
}

#user-info {
  padding: 0;
}

#user-info .row {
  margin-bottom: 30px;
}

header {
  text-align: center;
  font-size: 25pt;
  font-weight: bold;
  height: 10%;
}

#comment-box {
  position: absolute;
  width: 100%;
  bottom: 5px;
}

.close-icon {
  position: absolute;
  right: -15px;
  top: -15px;
  width: 31px;
  height: 31px;
  border: none;
  background-color: white;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
}

.close-icon:hover {
  background-color: #008bdd;
}

.wrap img {
  border-radius: 20px;
  width: 160px;
  height: 240px;
  border: none;
}


.close-icon:hover path {
  fill: white;
}

#edit-page > div{
  margin-bottom: 20px;
}

#comment-page .row{
  min-height: 10%;
  width: 80%;
  padding: 5px;
  margin: auto;
  margin-bottom: 5px;
  word-wrap: break-word;
  word-break: normal;
  border-bottom: 1px solid #c0c0c0;
}

.like-btn {
  border-color: hotpink;
  background-color: hotpink;
}

.like-btn:hover,
.like-btn:focus  {
  box-shadow: 0 0 0 0.2rem  rgb(255, 75, 150);
   border-color: rgb(255, 75, 150);
  background-color: rgb(255, 75, 150);
}



</style>