<template>
  <v-footer dark inset app>
      <v-btn :to="{ name: 'About'}"  icon>
        <v-icon>mdi-information</v-icon>
      </v-btn>
      <div>Župnija Šempeter pri Gorici</div>
      <v-spacer></v-spacer>
      <div> {{ new Date().getFullYear() }}</div>
    </v-footer>
</template>
<script>
export default {
  name: 'Footer'
}
</script>
