<template>
    <div class="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 px-4 py-10">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-4xl font-bold text-center text-gray-800 mb-10">📝 Latest Posts</h1>
  
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <postCard v-for="post in posts" :key="post.id" :post="post" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { usePostStore } from '~/stores/post'
  import PostCard from '~/components/postCard.vue'
  import { onMounted } from 'vue'
  
  const postStore = usePostStore()
  const posts = postStore.posts
  
  onMounted(async () => {
    if (posts.length === 0) {
      await postStore.fetchPosts()
    }
  })
  </script>
  