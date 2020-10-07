<template>
  <v-container fluid>
    <div>
      <v-stepper v-model="step" vertical>
        <v-stepper-step :complete="step > 1" step="1">
          Spremeni naslov
          <small>Preskoči ta korak, če ne želiš spreminjati naslova</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-card color="grey lighten-1" class="mb-12" height="100px">
            <v-container fluid>
              <v-row align="center" justify="center">
                <v-col cols="12" sm="6">
                  <form v-on:submit.prevent>
                    <v-text-field
                      v-on:keyup.enter="step++"
                      v-model="currentLyric.title"
                      label="Naslov pesmi"
                      class="black--text"
                      light
                      outlined
                      required
                    ></v-text-field>
                  </form>
                </v-col>
              </v-row>
            </v-container>
          </v-card>

          <v-container fluid>
            <v-row>
              <v-col>
                <v-btn color="primary" @click="step = 2">Nadaljuj</v-btn>
              </v-col>
              <v-col align="end">
                <v-btn text :to="{ name: 'Home' }"
                  ><v-icon>mdi-home</v-icon> Domov</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-stepper-content>

        <v-stepper-step :complete="step > 2" step="2">
          Spremeni / dodaj kategorijo
          <small>Preskoči ta korak, če ne želiš spreminjati kategorije</small>
        </v-stepper-step>

        <v-stepper-content step="2">
          <v-card color="grey lighten-1" class="mb-12" height="100px">
            <v-container fluid>
              <v-row align="center" justify="center">
                <v-col cols="12" sm="6">
                  <v-select
                    v-on:keyup.enter="step++"
                    v-model="currentLyric.categories"
                    :items="availableCategories"
                    :rules="[(v) => !!v || 'Kategorija mora biti izbrana!']"
                    label="Kategorija"
                    light
                    outlined
                    multiple
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
          <v-btn text @click="step--"><v-icon>mdi-arrow-up-bold</v-icon></v-btn>
          <v-btn color="primary" @click="step++">Nadaljuj</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="step > 3" step="3"
          >Uredi besedilo pesmi</v-stepper-step
        >

        <v-stepper-content step="3">
          <v-card color="grey lighten-1" class="mb-12">
            <v-container fluid>
              <v-row align="center" justify="center">
                <v-col></v-col>
                <v-col cols="12" lg="6" align="center">
                  <!-- Menu -->
                  <editor-menu-bar
                    :editor="editor"
                    v-slot="{ commands, isActive }"
                  >
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
                </v-col>
                <v-col></v-col>
              </v-row>
              <v-row>
                <v-col></v-col>
                <v-col cols="12" lg="6" align="center">
                  <br />
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
                <v-btn text @click="step--"
                  ><v-icon>mdi-arrow-up-bold</v-icon></v-btn
                >
              </v-col>
              <v-col align="end">
                <v-btn color="primary" text @click="updateEntry"
                  >Posodobi <v-icon>mdi-update</v-icon></v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-stepper-content>
      </v-stepper>
    </div>
  </v-container>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import { mapGetters } from 'vuex'

import { Bold, Italic } from 'tiptap-extensions'

export default {
  name: 'Edit',
  components: {
    EditorContent,
    EditorMenuBar
  },
  data () {
    return {
      editor: new Editor({
        extensions: [new Bold(), new Italic()],
        content: `
          <p>
            besedilo..
          </p>
        `,
        onUpdate: ({ getHTML }) => {
          this.currentLyric.content = String(getHTML())
        }
      }),
      step: 1,
      currentLyric: Object
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    ...mapGetters({
      lyric: 'lyric/getCurrentLyric',
      availableCategories: 'lyric/getCategories'
    })
  },
  methods: {
    updateEntry () {
      this.$store.dispatch('lyric/updateLyric', this.currentLyric)
      this.$router.push({ name: 'ListLyrics' })
    }
  },
  async created () {
    console.log(this.id)
    await this.$store.dispatch('lyric/fetchLyric', this.id)
    await this.$store.dispatch('lyric/fetchCategories')
    this.currentLyric = this.lyric
    await this.editor.setContent(this.lyric.content, true)
  }
}
</script>
