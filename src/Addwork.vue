<template>
  <b-card bg-variant="light"
          header="新建作品"
          header-text-variant="center"
          v-if="work">
    <b-form>
      <b-form-group label="标题："
                    label-text-align="left">
        <b-form-input type="text"
                       v-model="work.title"
                      maxlength="40"
                      required
                      placeholder="输入标题">
        </b-form-input>
      </b-form-group>
      <b-form-group label="介绍："
                    label-text-align="left">
        <b-form-textarea  type="text"
                          v-model="work.body"
                          :rows="4"
                          :max-rows="4"
                          required
                          placeholder="内容介绍">
        </b-form-textarea>
      </b-form-group>
      <div>
        选择图片
        <b-form-file v-model="work.image" :state="Boolean(work.image)" accept="image/*"></b-form-file>
      </div>
      <b-form-group label="标签："
                    label-text-align="left">
        <b-form-input  type="text"
                          v-model="work.catagory"
                          required
                          placeholder="分类">
        </b-form-input>
      </b-form-group>
      <b-form-group label="集数："
                    label-text-align="left">
        <b-form-input  type="number"
                          v-model="work.episode"
                          required
                          placeholder="输入总集数">
        </b-form-input>
      </b-form-group>
      <b-button @click="addWork" size="lg">新建</b-button>
      <b-button @click="cancle" size="lg">返回</b-button>			
    </b-form>
  </b-card>
</template>

<script>
import Bus from "./Bus.js";

export default {
  data: function() {
    return {
      work: {
        title: "",
        body: "",
        image: "",
        catagory: "",
        episode: ""
      }
    };
  },
  methods: {
    addWork: function() {},
    cancle: function() {
      this.$router.back();
    }
  }
};
</script>

<style type="text/css">

</style>