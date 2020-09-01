<template>
  <div>
    <list></list>
  </div>
</template>

<script>
import List from './components/List.vue'

export default {
  components: {
    List
  },
  created () {
    this.$store.dispatch('lyric/fetchLyrics')
  }
}
</script>
