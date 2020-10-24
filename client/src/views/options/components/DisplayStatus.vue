<template>
  <v-card class="mx-auto" max-height="200px" dark>
    <v-card-title  class="white--text">
      <h3 class="text-color-white">Možnosti prikazovalnika...</h3>
      <v-spacer></v-spacer>
      <p class="title font-weight-regular white--text text-h4 mt-2">{{ currentDay }}, {{ currentTime }}</p>
    </v-card-title>

    <v-divider ></v-divider>

    <v-card-text>
      <v-card-actions>
        <v-chip @click="refreshDisplay" class="mr-2">
          <v-icon left>mdi-refresh</v-icon>
          Osveži prikazovalnik
        </v-chip>
       <v-chip @click="stopProjection" class="mr-2">
        <v-icon left>mdi-close-circle</v-icon>
        Ustavi projekcijo
        </v-chip>
        <v-chip :to="{ name: 'Remote'}" class="mr-2">
        <v-icon left>mdi-remote</v-icon>
        Projeciraj
        </v-chip>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'DisplayStatus',
  data () {
    return {
      currentDate: '',
      currentDay: '',
      currentTime: ''
    }
  },
  methods: {
    updateCurrentDate () {
      const dateVariable = new Date()
      this.currentTime = dateVariable.getHours() + ':' + dateVariable.getMinutes() + ':' + dateVariable.getSeconds()
      setInterval(() => {
        const dateVariable = new Date()
        this.currentTime = dateVariable.getHours() + ':' + dateVariable.getMinutes() + ':' + dateVariable.getSeconds()
      }, 1000)
    },
    setDay () {
      const dateVariable = new Date().getUTCDay()
      switch (dateVariable) {
        case 0:
          this.currentDay = 'Nedelja'
          break
        case 1:
          this.currentDay = 'Ponedeljek'
          break
        case 2:
          this.currentDay = 'Torek'
          break
        case 3:
          this.currentDay = 'Sreda'
          break
        case 4:
          this.currentDay = 'Četrtek'
          break
        case 5:
          this.currentDay = 'Petek'
          break
        case 6:
          this.currentDay = 'Sobota'
          break
      }
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
    this.setDay()
  }
}
</script>
