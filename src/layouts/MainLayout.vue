<template>
  <div >
    <Loader v-if="loading" />
    <div v-else>
      <div class="app-main-layout">
        <Navbar @click="sidebarOpen = !sidebarOpen" />

        <Sidebar v-model="sidebarOpen" :key="locale" />

        <main class="app-content" :class="{full: !sidebarOpen}">
          <div class="app-page">
            <router-view />
          </div>
        </main>

        <div class="fixed-action-btn">
          <router-link class="btn-floating btn-large blue" to="/record">
            <v-icon dark>mdi-plus</v-icon>
          </router-link>
        </div>
      </div>
    </div>
  </div>
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
