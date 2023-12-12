<template>
  <div>
    <PostList />
  </div>
</template>

<script>
import PostList from "./components/PostList.vue";
export default {
  name: "App",
  components: { PostList },
  // beforeCreate() {
  //   this.$store.dispatch("fetchPosts");
  // },
};
</script>

<style></style>
