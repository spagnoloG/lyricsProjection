<template>
  <v-container fluid>
    <div>
      <v-stepper v-model="step" vertical>
        <v-stepper-step :complete="step > 1" step="1">
          {{$t('Change Titile')}}
          <small>{{('Skip this step, if you don\'t want to change Title')}}</small>
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
                      :label="$t('Lyric Title')"
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
                <v-btn color="primary" @click="step = 2">{{$t('Next')}}</v-btn>
              </v-col>
              <v-col align="end">
                <v-btn text :to="{ name: 'Home' }"
                  ><v-icon left>mdi-home</v-icon> {{$t('Home')}}</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-stepper-content>

        <v-stepper-step :complete="step > 2" step="2">
          {{$t('Change / Add Category')}}
          <small>{{$t('Skip this step, if you don\'t want to change / add Category')}}</small>
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
                    :rules="[v => !!v || '$t(Category must be chosen)']"
                    :label="$t('Category')"
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
          <v-btn color="primary" @click="step++">{{$t('Next')}}</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="step > 3" step="3"
          >{{$t('Edit Lyric content')}}</v-stepper-step
        >

        <v-stepper-content step="3">
          <v-card color="grey lighten-1" class="mb-12">
            <v-container fluid>
              <v-row align="center" justify="center">
                <v-col></v-col>
                <v-col cols="12" lg="6" align="center">
                  <!-- Menu -->
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
                  >{{$t('Update')}}<v-icon right>mdi-update</v-icon></v-btn
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
import { Editor, EditorContent } from '@tiptap/vue-2'
import { mapGetters } from 'vuex'
import StarterKit from '@tiptap/starter-kit'

export default {
  name: 'Edit',
  components: {
    EditorContent
  },
  data () {
    return {
      editor: null,
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
  mounted () {
    this.editor = new Editor({
      content: 'Enter!',
      extensions: [
        StarterKit
      ],
      onUpdate: () => {
        this.currentLyric.content = this.editor.getHTML()
      }
    })
  },
  async created () {
    await this.$store.dispatch('lyric/fetchLyric', this.id)
    await this.$store.dispatch('lyric/fetchCategories')
    this.currentLyric = this.lyric
    this.editor.commands.setContent(this.lyric.content)
  },
  beforeDestroy () {
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
