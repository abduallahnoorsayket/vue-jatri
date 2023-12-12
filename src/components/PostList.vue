<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-12">
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Post ID</th>
                <th scope="col">User ID</th>
                <th scope="col">Post Title</th>
                <th scope="col">Post Body</th>
              </tr>
            </thead>
            <tbody v-if="all_posts">
              <tr v-for="(item, index) in all_posts" :key="index">
                <td>{{ item.id }}</td>
                <td>{{ item.userId }}</td>

                <td>{{ item.title }}</td>
                <td>{{ item.body }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  name: "PostList",
  data() {
    return {};
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      this.$store.dispatch("fetchPosts");
    },
  },
  computed: {
    all_posts() {
      return this.$store.getters.getPosts;
      // .slice()
      // .sort((a, b) => new Date(b.date) - new Date(a.date));
    },
  },
};
</script>

<style></style>
