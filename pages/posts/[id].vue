<template>
    <div class="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 px-6 py-12">
      <div class="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 transition">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ post?.title }}</h1>
  
        <div class="text-gray-700 text-lg leading-relaxed mb-6">
          {{ post?.body }}
        </div>
  
        <div class="flex flex-wrap gap-2 mb-6">
          <span
            v-for="tag in post?.tags"
            :key="tag"
            class="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full"
          >
            #{{ tag }}
          </span>
        </div>
  
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-600 mb-6">
          <div class="bg-gray-50 p-4 rounded-xl text-center shadow-sm">
            <p class="text-xl font-semibold text-blue-600">{{ post?.reactions?.likes }}</p>
            <p>Likes</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-xl text-center shadow-sm">
            <p class="text-xl font-semibold text-red-500">{{ post?.reactions?.dislikes }}</p>
            <p>Dislikes</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-xl text-center shadow-sm">
            <p class="text-xl font-semibold">{{ post?.views }}</p>
            <p>Views</p>
          </div>
        </div>
  
        <p class="text-sm text-gray-500">Posted by User #{{ post?.userId }}</p>
  
        <NuxtLink
          to="/"
          class="inline-block mt-8 text-blue-600 hover:text-blue-800 font-semibold transition"
        >
          ← Back to Posts
        </NuxtLink>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  import { usePostStore } from '~/stores/post'
  import { onMounted, ref } from 'vue'
  
  const route = useRoute()
  const postStore = usePostStore()
  const post = ref(null)
  
  onMounted(async () => {
    if (postStore.posts.length === 0) {
      await postStore.fetchPosts()
    }
  
    post.value = postStore.getPostById(route.params.id)
  })
  </script>
  