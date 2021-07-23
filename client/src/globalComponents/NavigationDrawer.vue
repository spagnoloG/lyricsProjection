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
            <v-list-item-title>{{ $t(route.routeName) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-container>
        <v-row>
          <v-col>
            <v-select
              v-model="locale"
              :items="langs"
              persistent-hint
              return-object
              single-line
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
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
          routeName: 'List of Lyrics',
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
      ],
      langs: ['en', 'si']
    }
  },

  computed: {
    ...mapGetters({
      drawerState: 'appState/getDrawerState',
      currentLocale: 'appState/getLocale'
    }),
    drawer: {
      get () {
        return this.drawerState
      },
      set (newState) {
        this.$store.dispatch('appState/setDrawerState', newState)
      }
    },
    locale: {
      get () {
        return this.currentLocale
      },
      set (newLocale) {
        this.$root.$i18n.locale = newLocale
        this.$store.dispatch('appState/changeLocale', newLocale)
      }
    }
  }
}
</script>
