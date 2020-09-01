<template>
  <v-app>
    <navigation-drawer v-if="$router.currentRoute.name !== 'Display'"></navigation-drawer>

    <navbar v-if="$router.currentRoute.name !== 'Display'"></navbar>

    <v-main>
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
    </v-main>

    <div>
      <v-snackbar v-model="snackbar.show">
        {{ snackbar.content }}
        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="hideSnackbar">Zapri</v-btn>
        </template>
      </v-snackbar>
    </div>

    <footer-component v-if="$router.currentRoute.name !== 'Display'">
    </footer-component>
  </v-app>
</template>

<script>
import Navbar from './globalComponents/Navbar.vue'
import NavigationDrawer from './globalComponents/NavigationDrawer.vue'
import Footer from './globalComponents/Footer.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    Navbar,
    NavigationDrawer,
    'footer-component': Footer
  },
  computed: {
    route () {
      return this.$router.currentRoute.name
    },
    ...mapGetters({
      snackbar: 'appState/getSnackbar'
    })
  },
  methods: {
    hideSnackbar () {
      this.$store.dispatch('appState/hideSnackbar')
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
