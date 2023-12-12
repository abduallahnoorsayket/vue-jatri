import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    posts: [],
    count: 10,
  },
  mutations: {
    setPosts(state, newData) {
      state.posts = newData;
    },
  },
  actions: {
    fetchPosts({ commit }) {
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          commit("setPosts", response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  },
  getters: {
    getPosts: (state) => state.posts,
  },
});
export default store;
