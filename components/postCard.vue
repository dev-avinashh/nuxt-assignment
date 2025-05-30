<template>
    <div
      class="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 border border-gray-100 hover:-translate-y-1 transform"
    >
      <h2 class="text-2xl font-semibold text-gray-800 mb-2 line-clamp-2">{{ post.title }}</h2>
      <p class="text-gray-600 text-sm mb-4 line-clamp-3">{{ post.body }}</p>
  
      <div class="flex items-center justify-between mt-4">
        <NuxtLink
          :to="`/posts/${post.id}`"
          class="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
        >
          Read more →
        </NuxtLink>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps(['post'])
  </script>
  