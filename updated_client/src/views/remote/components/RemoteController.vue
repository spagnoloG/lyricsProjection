<template>
  <v-container fluid>
    <v-alert v-if="alert" type="error">
      {{ errorMessage}}
    </v-alert>
    <v-row>

      <!-- Dial -->
      <v-col cols=12 md=6>
        <v-row >
          <v-col cols="2"></v-col>
          <v-col align="center" cols="8">
            <v-text-field
            v-model="userInput"
            label="Vtipkaj številko"
            solo
            readonly
            ></v-text-field>
          </v-col>
          <v-col align="center" justify="end" cols="2">
            <v-icon
            @click="deleteKeyPress"
            >mdi-arrow-left</v-icon>
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
      <v-col cols=12 md=6 >
        <v-row >
          <v-col>
            <v-select
            :items="options"
            v-model="selected"
            label="Izberi vrsto projeciranja"
            dense
            solo
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center">
            <v-btn
            @click="onProject"
            depressed
            large
            color="success"
            >Projeciraj  <v-icon>mdi-cast</v-icon></v-btn>
          </v-col>
          <v-col align="center">
            <v-btn
            @click="onClassicProject"
            depressed
            large
            color="primary"
            >Klasična projekcija</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import io from 'socket.io-client'

export default {
  data () {
    return {
      userInput: '',
      options: ['lyrics', 'psalms', 'playlists'],
      selected: '',
      alert: false,
      errorMessage: ''
    }
  },
  methods: {
    keyPress (pressedKey) {
      this.userInput = this.userInput + pressedKey
    },
    deleteKeyPress () {
      this.userInput = this.userInput.slice(0, -1)
    },
    onProject () {
      this.checkForUserErrors()
      const document = {
        index: this.userInput,
        selected: this.selected
      }
      this.socket.emit('onSocketProject', document)
    },
    onClassicProject () {
      this.$router.push({ name: 'Project', params: { id: '1' }, query: { type: 'lyric' } })
    },
    checkForUserErrors () {
      if (this.selected === '') {
        this.errorMessage = 'Izberi vrsto projeciranja!'
        this.alert = true
      } else if (this.userInput === '') {
        this.errorMessage = 'Vnesi številko!'
        this.alert = true
      } else {
        this.alert = false
      }
    }
  },
  created () {
    // Connect to socket.io
    this.socket = io('http://' + window.location.hostname + ':3000')
  }
}
</script>

<style>
</style>
