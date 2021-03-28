<template>
  <div>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="8">
          <v-card class="mx-auto">
            <v-card-title class="white--text secondary">
             {{$t('List of Lyrics')}}
              <v-spacer></v-spacer>
              {{ appState.organisation }}
              <v-spacer></v-spacer>
              <v-btn @click="print()" icon>
                <v-icon>mdi-printer</v-icon>
              </v-btn>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text>
              {{$t('List of Lyrics, suitable for printing')}}
            </v-card-text>
            <div v-for="(lyric, index) in lyrics" :key="lyric._id">
              <v-list-item>
                <v-list-item-avatar>
                  <v-avatar color="secondary" size="56" class="white--text">{{
                    index
                  }}</v-avatar>
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
      lyrics: 'lyric/getAllLyrics',
      appState: 'appState/getAppState'
    })
  },
  methods: {
    print () {
      window.print()
    }
  },
  async created () {
    await this.$store.dispatch('lyric/fetchLyrics')
  }
}
</script>
