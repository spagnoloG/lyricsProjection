<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-img
          :lazy-src="require(`@/assets/homePage-lazy.jpg`)"
          :src="require(`@/assets/homePage.jpg`)"
          max-height="600"
          contain
        >
        </v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center" cols="12" sm="6">
        <v-btn :to="{ name: 'ListLyrics' }" color="primary"
          >{{ $t('List Of Lyrics')
          }}<v-icon right>mdi-playlist-music</v-icon></v-btn
        >
      </v-col>
      <v-col align="center" cols="12" sm="6">
        <v-btn :to="{ name: 'AddLyric' }" color="primary"
          >{{ $t('Add new Lyric')
          }}<v-icon right>mdi-music</v-icon></v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center">
        <v-btn :to="{ name: 'Remote' }" color="#59A96A" large
          >{{ $t('Remote')
          }}<v-icon right>mdi-remote</v-icon></v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<i18n>
{
  "si": {
    "Example of component localization": "Test123"
  }
}
</i18n>
