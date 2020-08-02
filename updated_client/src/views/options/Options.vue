<template>
  <div>
    <h1>Tukaj se nahajajo možnosti</h1>
    <add-psalm-category></add-psalm-category>
  </div>
</template>

<script>
import AddPsalmCategory from './components/AddPsalmCategory.vue'

export default {
  components: {
    AddPsalmCategory
  },
  created () {
    this.$store.dispatch('psalm/fetchCategories')
  }
}
</script>

<style>

</style>
