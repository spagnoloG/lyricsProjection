<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols=12 md=6>
          <add-psalm-category></add-psalm-category>
        </v-col>
        <v-col>
          <add-lyric-category></add-lyric-category>
        </v-col>
      </v-row>
    </v-container>
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
