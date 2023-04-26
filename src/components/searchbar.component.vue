<template>
  <div class="wrapper">
    <h1 class="wrapper__headline text--white">dev articles</h1>
    <div class="container container--searchbar searchbar">
      <div class="searchbar__text-filter">
        <label class="label vertical-align--middle pr-2" for="latest_only">
          <img
            class="text-filter__icon"
            src="@/assets/search-icon.svg"
            alt="small magnifier icon"
          />
        </label>
        <input
          class="input"
          type="text"
          name="text_filter"
          id="text_filter"
          placeholder="Filter by title, author ..."
          v-model="filterTextValue"
          @input="getFilterSettings"
        />
      </div>
      <div class="searchbar__dropdown-filter">
        <select class="select" v-model="sortByValue" @change="getFilterSettings">
          <option value="">All Results</option>
          <option value="author">Author Name</option>
          <option value="asce_date">Date ↑ (asce)</option>
          <option value="desc_date">Date ↓ (desc)</option>
        </select>
      </div>
      <div class="searchbar__latest-filter">
        <input
          class="input input--checkbox"
          type="checkbox"
          name="latest_only"
          id="latest_only"
          v-model="filterLatestValue"
          @change="getFilterSettings"
        />
        <label class="label ml-2" for="latest_only">Latest only</label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useArticlesStore } from '@/stores/dev-articles'
export default {
  title: 'searchbar',
  data() {
    return {
      filterTextValue: '',
      filterLatestValue: false,
      sortByValue: ''
    }
  },
  methods: {
    ...mapActions(useArticlesStore, ['getFilteredData']),
    getFilterSettings() {
      const filters = {
        filterByText: this.filterTextValue,
        filterByCurrentYear: this.filterLatestValue,
        sortBy: this.sortByValue
      }
      this.getFilteredData(filters)
    }
  }
}
</script>
