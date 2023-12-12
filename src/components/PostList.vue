<template>
  <div class="container">
    <div class="mt-5 d-flex justify-content-space-between">
      <div class="card-body">
        <input
          type="text"
          class="form-control"
          v-model="titleSearch"
          placeholder="Search with post title by typing ... "
        />
      </div>
      <div class="card-body mt-1">
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
    <div class="row mt-3 mb-3">
      <div class="col-md-12">
        <div class="table-responsive">
          <table class="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th class="col-md-1">Post ID</th>
                <th class="col-md-1">User ID</th>
                <th class="col-md-3">Post Title</th>
                <th class="col-md">Post Body</th>
              </tr>
            </thead>
            <tbody v-if="paginated">
              <tr v-for="(item, index) in paginated" :key="index">
                <th>{{ item.id }}</th>
                <td>{{ item.userId }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.body }}</td>
              </tr>
            </tbody>
          </table>
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item">
                <a class="page-link" href="#" tabindex="-1" @click="prev"
                  >Previous</a
                >
              </li>
              <li class="page-item">
                <a class="page-link" href="#">Page No : {{ current }}</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#" @click="next()">Next</a>
              </li>
            </ul>
          </nav>
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
    return {
      sortOrder: "asc",
      titleSearch: null,
      current: 1,
      pageSize: 10,
    };
  },
  created() {
    this.fetchPosts();
  },

  methods: {
    fetchPosts() {
      this.$store.dispatch("fetchPosts");
    },
    orderByTitle(order) {
      this.sortOrder = order;
    },
    // pagination
    prev() {
      this.current--;
    },
    next() {
      this.current++;
    },
  },
  computed: {
    all_posts() {
      if (this.titleSearch) {
        return this.$store.state.posts.filter((item) => {
          return this.titleSearch
            .toLowerCase()
            .split(" ")
            .every((v) => item.title.toLowerCase().includes(v));
        });
      } else {
        return this.$store.state.posts
          .slice()
          .sort((a, b) =>
            this.sortOrder === "asc"
              ? a.title.localeCompare(b.title)
              : b.title.localeCompare(a.title)
          );
      }
    },
    //for pagination
    indexStart() {
      return (this.current - 1) * this.pageSize;
    },
    indexEnd() {
      return this.indexStart + this.pageSize;
    },
    paginated() {
      if (this.titleSearch) {
        return this.$store.state.posts
          .slice(this.indexStart, this.indexEnd)
          .filter((item) => {
            return this.titleSearch
              .toLowerCase()
              .split(" ")
              .every((v) => item.title.toLowerCase().includes(v));
          });
      } else if (this.sortOrder) {
        return this.$store.state.posts
          .slice(this.indexStart, this.indexEnd)
          .sort((a, b) =>
            this.sortOrder === "asc"
              ? a.title.localeCompare(b.title)
              : b.title.localeCompare(a.title)
          );
      } else {
        return this.$store.state.posts.slice(this.indexStart, this.indexEnd);
      }
    },
  },
};
</script>

<style></style>
