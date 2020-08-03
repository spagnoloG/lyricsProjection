<template>
 <div>
    <list>
    </list>
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
    this.$store.dispatch('psalm/fetchPsalms')
  }
}
</script>

<style>

</style>
//https://stackoverflow.com/questions/51929431/add-search-and-sort-functionality-to-vuetifyjs-list-with-vuejs-2/51930328
