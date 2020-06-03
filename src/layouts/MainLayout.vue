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
            <i class="large material-icons">add</i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar"
import Sidebar from "@/components/app/Sidebar"
import messages from '@/utils/messages'

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
      // TODO: translate message
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  }
};
</script>
