<template>
  <v-app>
    <navigation-drawer v-if="$router.currentRoute.name !== 'Project'"></navigation-drawer>

    <navbar v-if="$router.currentRoute.name !== 'Project'"></navbar>

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

    <v-footer dark>
      <div>Župnija Šempeter pri Gorici</div>
      <v-spacer></v-spacer>
      <div> {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
import Navbar from './globalComponents/Navbar.vue'
import NavigationDrawer from './globalComponents/NavigationDrawer.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    Navbar,
    NavigationDrawer
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
