<template>
  <div>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="8">
          <v-card class="mx-auto">
            <v-card-title class="white--text secondary">
              Seznam pesmi župnije Šempeter pri Gorici
              <v-spacer></v-spacer>
              <v-btn @click="print()" icon>
                <v-icon>mdi-printer</v-icon>
              </v-btn>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text>
              Seznam pesmi, primeren za tiskanje
            </v-card-text>
             <div v-for="lyric in lyrics" :key="lyric.index">
              <v-list-item>
                <v-list-item-avatar>
                  <v-avatar color="secondary" size="56" class="white--text">{{ lyric.index }}</v-avatar>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ lyric.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
            <v-divider></v-divider>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Print',
  computed: {
    ...mapGetters({
      lyrics: 'lyric/getAllLyrics'
    })
  },
  methods: {
    print () {
      window.print()
    }
  },
  created () {
    this.$store.dispatch('lyric/fetchLyrics')
  }
}
</script>

<style scoped>
</style>
