<template>
  <div>
    <add-psalm-category></add-psalm-category>
    <add-lyric-category></add-lyric-category>
  </div>
</template>

<script>
import AddPsalmCategory from './components/AddPsalmCategory.vue'
import AddLyricCategory from './components/AddLyricCategory.vue'

export default {
  components: {
    AddPsalmCategory,
    AddLyricCategory
  },
  created () {
    this.$store.dispatch('psalm/fetchCategories')
    this.$store.dispatch('lyric/fetchCategories')
  }
}
</script>

<style>

</style>
