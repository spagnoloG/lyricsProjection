<template>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>

        <v-list-item
        v-for="(route, i) in routes"
        :key="i"
        router
        :to="route.route">
          <v-list-item-action>
            <v-icon>{{ route.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ route.routeName }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'navigationDrawer',

  data () {
    return {
      routes: [
        {
          route: '/home',
          routeName: 'Home',
          icon: 'mdi-home'
        },
        {
          route: '/list-playlists',
          routeName: 'List Playlists',
          icon: 'mdi-presentation-play'
        },
        {
          route: '/add-lyric',
          routeName: 'Add new Lyric',
          icon: 'mdi-music'
        },
        {
          route: '/list-lyrics',
          routeName: 'List Lyrics',
          icon: 'mdi-playlist-music'
        },
        {
          route: '/options',
          routeName: 'Options',
          icon: 'mdi-cog'
        },
        {
          route: '/remote',
          routeName: 'Remote Controller',
          icon: 'mdi-remote'
        }
      ]
    }
  },

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
