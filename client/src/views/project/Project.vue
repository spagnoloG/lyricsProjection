<template>
  <v-container fluid>
    <v-row align="center">
      <v-col align="center">
        <!-- Show search box -->
        <div v-if="showInputField">
          <input v-model="userInput" v-focus class="search-box" type="number" />
          <hr />
        </div>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col align="center">
        <!-- Lyric title and content -->
        <div>
          <div v-if="lyric">
            <h1>{{ lyricTitle }}</h1>
            <p>
              <span v-html="lyricContent"></span>
            </p>
          </div>
          <!-- Show no Lyric or loading -->
          <div v-else>
            <h2 style="max-width: 95vw;">Ne obstaja</h2>
          </div>
        </div>
    </v-col>
  </v-row>
  </v-container>
</template>

<script>
import io from 'socket.io-client'
import { mapGetters } from 'vuex'

export default {
  name: 'Project',
  data () {
    return {
      showInputField: false,
      userInput: '',
      gotoTimeout: null
    }
  },
  computed: {
    id () {
      return Number(this.$route.params.id)
    },
    type () {
      return this.$route.query.type
    },
    lyricTitle () {
      return this.lyric ? this.lyric.title : null
    },
    lyricContent () {
      return this.lyric ? this.lyric.content : null
    },
    ...mapGetters({
      lyric: 'lyric/getCurrentLyric'
    })
  },
  methods: {
    doCommand (e) {
      const cmd = String.fromCharCode(e.keyCode).toLowerCase()
      if (!isNaN(cmd)) {
        clearTimeout(this.gotoTimeout)
        this.showInputField = true
        this.gotoTimeout = setTimeout(() => {
          this.showInputField = false
          if (this.userInput !== '') {
            this.$router.push({ name: 'Project', params: { id: this.userInput }, query: { type: 'lyric' } })
          }
          this.userInput = ''
        }, 1000)
      }
    }
  },
  created () {
    // Setup window listener
    window.addEventListener('keypress', this.doCommand)
    // Socket.io
    this.socket = io('http://' + window.location.hostname + ':3000')
    //  Listen to Socket.io messages
    this.socket.on('onIndexnType', data => {
      this.$router.push({ name: 'Project', params: { id: data.index }, query: { type: data.type } })
      // Temporary fix
      location.reload()
    })
  },
  destroyed () {
    // Kill window listener in current component
    window.removeEventListener('keypress', this.doCommand)
  },
  mounted () {
    this.$store.dispatch('lyric/fetchLyric', this.id)
  },
  beforeRouteUpdate (to, from, next) {
    this.$store.dispatch('lyric/fetchLyric', this.userInput)
    next()
  }
}
</script>
