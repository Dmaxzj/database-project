<template>
  <b-card id="addwork-card"
          bg-variant="light"
          header="新建作品"
          header-text-variant="center"
          v-if="work">
    <b-form>
      <b-form-group label="名称："
                    label-text-align="left">
        <b-form-input type="text"
                       v-model="work.name"
                      maxlength="40"
                      required
                      placeholder="输入标题">
        </b-form-input>
      </b-form-group>
      <b-form-group label="介绍："
                    label-text-align="left">
        <b-form-textarea  type="text"
                          v-model="work.description"
                          :rows="4"
                          :max-rows="4"
                          required
                          placeholder="内容介绍">
        </b-form-textarea>
      </b-form-group>
      <b-form-group label="图片："
                    label-text-align="left">  
        <b-form-file v-model="work.image" :state="Boolean(work.image)" accept="image/*"></b-form-file>
      </b-form-group>
      <b-form-group label="集数："
                    label-text-align="left">
        <b-form-input  type="number"
                          v-model="work.episode"
                          required
                          placeholder="输入总集数">
        </b-form-input>
      </b-form-group>
      <b-button @click="addWork" :disabled="hadError" :variant="'primary'" size="lg" class="add-btn btn-primary">新建</b-button>
      <b-button @click="cancle" size="lg" class="cancle-btn">返回</b-button>			
    </b-form>
  </b-card>
</template>

<script>
import Bus from "./Bus.js";

export default {
  data: function() {
    return {
      work: {
        name: "",
        description: "",
        image: "",
        episode: ""
      }
    };
  },
  created: function() {
    if (this.$root.isLogin !== true) {
      this.$router.push("/works");
    }
  },
  computed: {
    hadError: function() {
      if (this.work.name == "" || this.work.description == "" || this.work.episode == "") return true;
      else return false;  
    }
  },
  methods: {
    addWork: function() {
      this.$http
        .post("/api/work/create", {
          name: this.work.name,
          description: this.work.description,
          episode: this.work.episode
        })
        .then(
          response => {
            if (response.data.status === true) {
              let formData = new FormData();
              formData.append("cover", this.work.image);
              this.$http
                .post("/api/work/" + response.data.work._id + "/cover", formData, {
                  headers: { "Content-Type": "multipart/form-data" }
                })
                .then(
                  response => {
                    this.$router.push("/works");
                  },
                  error => {
                    this.$router.push("/works");
                    Bus.$emit("showErr", error.response.data.errorMessages);
                  }
                );
            } else {
              Bus.$emit("showErr", response.data.errorMessages);
            }
          },
          error => {
            Bus.$emit("showErr", error.response.data.errorMessages);
          }
        );
    },
    cancle: function() {
      this.$router.back();
    }
  }
};
</script>

<style type="text/css">
#addwork-card {
	position: relative;
	margin-top: 50px;
  margin-bottom: 50px;
	font-size: 16pt;
}

#addwork-card .card-header {
	font-weight: bold;
}

#addwork-card p {
	height: 30px;
	font-size: 15pt;
	width: 100%;
}

#addwork-card .card-body {
	padding-top: 5px;
	padding-bottom: 60px;
}

#addwork-card .add-btn {
	width: 8rem;
	position: absolute;
	left: 1.25rem;
  transition: all ease-in-out 0.3s 0s;
}

#addwork-card .disabled {
    background-color: #6c757d;
    border-color: #6c757d;
}
#addwork-card .cancle-btn {
	width: 8rem;
	position: absolute;
	right: 1.25rem;
}
</style>