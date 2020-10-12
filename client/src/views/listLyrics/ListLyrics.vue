<template>
  <v-container fluid>
     <list></list>
  </v-container>
</template>

<script>
import List from './components/List.vue'

export default {
  name: 'ListLyrics',
  components: {
    List
  },
  async created () {
    await this.$store.dispatch('lyric/fetchLyrics')
    await this.$store.dispatch('lyric/fetchCategories')
  }
}
</script>
