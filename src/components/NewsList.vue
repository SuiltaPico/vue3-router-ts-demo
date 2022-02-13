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

let error: Ref<string> = ref("");
let api_results = reactive([]);

axios.get("https://unidemo.dcloud.net.cn/api/news").then(
  (value) => {
    api_results.push.apply(api_results, value.data);
  },
  (reason) => {
    error.value = String(reason);
  }
);
</script>
