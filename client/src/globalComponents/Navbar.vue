<template>
    <v-app-bar app clipped-left class="primary">
      <v-app-bar-nav-icon @click.stop="switchDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Cerkvena projekcija</v-toolbar-title>
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
      darkMode: 'appState/getThemeState'
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

<style>
</style>
