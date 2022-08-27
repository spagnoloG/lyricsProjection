<template>
  <v-container fluid>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1"
          >{{$t('Enter Title')}}</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2"
          >{{$t('Choose Category')}}</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step step="3">{{$t('Enter Lyric Content')}}</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-12" color="grey lighten-1" height="200px">
            <v-form>
              <v-container>
                <v-row>
                  <v-col align="center">
                    <h2 class="font-weight-regular black--text">
                      {{$t('Enter Lyric Title')}}
                    </h2>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col></v-col>
                  <v-col cols="12" sm="6">
                    <form v-on:submit.prevent>
                      <v-text-field
                        v-on:keyup.enter="nextOne"
                        v-model="title"
                        :label="$t('Lyric Title')"
                        class="black--text"
                        light
                        outlined
                        required
                        autofocus
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
                <v-btn color="primary" @click="nextOne">{{$t('Next')}}</v-btn>
              </v-col>
              <v-col align="end">
                <v-btn text :to="{ name: 'Home' }">{{$t('Home')}}</v-btn>
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
                    <h2 class="font-weight-regular black--text">
                      {{$t('Choose Category')}}
                    </h2>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col></v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-on:keyup.enter="e1++"
                      v-model="selected"
                      :items="categories"
                      :rules="[v => !!v || $t('Category must be chosen!')]"
                      :label="$t('Category')"
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
                <v-btn color="primary" @click="nextTwo">{{$t('Next')}}</v-btn>
                <v-btn text @click="--e1">{{$t('Back')}}</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" color="grey lighten-1">
            <v-container>
              <v-row>
                <v-col align="center">
                  <h2 class="font-weight-regular black--text">
                    {{$t('Enter Lyric Content')}}
                  </h2>
                </v-col>
              </v-row>
              <v-row>
                <v-col></v-col>
                <v-col cols="12" lg="6" align="center" justify="center">
                  <br />
                  <!-- Editor menu-->
                   <div class="menubar">
                      <v-btn
                        @click="editor.chain().focus().toggleBold().run()"
                        color="primary"
                        small
                        dark
                        fab
                      >
                        <v-icon>mdi-format-bold</v-icon>
                      </v-btn>

                      <v-btn
                        @click="editor.chain().focus().toggleItalic().run()"
                        color="primary"
                        class="ma-1 white--text"
                        fab
                        small
                        dark
                      >
                        <v-icon>mdi-format-italic</v-icon>
                      </v-btn>
                    </div>
                  <!-- Editor -->
                  <editor-content
                    :editor="editor"
                    focus
                  />
                </v-col>
                <v-col></v-col>
              </v-row>
            </v-container>
          </v-card>

          <v-container fluid>
            <v-row class="fill-height">
              <v-col align="start" justify="start">
                <v-btn text @click="--e1">{{$t('Back')}}</v-btn>
              </v-col>
              <v-col align="end" justify="end">
                <v-btn color="primary" text @click="submitEntry">{{$t('Save')}}</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import {
  Editor,
  EditorContent
} from '@tiptap/vue-2'
import { mapGetters } from 'vuex'
import StarterKit from '@tiptap/starter-kit'

export default {
  name: 'AddLyric',
  components: {
    EditorContent
  },
  data () {
    return {
      editor: null,
      e1: 1,
      title: '',
      content: {},
      selected: null
    }
  },
  computed: {
    ...mapGetters({
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
      if (this.content === '<p></p>') {
        this.$store.dispatch('lyric/noLyricEnteredError')
      } else {
        // Form a document
        const document = {
          title: this.title,
          categories: this.selected,
          content: this.content
        }
        // Post to database
        this.$store.dispatch('lyric/addNewLyric', document)
      }
      this.$router.push({ name: 'Home' })
    }
  },
  async created () {
    await this.$store.dispatch('lyric/fetchLyrics')
    await this.$store.dispatch('lyric/fetchCategories')
  },
  mounted () {
    this.editor = new Editor({
      content: 'Enter!',
      extensions: [
        StarterKit
      ],
      onUpdate: () => {
        this.content = this.editor.getHTML()
      }
    })
  },
  async beforeDestroy () {
    await this.$store.dispatch('lyric/fetchLyrics')
    await this.$store.dispatch('lyric/fetchCategories')
    this.editor.destroy()
  }
}
</script>

<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }
}
.v-btn--active.inactive::before {
  opacity: 0 !important;
}
</style>
