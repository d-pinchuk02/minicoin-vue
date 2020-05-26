<template>
  <div>
    <div class="app-main-layout">

      <Navbar @click="sidebarOpen = !sidebarOpen" />

      <Sidebar v-model="sidebarOpen" />

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
</template>

<script>
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'

export default {
  name: 'main-layout',
  data: () => ({
    sidebarOpen: true
  }),
  async mounted() {
    if(!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
  },
  components: {
    Navbar, Sidebar
  },

}
</script>
