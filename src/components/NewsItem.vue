<template>
  <router-link
    class="container"
    :to="{
      name: 'NewsDetail',
      params: { post_id: news_info.post_id },
    }"
  >
    <div class="content">
      <img :src="news_info.author_avatar" alt="" class="author_avatar" />
      <div class="text-info">
        <div class="title">{{ news_info.title }}</div>
        <div class="published-at">{{ news_info.published_at }}</div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NewsItem",
});
</script>

<script lang="ts" setup>
import { NewsData } from "../NewsData";

const props = defineProps<{
  news_info: NewsData;
}>();
</script>

<style lang="less" scoped>
.container {
  display: block;
  text-decoration: none;
  color: inherit;
  user-select: none;
  cursor: inherit;
}
.container:active {
  background-color: #e0e0e0;
}
.container:visited {
  background-color: inherit;
}
.content {
  padding: 0.7rem 0;
  border-bottom: 1px solid #ddd;
  margin-left: 1rem;
  display: flex;
}
.author_avatar {
  width: 3rem;
  height: 3rem;
}
.text-info {
  padding: 0 0.8rem;
  text-align: left;
}
.title {
  font-size: 1.1rem;
  line-height: 1.7rem;
  margin-bottom: 0.2rem;
}
.published-at {
  text-align: left;
  font-size: 0.9rem;
  color: #757575;
}
</style>
