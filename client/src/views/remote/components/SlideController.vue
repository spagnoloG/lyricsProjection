<template>
  <div class="main">
    <div class="select-playlist" v-if="step === 0">
      <v-container fluid>
        <v-row>
          <v-col align="center">
            <h2>{{$t('Project Playlist')}}</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col></v-col>
          <v-col cols="12" md="8">
            <v-select
              :items="playlists"
              item-text="playlistName"
              v-model="selectedPlaylist"
              return-object
              :label="$t('Choose')"
            />
          </v-col>
          <v-col></v-col>
        </v-row>
        <v-row>
          <v-col class="fill-height" align="center" justify="center">
            <v-btn @click="startProjectingPlaylist" depressed color="success"
              >{{$t('Project')}} <v-icon right>mdi-cast</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="playlist-player" v-if="step === 1">
      <v-container fluid>
        <v-row>
          <v-col class="fill-height" align="center" justify="center">
            <h1>{{ selectedPlaylist.playlistName }}</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col></v-col>
          <v-col cols="12" sm="6">
            <v-progress-linear
              color="teal"
              buffer-value="0"
              v-model="progress"
              stream
            ></v-progress-linear>
            <v-card flat tile>
              <v-window v-model="position" vertical>
                <v-window-item v-for="id in selectedPlaylist.ids" :key="id">
                  <v-card color="grey" height="200">
                    <v-container class="fill-height" fluid>
                      <v-row
                        align="center"
                        justify="center"
                      >
                        <h1 class="white--text current-lyric">
                          {{ currentLyric.title.toUpperCase() }}
                        </h1>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-window-item>
              </v-window>

              <v-card-actions class="justify-space-between">
                <v-btn text @click="goBack">
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-item-group v-model="position" class="text-center" mandatory>
                  <v-item
                    v-for="id in selectedPlaylist.ids"
                    :key="id"
                    v-slot:default="{ active, toggle }"
                  >
                    <v-btn :input-value="active" icon @click="toggle">
                      <v-icon>mdi-record</v-icon>
                    </v-btn>
                  </v-item>
                </v-item-group>
                <v-btn text @click="goForward">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col></v-col>
        </v-row>
        <v-row>
          <v-col align="center" cols="12" sm="4">
            <v-btn @click="scroll('up')" class="mx-2" fab color="primary"
              ><v-icon>mdi-arrow-up-bold</v-icon></v-btn
            >
          </v-col>
          <v-col
            class="fill-height"
            align="center"
            justify="center"
            cols="12"
            sm="4"
          >
            <v-btn @click="stopProjection" text large color="error"
              >{{$t('Stop Projection')}}</v-btn
            >
          </v-col>
          <v-col align="center" cols="12" sm="4">
            <v-btn @click="scroll('down')" class="mx-2" fab color="primary"
              ><v-icon>mdi-arrow-down-bold</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SlideController',
  data () {
    return {
      step: 0,
      playlists: [],
      selectedPlaylist: null,
      playlistId: null,
      position: 0,
      currentLyric: null,
      length: 3
    }
  },
  computed: {
    progress () {
      return this.position / (this.selectedPlaylist.ids.length - 1) * 100
    },
    ...mapGetters({
      currentLyricId: 'socket/getCurrentLyric'
    })
  },
  watch: {
    currentLyricId: function (newId, oldId) {
      this.position = this.selectedPlaylist.ids.indexOf(newId)
      this.currentLyric = this.$store.getters['lyric/getLyricById'](newId)
    }
  },
  methods: {
    startProjectingPlaylist () {
      if (this.selectedPlaylist !== null) {
        this.$store.dispatch('playlist/fetchPlaylist', this.selectedPlaylist._id)
        this.currentLyric = this.$store.getters['lyric/getLyricById'](this.selectedPlaylist.ids[0])
        const message = {
          currentLyric: this.selectedPlaylist.ids[this.position],
          currentPlaylist: this.selectedPlaylist._id
        }
        this.$store.dispatch('socket/sendRemoteMessage', message)
        this.step++
      }
    },
    goForward () {
      if (this.position === this.selectedPlaylist.ids.length - 1) {
        return null
      } else {
        this.position++
        const message = {
          currentLyric: this.selectedPlaylist.ids[this.position],
          currentPlaylist: this.selectedPlaylist._id
        }
        this.$store.dispatch('socket/sendRemoteMessage', message)
      }
    },
    goBack () {
      if (this.position === 0) {
        return null
      } else {
        this.position--
        const message = {
          currentLyric: this.selectedPlaylist.ids[this.position],
          currentPlaylist: this.selectedPlaylist._id
        }
        this.$store.dispatch('socket/sendRemoteMessage', message)
      }
    },
    scroll (direction) {
      this.$store.dispatch('socket/sendScrollMessage', direction)
    },
    stopProjection () {
      this.$store.dispatch('socket/stopProjection')
      this.step--
    }
  },
  async created () {
    if (this.$store.getters['socket/getCurrentPlaylist'] === null) {
      this.step = 0
      this.playlists = await this.$store.getters['playlist/getAllPlaylists']
    } else {
      this.playlistId = await this.$store.getters['socket/getCurrentPlaylist']
      this.currentLyric = await this.$store.getters['lyric/getLyricById'](this.$store.getters['socket/getCurrentLyric'])
      this.selectedPlaylist = await this.$store.getters['playlist/getPlaylistById'](this.playlistId)
      this.position = this.selectedPlaylist.ids.indexOf(this.$store.getters['socket/getCurrentLyric'])
      this.step = 1
    }
  }
}
</script>

<style>
.current-lyric {
  text-align: center;
}
</style>
