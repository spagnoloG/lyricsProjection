<template>
  <v-app>
    <navigation-drawer></navigation-drawer>
>
    <navbar></navbar>

    <v-main>
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
    </v-main>

    <v-footer>
      <v-snackbar v-model="snackbar.show">
        {{ snackbar.content }}
        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="hideSnackbar">Zapri</v-btn>
        </template>
      </v-snackbar>
    </v-footer>
  </v-app>
</template>

<script>
import Navbar from './views/globalComponents/Navbar.vue'
import NavigationDrawer from './views/globalComponents/NavigationDrawer.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    Navbar,
    NavigationDrawer
  },
  computed: {
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
