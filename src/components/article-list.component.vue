<template>
  <article-card
    v-for="(article, index) of filteredArticles"
    :key="index"
    :article="article"
  ></article-card>
</template>

<script lang="ts">
import ArticleCard from '@/components/base/card.component.vue'
import { mapState } from 'pinia'
import { useArticlesStore } from '@/stores/dev-articles'

export default {
  components: {
    ArticleCard
  },
  computed: {
    ...mapState(useArticlesStore, ['filteredArticles'])
  }
}
</script>
