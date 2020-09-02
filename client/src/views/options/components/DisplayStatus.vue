<template>
  <v-card class="mx-auto">
    <v-img :src="require(`@/assets/display-status.jpg`)" :aspect-ratio="16/9">
    </v-img>

    <v-card-title>
      <v-container fluid>
      <v-row>
        <v-col>
          <p class="display-1 mb-2">Možnosti prikazovalnika...</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="title font-weight-regular grey--text">{{ currentDate }}</p>
        </v-col>
      </v-row>
    </v-container>
    </v-card-title>

    <v-divider ></v-divider>

    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col align="center">
            <v-chip @click="refreshDisplay" class="mr-2">
              <v-icon left>mdi-refresh</v-icon>
              Osveži prikazovalnik
            </v-chip>
          </v-col>
          <v-col align="center">
            <v-chip @click="stopProjection" class="mr-2">
              <v-icon left>mdi-close-circle</v-icon>
              Ustavi projekcijo
            </v-chip>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      currentDate: ''
    }
  },
  methods: {
    updateCurrentDate () {
      setInterval(() => {
        this.currentDate = new Date()
      }, 1000)
    },
    refreshDisplay () {
      this.$store.dispatch('socket/sendRefreshDisplay')
    },
    stopProjection () {
      this.$store.dispatch('socket/stopProjection')
    }
  },
  mounted () {
    this.updateCurrentDate()
  }
}
</script>
