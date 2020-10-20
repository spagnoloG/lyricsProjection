<template>
    <v-app-bar app clipped-left  dark class="primary">
      <v-app-bar-nav-icon @click.stop="switchDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ appState.appName ? appState.appName : 'lyricsProjection'}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon
      @click="toggleDarkMode"
      >mdi-weather-sunset</v-icon>
    </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters({
      drawer: 'appState/getDrawerState',
      darkMode: 'appState/getThemeState',
      appState: 'appState/getAppState'
    })
  },
  methods: {
    switchDrawer () {
      this.$store.dispatch('appState/setDrawerState', !this.drawer)
    },
    toggleDarkMode () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      localStorage.setItem('dark_theme', this.$vuetify.theme.dark.toString())
    }
  }
}
</script>
