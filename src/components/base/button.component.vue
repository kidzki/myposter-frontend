<template>
  <button :class="['button', { 'button--liked': isLiked }]">
    {{ title }}
  </button>
</template>
<script lang="ts">
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    isLiked: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss">
.button {
  border: 1px solid var(--mp-primary);
  color: var(--mp-primary);
  border-radius: 5px;
  background-color: white;
  text-transform: uppercase;
  padding: 5px 10px;

  &--liked {
    background-color: var(--mp-primary);
    color: white;
  }
}
</style>
