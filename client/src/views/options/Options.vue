<template>
  <div>
    <v-container fluid>
      <v-row class="fill-height" align="center" justify="center">
        <v-col cols="12" md="8">
          <display-status></display-status>
        </v-col>
      </v-row>
      <v-row class="fill-height">
        <v-col cols="12" md="6">
          <add-lyric-category></add-lyric-category>
        </v-col>
        <v-col cols="12" md="6">
          <additional-options></additional-options>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AddLyricCategory from './components/AddLyricCategory.vue'
import DisplayStatus from './components/DisplayStatus.vue'
import AdditionalOptions from './components/AdditionalOptions.vue'

export default {
  name: 'Options',
  components: {
    AddLyricCategory,
    DisplayStatus,
    AdditionalOptions
  },
  created () {
    this.$store.dispatch('lyric/fetchCategories')
  }
}
</script>
