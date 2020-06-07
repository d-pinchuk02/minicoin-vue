<template>
  <v-app>
    <v-content class="grey darken-1">
      <v-container fluid class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" lg="5" sm="12" md="6">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
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
