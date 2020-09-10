<template>
  <div>
    <list></list>
  </div>
</template>

<script>
import List from './components/List.vue'

export default {
  name: 'ListLyrics',
  components: {
    List
  },
  created () {
    this.$store.dispatch('lyric/fetchLyrics')
    this.$store.dispatch('lyric/fetchCategories')
  }
}
</script>
