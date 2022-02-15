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
import { watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { NewsData } from "../NewsData";

let data = reactive({
  content: "载入中...",
  title: "正在努力为您加载新闻...",
  cover: "",
  author_name: "",
  updated_at: "",
});

let route = useRoute();
let post_id: string = route.params.post_id as string;
let news_cache: string | null | NewsData[] =
  sessionStorage.getItem("news_cache");
let news_cache_map: Map<string, NewsData> = new Map();

// 构建 post_id -> NewsData 的 Map
if (news_cache) {
  news_cache = JSON.parse(news_cache as string);
  (news_cache as NewsData[]).forEach((news_data) => {
    news_cache_map.set(news_data.post_id, news_data);
  });
}

/** 更新新闻信息。
 *
 * 尝试读取缓存，没有则立即获取。
 */
function update_news_info() {
  if (!news_cache_map.has(post_id)) {
    axios.get("https://unidemo.dcloud.net.cn/api/news/36kr/" + post_id).then(
      (value) => {
        use_NewsData(value.data);
      },
      (reason) => {
        data.title = "加载失败";
        data.content = "错误原因：" + String(reason);
      }
    );
  } else {
    use_NewsData(news_cache_map.get(post_id) as NewsData);
  }
}

/**
 * 让组件直接使用某个 NewsData
 */
function use_NewsData(news_data: NewsData) {
  document.title = data.title = news_data.title + "...";
  data.content = news_data.content as string;
  data.cover = news_data.cover;
  data.author_name = news_data.author_name;
  data.updated_at = news_data.updated_at;
}

// 监听参数变化
watch(
  () => route.params,
  (to, _) => {
    update_news_info();
  }
);

(document.querySelector("#app") as Element).scroll({ top: 0 });
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

.content :deep(img) {
  max-width: 100%;
  display: block;
  margin: auto;
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
