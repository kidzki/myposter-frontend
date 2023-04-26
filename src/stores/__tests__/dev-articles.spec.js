// stores/counter.spec.ts
import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useArticlesStore } from '@/stores/dev-articles.ts'
import * as ApiResponseMock from '@/assets/mocks/api-response.json'

global.fetch = vi.fn()

function createFetchResponse(data) {
  return { json: () => new Promise((resolve) => resolve(data)) }
}

describe('Articles Store', () => {
  beforeEach(() => {
    beforeEach(() => {
      global.fetch.mockReset()
    })
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('should fetch articles', async () => {
    const store = useArticlesStore()
    const ArticlesApiResponse = ApiResponseMock

    fetch.mockResolvedValue(createFetchResponse(ArticlesApiResponse))
    await store.fetchArticles()
    expect(store.articles).toHaveLength(9)
  })
})

describe('Filtering', () => {
  it('should filter by text', async () => {
    const store = useArticlesStore()
    const ArticlesApiResponse = ApiResponseMock
    const filter = {
      filterByText: 'cypress',
      filterByCurrentYear: false,
      sortBy: ''
    }
    fetch.mockResolvedValue(createFetchResponse(ArticlesApiResponse))
    await store.fetchArticles()
    store.getFilteredData(filter)
    expect(store.filteredArticles).toHaveLength(2)
  }),
    it('should filter by latest Date', async () => {
      const store = useArticlesStore()
      const ArticlesApiResponse = ApiResponseMock
      const filter = {
        filterByText: '',
        filterByCurrentYear: true,
        sortBy: ''
      }
      fetch.mockResolvedValue(createFetchResponse(ArticlesApiResponse))
      await store.fetchArticles()
      store.getFilteredData(filter)
      expect(store.filteredArticles).toHaveLength(0)
    }),
    it('should sort by author name', async () => {
      const store = useArticlesStore()
      const ArticlesApiResponse = ApiResponseMock
      const filter = {
        filterByText: '',
        filterByCurrentYear: false,
        sortBy: 'author'
      }
      fetch.mockResolvedValue(createFetchResponse(ArticlesApiResponse))
      await store.fetchArticles()
      store.getFilteredData(filter)
      expect(store.filteredArticles).toHaveLength(9)
      expect(store.filteredArticles[0].author).toBe('Andreas FrontendOps')
    }),
    it('should sort by asce date', async () => {
      const store = useArticlesStore()
      const ArticlesApiResponse = ApiResponseMock
      const filter = {
        filterByText: '',
        filterByCurrentYear: false,
        sortBy: 'asce_date'
      }
      fetch.mockResolvedValue(createFetchResponse(ArticlesApiResponse))
      await store.fetchArticles()
      store.getFilteredData(filter)
      expect(store.filteredArticles).toHaveLength(9)
      expect(store.filteredArticles[0].dateAdded).toBe('2019-02-25')
      expect(store.filteredArticles[8].dateAdded).toBe('2022-01-21')
    })
  it('should sort by desc date', async () => {
    const store = useArticlesStore()
    const ArticlesApiResponse = ApiResponseMock
    const filter = {
      filterByText: '',
      filterByCurrentYear: false,
      sortBy: 'desc_date'
    }
    fetch.mockResolvedValue(createFetchResponse(ArticlesApiResponse))
    await store.fetchArticles()
    store.getFilteredData(filter)
    expect(store.filteredArticles).toHaveLength(9)
    expect(store.filteredArticles[0].dateAdded).toBe('2022-01-21')
    expect(store.filteredArticles[8].dateAdded).toBe('2019-02-25')
  })
})
