<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Vnesi naslov</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">Izberi kategorijo</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">Vnesi besedilo</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-12" color="grey lighten-1" height="200px">
          <v-form>
            <v-container>
              <v-row>
                <v-col align="center">
                  <h2 class="font-weight-regular black--text">Vnesi naslov pesmi</h2>
                </v-col>
              </v-row>
              <v-row>
                <v-col></v-col>
                <v-col cols="12" sm="6">
                  <form v-on:submit.prevent>
                    <v-text-field
                      v-on:keyup.enter="nextOne"
                      v-model="title"
                      label="Naslov pesmi"
                      class="black--text"
                      light
                      outlined
                      required
                    ></v-text-field>
                  </form>
                </v-col>
                <v-col></v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>

        <v-container fluid>
          <v-row>
            <v-col>
              <v-btn color="primary" @click="nextOne">Nadaljuj</v-btn>
            </v-col>
            <v-col align="end">
              <v-btn
              text
              :to="{ name: 'Home'}">Domov</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-12" color="grey lighten-1" height="200px">
          <v-form v-on:submit.prevent>
            <v-container>
              <v-row>
                <v-col align="center">
                  <h2 class="font-weight-regular black--text">Izberi kategorijo</h2>
                </v-col>
              </v-row>
              <v-row>
                <v-col></v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-on:keyup.enter="e1++"
                    v-model="selected"
                    :items="categories"
                    :rules="[v => !!v || 'Kategorija mora biti izbrana!']"
                    label="Kategorija"
                    light
                    outlined
                    multiple
                    required
                  ></v-select>
                </v-col>
                <v-col></v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>

        <v-container fluid>
          <v-row>
            <v-col>
              <v-btn color="primary" @click="nextTwo">Nadaljuj</v-btn>
              <v-btn text @click="--e1">Nazaj</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="mb-12" color="grey lighten-1">
          <v-container>
            <v-row>
              <v-col align="center">
                <h2 class="font-weight-regular black--text">Vnesi besedilo pesmi</h2>
              </v-col>
            </v-row>
            <v-row>
              <v-col></v-col>
              <v-col  cols="12" lg="6" align="center" justify="center">
                <!-- Menu -->
                <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                  <div class="menubar">
                    <v-btn
                    :class="{ 'is-active': isActive.bold() }"
                    @click="commands.bold"
                    color="#950740"
                    small
                    dark
                    fab
                    >
                    <v-icon>mdi-format-bold</v-icon>
                    </v-btn>

                    <v-btn
                    :class="{ 'is-active': isActive.italic() }"
                    @click="commands.italic"
                    color="#950740"
                    class="ma-1 white--text"
                    fab
                    small
                    dark
                    >
                    <v-icon>mdi-format-italic</v-icon>
                    </v-btn>
                  </div>
                </editor-menu-bar>
                <br>
                <!-- Editor -->
                <editor-content class="editor-content" :editor="editor" />
              </v-col>
              <v-col></v-col>
            </v-row>
          </v-container>
        </v-card>

        <v-container fluid>
          <v-row>
            <v-col>
              <v-btn text @click="--e1">Nazaj</v-btn>
            </v-col>
            <v-col align="end">
              <v-btn color="primary" text @click="submitEntry">Shrani</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import { mapGetters } from 'vuex'

import {
  Bold,
  Italic
} from 'tiptap-extensions'

export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  data () {
    return {
      editor: new Editor({
        extensions: [
          new Bold(),
          new Italic()
        ],
        content: `
          <p>
            Vnesi besedilo...
          </p>
        `,
        onUpdate: ({ getHTML }) => {
          this.content = String(getHTML())
        }
      }),
      e1: 1,
      title: '',
      content: '',
      selected: null
    }
  },
  computed: {
    ...mapGetters({
      index: 'lyric/getNewLyricIndex',
      categories: 'lyric/getCategories'
    })
  },
  methods: {
    nextOne () {
      if (this.title !== '') {
        return this.e1++
      }
    },
    nextTwo () {
      if (this.selected !== null) {
        return this.e1++
      }
    },
    submitEntry () {
      if (this.content === '') {
        return alert('Vnesi besedilo !')
      }
      // Form a document
      const document = {
        index: this.index,
        title: this.title,
        categories: this.selected,
        content: this.content.toUpperCase()
      }
      // Post to database
      this.$store.dispatch('lyric/addNewLyric', document)
      this.$store.dispatch('appState/showSnackbar', 'Uspešno dodana pesem, števlika: ' + this.index)
      this.$router.push({ name: 'Home' })
    }
  },
  created () {
    this.$store.dispatch('lyric/fetchLyrics')
    this.$store.dispatch('lyric/fetchCategories')
  },
  beforeDestroy () {
    this.$store.dispatch('lyric/fetchLyrics')
    this.$store.dispatch('lyric/fetchCategories')
  }
}
</script>
