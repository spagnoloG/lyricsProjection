<template>
  <div class="main">
    <v-container fluid>
      <div class="select" v-if="step === 0">
        <v-row>
          <v-col></v-col>
          <v-col cols=10 md=6 align="center">
            <v-select
            :items="playlists"
            v-model="selectedPlaylist"
            item-text="playlistName"
            label="Izberi"
            prepend-icon="mdi-map"
            return-object
            single-line
            ></v-select>
          </v-col>
          <v-col></v-col>
        </v-row>
        <v-row>
          <v-col align="center">
            <v-btn
            @click="onProject"
            depressed
            large
            color="success"
            >Projeciraj  <v-icon>mdi-cast</v-icon></v-btn>
          </v-col>
        </v-row>
      </div>
      <v-row align="center" v-if="step === 1">
        <v-col>
          <div class="slide">
            <v-sheet
              class="mx-auto"
              elevation="8"
              max-width="800">
              <v-slide-group
              v-model="model"
              class="pa-4"
              active-class="success"
              show-arrows>
              <v-slide-item
                v-for="lyric in lyrics"
                :key="lyric.index"
                v-slot:default="{ active, toggle }">
                <v-card
                  :color="active ? undefined : 'grey lighten-1'"
                  class="ma-4 fill-height"
                  height="200"
                  width="200"
                  align="center"
                  justify="center"
                  @click="toggle">
                  <v-row>
                    <v-col>
                      <v-avatar color="black" size="48">
                        <span class="white--text headline">{{ lyric.index }}</span>
                      </v-avatar>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <h3>{{ lyric.title }}</h3>
                    </v-col>
                    <v-scale-transition>
                    </v-scale-transition>
                  </v-row>
                </v-card>
              </v-slide-item>
              </v-slide-group>
            </v-sheet>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <div class="slide-controller" v-if="step === 1">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      availablePlaylistNames: [],
      model: 'null',
      step: 0,
      selectedPlaylist: null,
      lyrics: []
    }
  },
  computed: {
    ...mapGetters({
      playlists: 'playlist/getAllPlaylists',
      allLyrics: 'lyric/getAllLyrics'
    })
  },
  methods: {
    getAvailableNames () {
      for (const playlist of this.playlists) {
        this.availablePlaylistNames.push(playlist.playlistName)
      }
    },
    onProject () {
      if (this.selectedPlaylist) {
        this.step++
        // Send data to socketio!!
        // bruh
        for (const index of this.selectedPlaylist.indexes) {
          const foundLyric = this.allLyrics.find(lyric => lyric.index === index)
          if (typeof foundLyric !== 'undefined') {
            this.lyrics.push(foundLyric)
          }
        }
      }
    }
  },
  created () {
    this.$store.dispatch('playlist/fetchPlaylists')
    this.$store.dispatch('lyric/fetchLyrics')
  },
  mounted () {
    setTimeout(() => {
      this.getAvailableNames()
    }, 200)
  }
}
</script>

<style>
</style>
// https://vuetifyjs.com/en/components/bottom-sheets/
