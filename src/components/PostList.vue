<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md"><h1>All post list</h1></div>
      <div class="col-md">
        <div class="card-body">
          <button
            class="btn btn-outline-primary btn-sm mr-3"
            @click="orderByTitle('asc')"
          >
            Title Order By Ascending
          </button>
          <button
            class="btn btn-outline-success btn-sm"
            @click="orderByTitle('desc')"
          >
            Title Order By Descending
          </button>
        </div>
      </div>
      <!--  -->
      <!-- <div class="card">
        <form>
          <div class="row">
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="First name"
              />
            </div>
            <div class="col">
              <input type="text" class="form-control" placeholder="Last name" />
            </div>
          </div>
        </form>
      </div> -->
    </div>
    <div class="row mt-2">
      <div class="col-md-12">
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th class="col-md-1">Post ID</th>
                <th class="col-md-1">User ID</th>
                <th class="col-md-3">Post Title</th>
                <th class="col-md">Post Body</th>
              </tr>
            </thead>
            <tbody v-if="all_posts">
              <tr v-for="(item, index) in all_posts" :key="index">
                <th>{{ item.id }}</th>
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
// import axios from "axios";
export default {
  components: {},
  name: "PostList",

  data() {
    return {
      sortOrder: "asc",
      //   post_lists: null,
    };
  },
  created() {
    this.fetchPosts();
  },
  updated() {
    // this.fetchPosts();
  },

  methods: {
    fetchPosts() {
      this.$store.dispatch("fetchPosts");
    },
    orderByTitle(order) {
      this.sortOrder = order;
    },
  },
  computed: {
    all_posts() {
      return this.$store.state.posts
        .slice()
        .sort((a, b) =>
          this.sortOrder === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        );
    },
  },
};
</script>

<style></style>
