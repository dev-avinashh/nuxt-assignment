import { defineStore } from "pinia";

export const usePostStore = defineStore("post", {
  state: () => ({
    posts: [],
    searchQuery: "",
    sortKey: "",
    sortOrder: "asc",
    loading: false,
  }),

  actions: {
    async fetchPosts() {
      this.loading = true;

      let url = "https://dummyjson.com/posts";

      const hasSearch = this.searchQuery.trim() !== "";
      const hasSort = this.sortKey !== "";

      if (hasSearch) {
        url = `https://dummyjson.com/posts/search?q=${encodeURIComponent(
          this.searchQuery
        )}`;
      } else if (hasSort) {
        url = `https://dummyjson.com/posts?sortBy=${this.sortKey}&order=${this.sortOrder}`;
      }

      try {
        const res = await fetch(url);
        const data = await res.json();
        this.posts = data.posts;
      } catch (e) {
        console.error("Failed to fetch posts:", e);
      } finally {
        this.loading = false;
      }
    },

    async fetchPostById(id) {
      try {
        const res = await fetch(`https://dummyjson.com/posts/${id}`);
        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Error fetching post:", error);
        return null;
      }
    },

    async setSearchQuery(query) {
      this.searchQuery = query;
      await this.fetchPosts();
    },

    async setSort(key, order = "asc") {
      this.sortKey = key;
      this.sortOrder = order;
      await this.fetchPosts();
    },
  },
});
