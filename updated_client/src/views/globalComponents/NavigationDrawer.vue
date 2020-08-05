<template>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>

        <v-list-item :to="{name: 'Home'}">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Domov</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{name: 'Playlists'}">
          <v-list-item-action >
            <v-icon>mdi-presentation-play</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Seznami predvajanj</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{name: 'Add'}">
          <v-list-item-action >
            <v-icon>mdi-music</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dodaj novo pesem</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{name: 'List'}">
          <v-list-item-action >
            <v-icon>mdi-playlist-music</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Seznam pesmi</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{name: 'AddPsalm'}">
          <v-list-item-action >
            <v-icon>mdi-script-text</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dodaj nov Psalm</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{name: 'ListPsalms'}">
          <v-list-item-action >
            <v-icon>mdi-format-list-text</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Seznam Psalmov</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{name: 'Options'}">
          <v-list-item-action >
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Možnosti</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{name: 'About'}">
          <v-list-item-action >
            <v-icon>mdi-information</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>O aplikaciji</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'navigationDrawer',
  computed: {
    ...mapGetters({
      drawerState: 'appState/getDrawerState'
    }),
    drawer: {
      get () {
        return this.drawerState
      },
      set (newState) {
        this.$store.dispatch('appState/setDrawerState', newState)
      }
    }
  }
}
</script>

<style>
</style>
