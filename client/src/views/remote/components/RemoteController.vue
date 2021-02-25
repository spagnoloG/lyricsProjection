<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <!-- Dial -->
      <v-col lg="8" align="center" justify="center">
        <!-- Alert -->
        <v-fade-transition mode="out-in">
          <v-alert v-if="alert" type="error" dismissible border="left">
            {{ errorMessage }}
          </v-alert>
        </v-fade-transition>

        <!-- Current lyric on display indicator -->
        <v-fade-transition mode="out-in">
        <v-row v-if="socketIndex !== -1">
          <v-col align="center">
            <v-chip class="ma-2" color="green" text-color="white">
              On Display
              <v-avatar right class="green darken-4">{{
                socketIndex
              }}</v-avatar>
            </v-chip>
          </v-col>
        </v-row>
        </v-fade-transition>
        <v-row>
          <v-col cols="2"></v-col>
          <v-col align="center" cols="8">
            <v-text-field
              v-model="userInput"
              label="Enter Lyric Number"
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
          <div align="center" class="col" v-for="n in [1, 2, 3]" :key="n">
            <v-btn
              @click="keyPress(String(n))"
              class="mx-2"
              fab
              large
              color="primary"
              >{{ n }}</v-btn
            >
          </div>
        </v-row>
        <v-row>
          <div align="center" class="col" v-for="n in [4, 5, 6]" :key="n">
            <v-btn
              @click="keyPress(String(n))"
              class="mx-2"
              fab
              large
              color="primary"
              >{{ n }}</v-btn
            >
          </div>
        </v-row>
        <v-row>
          <div align="center" class="col" v-for="n in [7, 8, 9]" :key="n">
            <v-btn
              @click="keyPress(String(n))"
              class="mx-2"
              fab
              large
              color="primary"
              >{{ n }}</v-btn
            >
          </div>
        </v-row>
        <v-row>
          <v-col align="center">
            <v-btn
              @click="scroll('up')"
              class="mx-2"
              fab
              large
              elevation="20"
              color="primary"
              ><v-icon>mdi-arrow-up-bold</v-icon></v-btn
            >
          </v-col>
          <v-col align="center">
            <v-btn @click="keyPress('0')" class="mx-2" fab large color="primary"
              >0</v-btn
            >
          </v-col>
          <v-col align="center">
            <v-btn
              @click="scroll('down')"
              class="mx-2"
              fab
              large
              elevation="20"
              color="primary"
              ><v-icon>mdi-arrow-down-bold</v-icon></v-btn
            >
          </v-col>
        </v-row>
        <br />
        <v-row class="fill-height">
          <v-fade-transition mode="out-in">
          <v-col
          v-if="socketIndex !== -1"
          align="center"
          justify="center"
          >
            <v-btn
              @click="stopProjection"
              depressed
              color="error"
              >Stop Projection<v-icon right>mdi-close</v-icon>
            </v-btn>
          </v-col>
          </v-fade-transition>
          <v-col align="center" justify="center">
            <v-btn
              @click="onProject"
              depressed
              color="success"
              >Project<v-icon right>mdi-cast</v-icon>
            </v-btn>
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
      currentLyric: []
    }
  },
  computed: {
    ...mapGetters({
      currentId: 'socket/getCurrentLyric',
      socketIndex: 'socket/getCurrentLyricIndex'
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
          currentLyric: this.lyricId,
          currentPlaylist: null
        }
        this.$store.dispatch('socket/sendRemoteMessage', document)
      }
      this.userInput = ''
    },
    checkForUserErrors () {
      if (this.selected === '') {
        this.errorMessage = 'Choose type of projection!'
        this.alert = true
        return false
      } else if (this.userInput === '') {
        this.errorMessage = 'Enter Number!'
        this.alert = true
        return false
      } else if (this.$store.getters['lyric/getLyricIdByNumber'](Number(this.userInput)) === -1) {
        this.errorMessage = 'Lyric with typed index does not exist!'
        this.alert = true
        return false
      } else {
        this.lyricId = this.$store.getters['lyric/getLyricIdByNumber'](Number(this.userInput))
        this.alert = false
        return true
      }
    },
    scroll (direction) {
      this.$store.dispatch('socket/sendScrollMessage', direction)
    },
    stopProjection () {
      this.$store.dispatch('socket/stopProjection')
    }
  }
}
</script>
