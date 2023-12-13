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
              <li class="page-item active">
                <a class="page-link" href="#">{{ current }}</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">{{ current + 1 }}</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">{{ current + 2 }}</a>
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
import { ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "PostList",

  setup() {
    const store = useStore();
    const sortOrder = ref("asc");
    const titleSearch = ref(null);
    const current = ref(1);
    const pageSize = ref(10);

    onMounted(() => {
      fetchPosts();
    });

    // Fetch posts
    const fetchPosts = () => {
      store.dispatch("fetchPosts");
    };

    // Order by title method
    const orderByTitle = (order) => {
      sortOrder.value = order;
    };

    // Pagination methods
    const prev = () => {
      current.value--;
    };

    const next = () => {
      current.value++;
    };

    // Computed properties

    // For pagination
    const indexStart = computed(() => (current.value - 1) * pageSize.value);
    const indexEnd = computed(() => indexStart.value + pageSize.value);

    const paginated = computed(() => {
      if (titleSearch.value) {
        return store.state.posts
          .slice(indexStart.value, indexEnd.value)
          .filter((item) =>
            titleSearch.value
              .toLowerCase()
              .split(" ")
              .every((v) => item.title.toLowerCase().includes(v))
          );
      } else if (sortOrder.value) {
        return store.state.posts
          .slice(indexStart.value, indexEnd.value)
          .sort((a, b) =>
            sortOrder.value === "asc"
              ? a.title.localeCompare(b.title)
              : b.title.localeCompare(a.title)
          );
      } else {
        return store.state.posts.slice(indexStart.value, indexEnd.value);
      }
    });

    // Watch for changes
    watch(current, () => {
      fetchPosts();
    });

    // Return values
    return {
      sortOrder,
      titleSearch,
      current,
      pageSize,
      fetchPosts,
      orderByTitle,
      prev,
      next,
      indexStart,
      indexEnd,
      paginated,
    };
  },
};
</script>

<style></style>
