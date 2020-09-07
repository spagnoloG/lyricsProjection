<template>
  <div class="main">
    <v-container fluid>
      <v-row class="fill-height" align="center" justify="center">
      <v-col cols="2">
        <!-- Show search box -->
        <div v-if="showInputField">
          <v-text-field v-model="userInput" align="center" autofocus type="number"> </v-text-field>
        </div>
      </v-col>
    </v-row>
      <v-row v-if="!notFound">
        <v-col align="center">
          <!-- Lyric title and content -->
          <div>
            <h1>{{ currentLyric.title.toUpperCase() }}</h1>
            <br>
            <p>
              <span v-html="currentLyric.content.toUpperCase()"></span>
            </p>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="notFound">
        <v-col align="center">
          <div v-if="currentLyricIndex === -1">
            <h1>Vtipkaj številko pesmi...</h1>
          </div>
          <div v-else>
            <h1>Pesem {{ currentLyricIndex}} ne obstaja!</h1>
          </div>
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
      scroll: 0,
      showInputField: false,
      userInput: ''
    }
  },
  computed: {
    ...mapGetters({
      currentLyricIndex: 'socket/getCurrentLyric',
      currentLyric: 'lyric/getCurrentLyric',
      notFound: 'lyric/getNotFoundValue',
      scrollPage: 'socket/getScrollDirection',
      refresh: 'socket/getRefreshPageStatus'
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
    },
    refresh: function (newStatus, oldStatus) {
      if (newStatus === true) {
        location.reload()
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
    },
    doCommand (e) {
      const cmd = String.fromCharCode(e.keyCode).toLowerCase()
      if (!isNaN(cmd)) {
        clearTimeout(this.gotoTimeout)
        this.showInputField = true
        this.gotoTimeout = setTimeout(() => {
          this.showInputField = false
          if (this.userInput !== '') {
            const document = {
              currentLyric: this.userInput,
              currentPlaylist: null
            }
            this.$store.dispatch('socket/sendRemoteMessage', document)
          }
          this.userInput = ''
        }, 1000)
      }
    }
  },
  created () {
    this.$store.dispatch('socket/getCurrentState')
    // Setup keyboard listener
    window.addEventListener('keypress', this.doCommand)
  }
}
</script>
