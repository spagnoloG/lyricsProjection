<template>
  <v-container fluid>
    <v-row>

      <!-- Dial -->
      <v-col cols=12 md=6>
        <v-row >
          <v-col align="center" cols="10">
            <div class="grey darken-3 text-center">
              <h1 class="white--text">{{ userInput }}</h1>
            </div>
          </v-col>
          <v-col align="end">
            <v-btn
            @click="deleteKeyPress"
            dark
            ><v-icon>mdi-arrow-left</v-icon></v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center">
            <v-btn
            @click="keyPress('1')"
            class="mx-2"
            fab
            large
            color="primary">1</v-btn>
          </v-col>
          <v-col align="center">
            <v-btn
            @click="keyPress('2')"
            class="mx-2"
            fab
            large
            color="primary">2</v-btn>
          </v-col>
          <v-col align="center">
            <v-btn
            @click="keyPress('3')"
            class="mx-2"
            fab
            large
            color="primary">3</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center">
            <v-btn
            @click="keyPress('4')"
            class="mx-2"
            fab
            large
            color="primary">4</v-btn>
          </v-col>
          <v-col align="center">
            <v-btn
            @click="keyPress('5')"
            class="mx-2"
            fab
            large
            color="primary">5</v-btn>
          </v-col>
          <v-col align="center">
            <v-btn
            @click="keyPress('6')"
            class="mx-2"
            fab
            large
            color="primary">6</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center">
            <v-btn
            @click="keyPress('7')"
            class="mx-2"
            fab
            large
            color="primary">7</v-btn>
          </v-col>
          <v-col align="center">
            <v-btn
            @click="keyPress('8')"
            class="mx-2"
            fab
            large
            color="primary">8</v-btn>
          </v-col>
          <v-col align="center">
            <v-btn
            @click="keyPress('9')"
            class="mx-2"
            fab
            large
            color="primary">9</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center">
            <v-btn
            @click="keyPress('0')"
            class="mx-2"
            fab
            large
            color="primary">0</v-btn>
          </v-col>
        </v-row>
      </v-col>

      <!-- Actions -->
      <v-col cols=12 sm=6>
        <v-row>
          <v-col align="center">
            <v-btn>Normalna projekcija</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      userInput: ''
    }
  },
  methods: {
    keyPress (pressedKey) {
      this.userInput = this.userInput + pressedKey
    },
    deleteKeyPress () {
      this.userInput = this.userInput.slice(0, -1)
    }
  }
}
</script>

<style>
</style>
