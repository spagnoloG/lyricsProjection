<template>
<div>
  <!-- Tab menu -->
  <v-toolbar>
    <v-btn
      icon
      :to="{ name: 'ListLyrics'}">
      <v-icon>mdi-arrow-left-thick</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn
      text
      :to="{ name: 'EditLyric', params: { id: id }}">
      Uredi besedilo pesmi
    </v-btn>
  </v-toolbar>
  <!-- Lyric content container -->
  <v-container fluid>
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
</div>
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
  mounted () {
    this.$store.dispatch('lyric/fetchLyric', this.id)
  },
  beforeRouteUpdate (to, from, next) {
    this.$store.dispatch('lyric/fetchLyric', this.userInput)
    next()
  }
}
</script>
