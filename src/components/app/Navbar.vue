<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('click')">
          <v-icon right>mdi-menu</v-icon>
        </a>
        <span class="black-text">{{ date | date('datetime') }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{name}}
            <v-icon right>mdi-chevron-down</v-icon>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <v-icon right>mdi-account-circle</v-icon>{{'navbar.profile' | localize}}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <v-icon right>mdi-logout</v-icon>{{'navbar.logout' | localize}}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null
  }),
  methods: {
    async logout() {
      let locale = this.$store.getters.info.locale
      await this.$store.dispatch('logout')
      this.$router.push({
        name: 'login',
        query: {
          message: 'logout',
          locale: locale
        }
      })
    }
  },
  computed: {
    name() {
      return this.$store.getters.info.name
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true
    })
  },
  beforeDestroy() {
    clearInterval(this.interval)
    if(this.dropdown && this.dropdown.destroy)
    {
      this.dropdown.destroy()
    }
  }
}
</script>
