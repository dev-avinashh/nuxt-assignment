<template>
    <div class="px-6 py-10 bg-blue-50 min-h-screen">
      <div class="max-w-6xl mx-auto space-y-6">
        <div class="flex flex-wrap items-center gap-4">
          <input
            v-model="searchInput"
            type="text"
            placeholder="Search posts..."
            class="px-4 py-2 rounded-xl border shadow w-full sm:w-1/2"
          />
  
          <select
            v-model="sortKey"
            @change="handleSort"
            class="px-3 py-2 rounded-xl border shadow"
          >
            <option value="">Sort by</option>
            <option value="title">Title</option>
          </select>
  
          <select
            v-model="sortOrder"
            @change="handleSort"
            class="px-3 py-2 rounded-xl border shadow"
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
  
        <div v-if="postStore.loading" class="text-center py-10 text-gray-600">
          Loading posts...
        </div>
  
        <div
          v-else-if="postStore.posts.length === 0"
          class="text-center py-10 text-gray-600"
        >
          No posts found.
        </div>
  
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
        >
          <postCard v-for="post in paginatedPosts" :key="post.id" :post="post" />
        </div>
        <div v-if="totalPages > 1" class="w-full flex justify-center mt-8">
          <div class="flex justify-center gap-2 mt-8">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="changePage(page)"
              class="px-4 py-2 rounded-xl border cursor-pointer"
              :class="{
                'bg-blue-500 text-white': currentPage === page,
                'bg-white text-gray-700': currentPage !== page,
              }"
            >
              {{ page }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { usePostStore } from "~/stores/post";
  import PostCard from "~/components/postCard.vue";
  
const postStore = usePostStore();
const searchInput = ref("");
const sortKey = ref("");
const sortOrder = ref("asc");
let timer = ref(null);
const currentPage = ref(1);
const postsPerPage = 6;
  
  const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * postsPerPage;
    const end = start + postsPerPage;
    return postStore.posts.slice(start, end);
  });
  
  const totalPages = computed(() => {
    return Math.ceil(postStore.posts.length / postsPerPage);
 });


watch(searchInput, (newValue) => {
    clearTimeout(timer.value);
  timer.value = setTimeout(() => {
    postStore.setSearchQuery(newValue.trim());
    currentPage.value = 1;
  }, 400);
});
  
  onMounted(() => {
    postStore.fetchPosts();
  });
  
  
  function handleSort() {
    postStore.setSort(sortKey.value, sortOrder.value);
    currentPage.value = 1;
  }
  
  function changePage(page) {
    currentPage.value = page;
  }
  </script>
  