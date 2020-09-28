<template>
  <v-container fluid>
    <v-alert v-if="alert" type="error">
      {{ errorMessage}}
    </v-alert>
    <v-row>

      <!-- Dial -->
      <v-col cols=12 md=6>
        <v-row v-if="currentIndex !== -1">
          <v-col align="center">
            <v-chip
            class="ma-2"
            color="green"
            text-color="white">
            Na zaslonu:
            <v-avatar
              right
              class="green darken-4"
            >{{ currentIndex }}</v-avatar>
          </v-chip>
          </v-col>
        </v-row>
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
          <v-col cols="2">
            <v-btn @click="deleteKeyPress" icon>
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
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
            @click="scroll('up')"
            class="mx-2"
            fab
            elevation="20"
            large
            color="primary"><v-icon>mdi-arrow-up-bold</v-icon></v-btn>
          </v-col>
          <v-col align="center">
            <v-btn
            @click="keyPress('0')"
            class="mx-2"
            fab
            large
            color="primary">0</v-btn>
          </v-col>
          <v-col align="center">
            <v-btn
            @click="scroll('down')"
            class="mx-2"
            fab
            elevation="20"
            large
            color="primary"><v-icon>mdi-arrow-down-bold</v-icon></v-btn>
          </v-col>
        </v-row>
      </v-col>

      <!-- Actions -->
      <v-col cols=12 md=6 >
        <v-row  class="fill-height">
          <v-col align="center" justify="center">
            <v-btn
            @click="onProject"
            depressed
            large
            color="success"
            >Projeciraj  <v-icon>mdi-cast</v-icon></v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RemoteController',
  data () {
    return {
      userInput: '',
      selected: 'lyric',
      alert: false,
      errorMessage: '',
      currentLyric: [],
      isActive: false
    }
  },
  computed: {
    ...mapGetters({
      currentIndex: 'socket/getCurrentLyric'
    })
  },
  methods: {
    keyPress (pressedKey) {
      this.userInput = this.userInput + pressedKey
    },
    deleteKeyPress () {
      this.userInput = this.userInput.slice(0, -1)
    },
    onProject () {
      if (this.checkForUserErrors()) {
        const document = {
          currentLyric: this.userInput,
          currentPlaylist: null
        }
        this.$store.dispatch('socket/sendRemoteMessage', document)
        this.userInput = ''
      }
    },
    checkForUserErrors () {
      if (this.selected === '') {
        this.errorMessage = 'Izberi vrsto projeciranja!'
        this.alert = true
        return false
      } else if (this.userInput === '') {
        this.errorMessage = 'Vnesi številko!'
        this.alert = true
        return false
      } else {
        this.alert = false
        return true
      }
    },
    scroll (direction) {
      this.$store.dispatch('socket/sendScrollMessage', direction)
    }
  }
}
</script>
