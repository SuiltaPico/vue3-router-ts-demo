<template>
  <div>
    <div v-if="error">{{ error }}</div>
    <NewsItem
      v-for="news_info in api_results"
      :news_info="news_info"
      :key="news_info.post_id"
    ></NewsItem>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import NewsItem from "./NewsItem.vue";
export default defineComponent({
  name: "NewsList",
  components: {
    NewsItem,
  },
});
</script>

<script lang="ts" setup>
import axios from "axios";
import { ref, Ref } from "vue";
import { NewsData } from "../NewsData";

document.title = "新闻列表";

let error: Ref<string> = ref("");
let api_results: NewsData[] = reactive([]);

let news_cache: string | null | NewsData[] =
  sessionStorage.getItem("news_cache");

// 临时缓存新闻数据至 sessionStorage 的 news_cache 项至下一次会话。
if (!news_cache) {
  // 若刚刚载入会话则进行加载与缓存
  axios.get("https://unidemo.dcloud.net.cn/api/news").then(
    (value) => {
      sessionStorage.setItem("news_cache", JSON.stringify(value.data));
      news_cache = value.data;
      api_results.push.apply(api_results, news_cache as NewsData[]);
    },
    (reason) => {
      error.value = String(reason);
    }
  );
} else {
  news_cache = JSON.parse(news_cache as string);
  api_results.push.apply(api_results, news_cache as NewsData[]);
}
</script>
