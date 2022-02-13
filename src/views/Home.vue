<template>
  <news-list></news-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NewsList from "/src/components/NewsList.vue";

export default defineComponent({
  name: "Home",
  components: {
    NewsList,
  },
});
</script>
