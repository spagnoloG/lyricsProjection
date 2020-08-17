<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col>
          <add-lyric-category></add-lyric-category>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AddLyricCategory from './components/AddLyricCategory.vue'

export default {
  components: {
    AddLyricCategory
  },
  created () {
    this.$store.dispatch('psalm/fetchCategories')
  }
}
</script>

<style>

</style>
