<template>
  <div>
    <v-banner>
      <v-img :src="require(`@/assets/homePage.jpg`)"
        :lazy-src="require(`@/assets/homePage-lazy.jpg`)"
        max-height="550">
      </v-img>
      <br>
      <v-divider></v-divider>
      <v-container fluid>
        <v-row>
          <v-col align="center" cols=12 sm=6>
            <v-btn
            :to="{ name: 'ListLyrics'}"
            color="primary">Seznam pesmi <v-icon>mdi-playlist-music</v-icon></v-btn>
          </v-col>
          <v-col align="center" cols=12 sm=6>
            <v-btn
            :to="{name: 'AddLyric'}"
            color="primary">Dodaj novo pesem <v-icon>mdi-music</v-icon></v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center">
            <v-btn
            :to="{name: 'Remote'}"
            color="#59A96A"
            large>Upravljaj <v-icon>mdi-remote</v-icon></v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-banner>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
