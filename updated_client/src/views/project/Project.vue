<template>
  <v-container fluid>
    <v-row align="center">
      <v-col align="center">
        <!-- Show search box -->
        <div v-if="gotoShown">
          <input v-model="gotoInput" v-focus class="search-box" type="number" />
          <hr />
        </div>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col align="center">
        <!-- Show lyric -->
        <div v-if="psalm">
          <h1>{{ title }}</h1>
          <p>
            <span v-html="content"></span>
          </p>
        </div>
        <!-- Show no lyric or loading -->
        <div v-else>
          <h2 style="max-width: 95vw;">Niente</h2>
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
      gotoShown: false,
      gotoInput: '',
      gotoTimeout: null
    }
  },
  computed: {
    id () {
      return Number(this.$route.params.id)
    },
    title () {
      return this.psalm ? this.psalm.title : null
    },
    content () {
      return this.psalm ? this.psalm.content : null
    },
    ...mapGetters({
      psalm: 'psalm/getCurrentPsalm'
    })
  },
  methods: {
    doCommand (e) {
      const cmd = String.fromCharCode(e.keyCode).toLowerCase()
      if (!isNaN(cmd)) {
        clearTimeout(this.gotoTimeout)
        this.gotoShown = true
        this.gotoTimeout = setTimeout(() => {
          this.gotoShown = false
          if (this.gotoInput !== '') {
            this.$router.push({ name: 'Project', params: { id: this.gotoInput } })
          }
          this.gotoInput = ''
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
    this.$store.dispatch('psalm/fetchPsalm', this.id)
  },
  beforeRouteUpdate (to, from, next) {
    this.$store.dispatch('psalm/fetchPsalm', this.gotoInput)
    next()
  }
}
</script>

<style>

</style>
