<template>
  <v-footer dark inset app>
      <v-btn :to="{ name: 'About'}"  icon>
        <v-icon>mdi-information</v-icon>
      </v-btn>
      <div>{{ appState.organisation }}</div>
      <v-spacer></v-spacer>
      <div> {{ new Date().getFullYear() }}</div>
    </v-footer>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Footer',

  computed: {
    ...mapGetters({
      appState: 'appState/getAppState'
    })
  }
}
</script>
