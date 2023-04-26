<template>
  <div class="card">
    <div class="card__header">
      <img
        class="card__header--picture"
        :src="article?.images[0].landscape[1]"
        alt="image downloaded from picsum.photos"
        loading="lazy"
      />
    </div>
    <div class="card__author mx-4">
      <card-title :author="article?.author" :date="article?.dateAdded"></card-title>
    </div>
    <div class="card__title mx-4">
      <p class="text--bold m-0">{{ article?.title }}</p>
    </div>
    <div class="card__social mx-4 display--flex justify-content--space-between align-items--center">
      <like-button @click="like" :isLiked="liked" title="like" />
      <div class="card__social--comments text--light display--flex text--accent">
        <img src="@/assets/heart-icon.svg" alt="heart icon" loading="lazy">
        <p class="pl-1">{{ article!.likes + addLike }} likes</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import type Post from '@/interfaces/post.interface'
import CardTitle from '@/components/base/title.component.vue'
import LikeButton from '@/components/base/button.component.vue'

export default {
  components: {
    CardTitle,
    LikeButton
  },
  props: {
    article: Object as () => Post
  },
  data() {
    return {
      liked: false
    }
  },
  methods: {
    like() {
      this.liked = !this.liked
    }
  },
  computed: {
    addLike(): number {
      return this.liked ? 1 : 0
    }
  }
}
</script>
