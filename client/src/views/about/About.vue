<template>
<div>
  <v-container fluid>
    <v-row>
      <v-col align="center">
        <h1>O aplikaciji</h1>
        <p>Za župnijo Šempeter, by G.</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-img
          :src="require(`@/assets/promo.jpg`)"
          max-height="400"
          contain>
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>
<script>
export default {
  name: 'About'
}
</script>
