<template>
  <v-container fluid>
    <v-row class="fill-height" align="center" justify="center">
      <v-col align="center" justify="center">
        <h1>Error connecting to database!</h1>
        <p>Contact your admin.</p>
        <br />
        <h1 class="text-h4">&#x1F615;</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'DbError',

  mounted () {
    if (this.$store.getters['appState/getDbConnection'] === true) {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style>
</style>
