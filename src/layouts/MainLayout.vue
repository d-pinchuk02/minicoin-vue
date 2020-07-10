<template>
  <v-app>
    <Navbar @click="sidebarOpen = !sidebarOpen" />
    <Sidebar :value="sidebarOpen" :key="locale" />
    <Loader v-if="loading" />
    <v-content v-else>
      <v-container
        fluid
        class="grey lighten-4 fill-height"
      >
        <router-view />
      </v-container>
    </v-content>

    <v-btn
      fixed
      dark
      fab
      bottom
      right
      color="blue"
      to="record"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
import Navbar from "@/components/app/Navbar"
import Sidebar from "@/components/app/Sidebar"
import localizeFilter from '@/filters/localize.filter'

export default {
  name: "main-layout",
  data: () => ({
    sidebarOpen: true,
    loading: true
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo")
    }

    this.loading = false;
  },
  components: {
    Navbar,
    Sidebar
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
    locale() {
      return this.$store.getters.info.locale
    }
  },
  watch: {
    error (fbError) {
      this.$error(localizeFilter('msg.' + fbError.code) || localizeFilter('msg.unknownError'))
    }
  }
};
</script>
