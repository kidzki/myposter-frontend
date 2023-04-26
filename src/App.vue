<template>
  <header class="header">
    <searchbar></searchbar>
  </header>
  <main>
    <div class="container mt-10">
      <article-list></article-list>
    </div>
  </main>
</template>

<script setup lang="ts">
import searchbar from '@/components/searchbar.component.vue'
import ArticleList from '@/components/article-list.component.vue'
import { useArticlesStore } from '@/stores/dev-articles'
useArticlesStore().fetchArticles()
</script>
