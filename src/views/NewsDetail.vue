<template>
  <div class="container">
    <img :src="data.cover" alt="" class="cover" />
    <div class="title">{{ data.title }}</div>
    <div class="meta">{{ data.author_name }}&emsp;{{ data.updated_at }}</div>
    <div v-html="data.content" class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "NewsDetail",
});
</script>

<script lang="ts" setup>
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
let data = reactive({
  content: "载入中...",
  title: "正在努力为您加载新闻...",
  cover: "",
  author_name: "",
  updated_at: "",
});

let route = useRoute();
let post_id: string = route.params.post_id as unknown as string;
function update_news_info() {
  axios.get("https://unidemo.dcloud.net.cn/api/news/36kr/" + post_id).then(
    (value) => {
      console.log(value.data);
      data.title = value.data.title + "...";
      data.content = (value.data.content as string)
        .replaceAll("<a", "<span")
        .replaceAll("</a>", "</span>");
      data.cover = value.data.cover;
      data.author_name = value.data.author_name;
      data.updated_at = value.data.updated_at;
    },
    (reason) => {
      data.title = "加载失败";
      data.content = "错误原因：" + String(reason);
    }
  );
}

watch(
  () => route.params,
  (to, _) => {
    update_news_info();
  }
);

update_news_info();
</script>

<style lang="less" scoped>
.container {
  padding: 0.5rem 1rem;
  text-align: left;
}
.title {
  font-size: 1.3rem;
  font-weight: bold;
  margin: 1rem 0;
}
.content :deep(p) {
  line-height: 1.7rem;
}
.cover {
  width: 100%;
  border-radius: 4px;
}
.meta {
  font-size: 0.8rem;
  color: #757575;
}
</style>
