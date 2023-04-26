// @ts-check
import { defineStore } from 'pinia'
import type Post from '@/interfaces/post.interface'
import type Filter from '@/interfaces/filter.interface'

export const useArticlesStore = defineStore('devArticlesStore', {
  state: () => ({
    articles: [] as Post[],
    filteredArticles: [] as Post[]
  }),
  actions: {
    async fetchArticles() {
      const result = await fetch('https://www.myposter.de/web-api/job-interview', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const response = await result.json()
      this.articles = response.payload.data
      this.filteredArticles = response.payload.data
    },

    filterByText(query: string, data: Post[]): Post[] {
      const searchLower = query.toLowerCase()
      return this.articles.filter((data) => {
        return (
          data.title.toLowerCase().includes(searchLower) ||
          data.author.toLowerCase().includes(searchLower)
        )
      })
    },

    filterByCurrentYear(data: Post[]): Post[] {
      // ANMERKUNG => Keine Daten, im Jahr 2023 keine Posts erstellt wurden
      const currentYear: string = new Date().getFullYear().toString()

      return this.articles.filter((data) => {
        return data.dateAdded.includes(currentYear)
      })
    },

    sortBy(query: string, data: Post[]): Post[] {
      switch (query) {
        case 'author':
          return data
            .filter((article) => article.author)
            .sort((a, b) => a.author.localeCompare(b.author))
        case 'asce_date':
          return data.sort((a, b) => {
            const dateA = Number(new Date(a.dateAdded))
            const dateB = Number(new Date(b.dateAdded))
            return dateA - dateB
          })
        case 'desc_date':
          return data.sort((a, b) => {
            const dateA = Number(new Date(a.dateAdded))
            const dateB = Number(new Date(b.dateAdded))
            return dateB - dateA
          })
        default:
          return data
      }
    },

    getFilteredData(queryObject: Filter) {
      let filteredData: Post[] = this.articles
      if (queryObject.filterByText) {
        filteredData = this.filterByText(queryObject.filterByText, filteredData)
      }

      if (queryObject.filterByCurrentYear) {
        filteredData = this.filterByCurrentYear(filteredData)
      }

      if (queryObject.sortBy) {
        filteredData = this.sortBy(queryObject.sortBy, filteredData)
      }

      this.$patch({ filteredArticles: filteredData })
    }
  }
})
