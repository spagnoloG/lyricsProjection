<template>
  <v-container>
    <v-tabs centered>
      <v-tabs-slider />
      <v-tab v-if="isPlaylist === null">
        <v-fade-transition mode="out-in"
          ><v-icon x-large>mdi-dialpad</v-icon>
        </v-fade-transition>
      </v-tab>
      <v-tab><v-icon x-large>mdi-play-box-outline</v-icon></v-tab>

      <v-tab-item v-if="isPlaylist === null">
        <v-fade-transition mode="out-in">
          <remote-controller></remote-controller>
        </v-fade-transition>
      </v-tab-item>
      <v-tab-item>
        <slide-controller></slide-controller>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import RemoteController from './components/RemoteController.vue'
import SlideController from './components/SlideController'

export default {
  name: 'Remote',
  components: {
    RemoteController,
    SlideController
  },
  computed: {
    ...mapGetters({
      isPlaylist: 'socket/getCurrentPlaylist'
    })
  },
  async created () {
    await this.$store.dispatch('playlist/fetchPlaylists')
    await this.$store.dispatch('lyric/fetchLyrics')
    await this.$store.dispatch('socket/getCurrentState')
  }
}
</script>
