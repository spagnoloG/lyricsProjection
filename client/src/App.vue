<template>
  <v-app>
    <navigation-drawer
      v-if="
        $router.currentRoute.name !== 'Display' &&
        $router.currentRoute.name !== 'Print' &&
        $router.currentRoute.name !== 'Init' &&
        $router.currentRoute.name !== 'FourOhFour' &&
        $router.currentRoute.name !== 'DbError'
      "
    ></navigation-drawer>

    <navbar
      v-if="
        $router.currentRoute.name !== 'Display' &&
        $router.currentRoute.name !== 'Print' &&
        $router.currentRoute.name !== 'Init' &&
        $router.currentRoute.name !== 'FourOhFour' &&
        $router.currentRoute.name !== 'DbError'
      "
    ></navbar>

    <v-main>

      <v-fade-transition mode="out-in">
        <alert-banner></alert-banner>
      </v-fade-transition>

      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-main>

    <footer-component
      v-if="
        $router.currentRoute.name !== 'Display' &&
        $router.currentRoute.name !== 'Print' &&
        $router.currentRoute.name !== 'Init' &&
        $router.currentRoute.name !== 'FourOhFour'  &&
        $router.currentRoute.name !== 'DbError'
      "
    >
    </footer-component>
    <v-overlay :value="!finishedLoading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import Navbar from './globalComponents/Navbar.vue'
import NavigationDrawer from './globalComponents/NavigationDrawer.vue'
import Footer from './globalComponents/Footer.vue'
import AlertBanner from './globalComponents/AlertBanner.vue'

export default {
  name: 'App',

  components: {
    Navbar,
    NavigationDrawer,
    'footer-component': Footer,
    AlertBanner
  },

  data () {
    return {
      finishedLoading: false
    }
  },

  async created () {
    const theme = localStorage.getItem('dark_theme')
    await this.$store.dispatch('appState/fetchState')
    const fetchedState = this.$store.getters['appState/getAppState']

    if (this.$store.getters['appState/getDbConnection'] === false) {
      this.$router.push({ path: '/db-error' })
    } else if (fetchedState === -1) {
      this.$router.push({ path: '/init' })
    }

    this.$root.$i18n.locale = this.$store.getters['appState/getLocale']

    this.finishedLoading = true

    if (theme) {
      if (theme === 'true') {
        this.$vuetify.theme.dark = true
      } else {
        this.$vuetify.theme.dark = false
      }
    }
  }
}
</script>
