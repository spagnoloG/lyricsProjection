<template>
  <div class="main">
    <v-container fluid>
      <v-row v-if="!notFound">
        <v-col align="center">
          <!-- Lyric title and content -->
          <div>
            <h1>{{ currentLyric.title }}</h1>
            <p>
              <span v-html="currentLyric.content"></span>
            </p>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="notFound">
        <v-col align="center">
          <h1>Pesem {{ currentLyricIndex}} ne obstaja..</h1>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Display',
  data () {
    return {
      scroll: 0
    }
  },
  computed: {
    ...mapGetters({
      currentLyricIndex: 'socket/getCurrentLyric',
      currentLyric: 'lyric/getCurrentLyric',
      notFound: 'lyric/getNotFoundValue',
      scrollPage: 'socket/getScrollDirection'
    })
  },
  watch: {
    currentLyricIndex: function (newIndex, oldIndex) {
      this.onNewLyric(newIndex)
    },
    scrollPage: function (newDirection, oldDirection) {
      if (newDirection > oldDirection) {
        this.scrollWindow('up')
      } else {
        this.scrollWindow('down')
      }
    }
  },
  methods: {
    onNewLyric (newIndex) {
      this.$store.dispatch('lyric/fetchLyric', newIndex)
    },
    scrollWindow (direction) {
      if (direction === 'up') {
        this.scroll -= 60
      } else {
        this.scroll += 60
      }
      window.scroll(0, this.scroll)
    }
  },
  created () {
    this.$store.dispatch('socket/getCurrentState')
  }
}
</script>
