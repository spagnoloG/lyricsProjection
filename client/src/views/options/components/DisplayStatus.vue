<template>
  <v-card class="mx-auto">
    <v-img :src="require(`@/assets/display-status.jpg`)" :aspect-ratio="16/9">
    </v-img>

    <v-card-title>
      <v-container fluid>
      <v-row>
        <v-col>
          <p class="display-1 mb-2 text-h3">Možnosti prikazovalnika...</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="title font-weight-regular grey--text text-h4">{{ currentDay }}, {{ currentTime }}</p>
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
