<template>
  <v-app>
    <navigation-drawer v-if="$router.currentRoute.name !== 'Display' && $router.currentRoute.name !== 'Print'"></navigation-drawer>

    <navbar v-if="$router.currentRoute.name !== 'Display' && $router.currentRoute.name !== 'Print'"></navbar>

    <v-main>
      <alert-banner></alert-banner>

        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>

    </v-main>

    <footer-component v-if="$router.currentRoute.name !== 'Display' && $router.currentRoute.name !== 'Print'">
    </footer-component>
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
  computed: {
    route () {
      return this.$router.currentRoute.name
    }
  },
  mounted () {
    const theme = localStorage.getItem('dark_theme')
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
