import { defineStore } from 'pinia'

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: []
  }),
  actions: {
    async fetchPosts() {
      const res = await fetch('https://dummyjson.com/posts')
      const data = await res.json()
      this.posts = data.posts
    },

    getPostById(id) {
      return this.posts.find(post => post.id === parseInt(id))
    }
  }
})
