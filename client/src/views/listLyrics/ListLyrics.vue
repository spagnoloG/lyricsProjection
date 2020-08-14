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
  data () {
    return {
      items: []
    }
  },
  created () {
    this.$store.dispatch('lyric/fetchLyrics')
  }
}
</script>

<style>

</style>
