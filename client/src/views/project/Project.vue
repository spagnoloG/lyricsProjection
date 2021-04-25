<template>
  <div>
    <!-- Tab menu -->
    <v-toolbar>
      <v-btn icon :to="{ name: 'ListLyrics' }">
        <v-icon>mdi-arrow-left-thick</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text :to="{ name: 'EditLyric', params: { id: id } }">
        {{$t('Edit Lyric content')}}
      </v-btn>
    </v-toolbar>
    <v-container fluid>
      <v-row align="center">
        <v-col cols="3"></v-col>
        <v-col align="center">
          <!-- Title and content -->
          <div>
            <h1 class="text-h3">
              <strong>{{ lyricTitle.toUpperCase() }}</strong>
            </h1>
            <br />
            <p class="text-h4">
              <span v-html="lyricContent.toUpperCase()"></span>
            </p>
          </div>
        </v-col>
        <v-col cols="3"></v-col>
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
      return this.$route.params.id
    },
    type () {
      return this.$route.query.type
    },
    lyricTitle () {
      return this.lyric ? this.lyric.title : ''
    },
    lyricContent () {
      return this.lyric ? this.lyric.content : ''
    },
    ...mapGetters({
      lyric: 'lyric/getCurrentLyric'
    })
  },
  async mounted () {
    this.$store.dispatch('lyric/fetchLyric', this.id)
  },
  async beforeRouteUpdate (to, from, next) {
    await this.$store.dispatch('lyric/fetchLyric', this.userInput)
    next()
  }
}
</script>
