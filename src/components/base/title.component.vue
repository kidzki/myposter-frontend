<template>
  <div class="display--flex align-items--center">
    <div class="title">
      <p class="title__initials m-0 text--white">{{ getInitials }}</p>
    </div>
    <div class="ml-2">
      <p class="text--bold mb-0 line-height--15">{{ this.author }}</p>
      <p class="text--light mt-0 text--accent line-height--15">{{ getFormatedDate }}</p>
    </div>
  </div>
</template>
<script>
export default {
  title: 'card-title',
  props: {
    author: {
      type: String,
      required: false
    },
    date: {
      type: String,
      required: false
    }
  },

  computed: {
    getInitials() {
      const name = this.author.split(' ')
      return name[0].charAt(0) + name[1].charAt(0)
    },
    getFormatedDate() {
      const date = new Date(this.date)
      return new Intl.DateTimeFormat('default', { month: 'short', day: '2-digit' }).format(date)
    }
  }
}
</script>
