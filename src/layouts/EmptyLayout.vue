<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error (fbError) {
      this.$error(localizeFilter('msg.' + fbError.code) || localizeFilter('msg.unknownError'))
    }
  }
}
</script>
