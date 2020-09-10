<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col sm="6">
          <add-lyric-category></add-lyric-category>
        </v-col>
        <v-col sm="6">
          <display-status></display-status>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AddLyricCategory from './components/AddLyricCategory.vue'
import DisplayStatus from './components/DisplayStatus.vue'

export default {
  name: 'Options',
  components: {
    AddLyricCategory,
    DisplayStatus
  },
  created () {
    this.$store.dispatch('lyric/fetchCategories')
  }
}
</script>
