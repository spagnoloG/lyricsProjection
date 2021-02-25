<template>
  <v-card class="mx-auto">
    <v-row align="start">
      <v-col class="shrink">
        <v-img :src="require(`@/assets/display-status.jpg`)"
        max-height="350" contain>
        </v-img>
      </v-col>
      <v-col>
        <v-card-title>
          <h2 class="text-color-white">Display Options...</h2>
          <v-spacer></v-spacer>
          <p class="title font-weight-regular text-h4 mt-2">{{ currentDay }}, {{ currentTime }}</p>
        </v-card-title>

      <v-divider ></v-divider>

      <v-card-text>
        <v-card-actions>
          <v-chip @click="refreshDisplay" class="mr-2">
            <v-icon left>mdi-refresh</v-icon>
            Refresh Display
          </v-chip>
         <v-chip @click="stopProjection" class="mr-2">
          <v-icon left>mdi-close-circle</v-icon>
          Stop Projection
          </v-chip>
          <v-chip :to="{ name: 'Remote'}" class="mr-2">
          <v-icon left>mdi-remote</v-icon>
          Project
          </v-chip>
        </v-card-actions>
      </v-card-text>
      </v-col>
    </v-row>
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
          this.currentDay = 'Sunday'
          break
        case 1:
          this.currentDay = 'Monday'
          break
        case 2:
          this.currentDay = 'Tuesday'
          break
        case 3:
          this.currentDay = 'Wednesday'
          break
        case 4:
          this.currentDay = 'Thursday'
          break
        case 5:
          this.currentDay = 'Friday'
          break
        case 6:
          this.currentDay = 'Saturday'
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
