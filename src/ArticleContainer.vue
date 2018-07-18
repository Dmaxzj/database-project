<template>
	<div id="article-container">
        <b-button :variant="'primary'" @click="showModal" id="add-article-btn">写文章
        </b-button>
	  <p v-if="!articles.length">还没有内容， 快去写文章吧</p>
      <article-item v-for="article in articles" :_id="article._id" :key="article._id" :time="article.time" :title="article.title" :author="article.username">
         <div> {{article.content}}</div>
      </article-item>
      <b-modal ref="articleModalRef" hide-footer title="创建文章">
      <b-form-group label="名称："
                    label-text-align="left">
        <b-form-input type="text"
                       v-model="newArticle.title"
                      maxlength="40"
                      required
                      placeholder="输入标题">
        </b-form-input>
      </b-form-group>
      <b-form-group label="内容："
                    label-text-align="left">
        <b-form-textarea  type="text"
                          v-model="newArticle.content"
                          :rows="4"
                          :max-rows="4"
                          required
                          placeholder="输入内容">
        </b-form-textarea>
      </b-form-group>
      <div class="btn-wrap">
        <b-btn class="modal-btn add-btn" variant="primary"  @click="addArticle">创建</b-btn>
        <b-btn class="modal-btn cancle-btn"  @click="hideModal">关闭</b-btn>
      </div>
    </b-modal>
    </div>
</template>

<script>
import ArticleItem from "./ArticleItem.vue";
import Bus from "./Bus.js";

export default {
  components: {
    ArticleItem
  },
  data: function() {
    return {
      articles: [

      ],
      newArticle: {
        titil: "",
        content: ""
      }
    };
  },
  created: function() {
    this.fetchDataByHome();
  },
  methods: {
    fetchDataByHome() {
      this.$http.get("/api/article").then(
        response => {
          if (response.data.status == true)
            this.articles = response.data.articles;
          else Bus.$emit("showErr", response.data.errorMessages);
        },
        error => {
          Bus.$emit("showErr", error.response.data.errorMessages);
        }
      );
    },
    showModal() {
      this.$refs.articleModalRef.show();
    },
    hideModal() {
      this.$refs.articleModalRef.hide();
    },
    addArticle: function() {
      if (this.newArticle.title == "" || this.newArticle.content == "") {
        Bus.$emit("showErr", ["标题和内容不能为空"]);
        return;
      }
      this.$http.post("/api/article/", this.newArticle).then(
        response => {
          if (response.data.status == true) {
            this.newArticle.titil = this.newArticle.content = "";
            this.fetchDataByHome();
            this.hideModal();
          } else {
            Bus.$emit("showErr", response.data.errorMessages);
          }
        },
        error => {
          Bus.$emit("showErr", error.response.data.errorMessages);
        }
      );
    }
  }
};
</script>

<style type="text/css">
#article-container {
  position: relative;
  width: 100%;
  margin: auto;
  margin-top: 100px;
}

#article-container p {
  text-align: center;
}

#add-article-btn {
  position: absolute;
  right: 20px;
  top: -80px;
}

#article-container .modal-btn {
  width: 40%;
}

.add-btn {
  position: absolute;
  left: 1.1rem;
}

.cancle-btn {
  position: absolute;
  right: 1.1rem;
}
.btn-wrap {
  height: 40px;
}
</style>