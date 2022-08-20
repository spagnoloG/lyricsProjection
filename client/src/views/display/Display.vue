<template>
  <div class="main nocursor">
    <v-container class="fill-height">
      <v-row align="center" justify="center" v-if="showInputField">
        <v-col cols="2">
          <!-- Show search box -->
          <div>
            <v-text-field
              v-model="userInput"
              align="center"
              autofocus
              type="number"
            >
            </v-text-field>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="!notFound">
        <v-col :cols="marginLeft"> </v-col>
        <v-col align="center">
          <!-- Lyric title and content -->
          <div>
            <!--            <h1 class="text-h3">
              <strong>{{ currentLyric.title.toUpperCase() }}</strong>
              </h1> -->
              <br />
            <p class="text-h4">
              <span v-html="currentLyric.content.toUpperCase()"></span>
            </p>
          </div>
        </v-col>
        <v-col :cols="marginRight"></v-col>
      </v-row>
      <v-row v-if="notFound">
        <v-col align="center">
          <div v-if="currentLyricIndex === null">
            <h1>{{$t('Enter Lyric number...')}}</h1>
          </div>
          <div v-else>
            <h1>{{$t('This lyric does not exist!')}}</h1>
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
      userInput: '',
      appState: null,
      marginLeft: null,
      marginRight: null
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
      this.$store.dispatch('lyric/fetchLyrics')
      this.scroll = 0
      if (newIndex !== null) {
        this.$store.dispatch('lyric/fetchLyric', newIndex)
      } else {
        this.$store.dispatch('lyric/updateNotFoundVariable', true)
      }
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
            const lyricId = this.$store.getters['lyric/getLyricIdByNumber'](Number(this.userInput))
            if (lyricId === -1) {
              this.$store.dispatch('lyric/updateNotFoundVariable', true)
            } else {
              const document = {
                currentLyric: lyricId,
                currentPlaylist: null
              }
              this.$store.dispatch('socket/sendRemoteMessage', document)
            }
          }
          this.userInput = ''
        }, 1000)
      }
    }
  },
  async created () {
    this.$vuetify.theme.dark = true
    await this.$store.dispatch('lyric/fetchLyrics')
    await this.$store.dispatch('socket/getCurrentState')
    await this.$store.dispatch('appState/fetchState')
    this.appState = this.$store.getters['appState/getAppState']
    // Setup keyboard listener
    window.addEventListener('keypress', this.doCommand)
    this.marginLeft = this.appState.marginLeft ? this.appState.marginLeft : 2
    this.marginRight = this.appState.marginRight ? this.appState.marginRight : 2
  }
}
</script>

<style>
.nocursor {
  cursor: none;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  text-align: center;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
  text-align: center;
}
</style>
