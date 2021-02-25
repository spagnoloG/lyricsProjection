<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col align="center">
          <h1>About application</h1>
          <br />
          <p>WebApp is written in Vue.js</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-img :src="require(`@/assets/promo.jpg`)" max-height="250" contain>
          </v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center">
          <p>Technologies / libraries used:</p>
          <ul>
            <li>Socket.io</li>
            <li>Tiptap extension for Vue</li>
            <li>axios</li>
            <li>Vuetify component library</li>
            <li>Express server</li>
            <li>mongoose library</li>
            <li>Mongodb database</li>
          </ul>
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
