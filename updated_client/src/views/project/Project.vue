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
          <!-- Show Psalm -->
        <div v-if="type === 'psalm'">
          <div v-if="psalm">
            <h1>{{ title }}</h1>
            <p>
              <span v-html="content"></span>
            </p>
          </div>
          <!-- Show no Psalm or loading -->
          <div v-else>
            <h2 style="max-width: 95vw;">Ne obstaja</h2>
          </div>
        </div>
        <!-- Show Psalm -->
        <div v-if="type === 'lyric'">
          <div v-if="lyric">
            <h1>{{ title }}</h1>
            <p>
              <span v-html="content"></span>
            </p>
          </div>
          <!-- Show no Psalm or loading -->
          <div v-else>
            <h2 style="max-width: 95vw;">Ne obstaja</h2>
          </div>
        </div>
    </v-col>
  </v-row>
  </v-container>
</template>

<script>
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
    title () {
      return this.psalm ? this.psalm.title : null
    },
    content () {
      return this.psalm ? this.psalm.content : null
    },
    ...mapGetters({
      psalm: 'psalm/getCurrentPsalm',
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
            if (this.type === 'psalm') {
              this.$router.push({ name: 'Project', params: { id: this.userInput }, query: { type: 'psalm' } })
            } else if (this.type === 'lyric') {
              this.$router.push({ name: 'Project', params: { id: this.userInput }, query: { type: 'lyric' } })
            }
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
    // this.socket = io("http://" + window.location.hostname + ":3000")
    //  Listen to Socket.io messages
    // this.socket.on("remoteIndex", data => {
    //   this.$router.push({ path: "/project/" + data})
    // })
  },
  destroyed () {
    // Kill window listener in current component
    window.removeEventListener('keypress', this.doCommand)
  },
  mounted () {
    if (this.type === 'psalm') {
      this.$store.dispatch('psalm/fetchPsalm', this.id)
    } else if (this.type === 'lyric') {
      this.$store.dispatch('lyric/fetchLyric', this.id)
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (this.type === 'psalm') {
      this.$store.dispatch('psalm/fetchPsalm', this.userInput)
    } else if (this.type === 'lyric') {
      this.$store.dispatch('psalm/fetchLyric', this.userInput)
    }
    next()
  }
}
</script>

<style>

</style>
