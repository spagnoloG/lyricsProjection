<template>
  <div>
    <!-- Welcome message -->
    <div>
      <b-jumbotron header-level="5" header="Uredi besedilo pemi" lead>
        <p
          class="header-paragraph"
        >Ko zaključis z urejanjem besedila pesmi, klikni na "Shrani" gumb.</p>
      </b-jumbotron>
    </div>

    <!-- Editor and stuff -->
    <b-container v-if="loadedData">
      <!-- naslov pesmi -->
      <b-row class="text-center enter-lyrics-title">
        <b-col></b-col>
        <b-col cols="3">
          <b-form-group
            id="input-group-1"
            label-size="lg"
            label="Naslov pesmi:"
            label-for="input-2"
            description="Ne pozabi na veliko začetnico!"
          >
            <b-form-input id="input-1" v-model="form.title" required placeholder="Vnesi naslov"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col></b-col>
      </b-row>
      <!-- EDITOR MENU -->
      <b-row class="text-center editor-menu">
        <b-col></b-col>
        <b-col cols="5">
          <div class="editor">
            <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
              <div class="menubar">
                <b-button
                  :class="{ 'is-active': isActive.bold() }"
                  @click="commands.bold"
                  v-b-tooltip.hover
                  title="Krepko"
                  variant="dark"
                  class="menu-button"
                  pill
                >
                  <b-icon-type-bold></b-icon-type-bold>
                </b-button>

                <b-button
                  :class="{ 'is-active': isActive.italic() }"
                  @click="commands.italic"
                  v-b-tooltip.hover
                  title="Ležeče"
                  variant="dark"
                  class="menu-button"
                  pill
                >
                  <b-icon-type-italic></b-icon-type-italic>
                </b-button>
              </div>
            </editor-menu-bar>
          </div>
        </b-col>
        <b-col></b-col>
      </b-row>
      <b-row class="text-center">
        <b-col></b-col>
        <b-col cols="8">
          <div class="editor">
            <!-- EDITOR -->
            <editor-content class="editor__content" :editor="editor" />
          </div>
        </b-col>
        <b-col></b-col>
      </b-row>

      <b-row class="text-center">
        <b-col></b-col>
        <b-col cols="5">
          <!-- submit button -->
          <b-button type="submit" variant="dark" class="menu-button" :to="{name: 'list'}" @click="submitEntry()">Shrani</b-button>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>

    <div v-if="!loadedData">
      <b-button @click="loadedData = true">Začni z urejanjem</b-button>
    </div>
  </div>

  <!-- <button class="menubar__button" @click="commands.undo">
      <icon name="undo" />
    </button>
    <button class="menubar__button" @click="commands.redo">
      <icon name="redo" />
  </button>-->
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import axios from "axios";

import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from "tiptap-extensions";
export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History()
        ],
        content: `
          <p>
            OJLA
          </p>
        `,
        onUpdate: ({ getHTML }) => {
          this.form.content = String(getHTML());
        }
      }),
      form: {
        title: "",
        content: String
      },
      lyric: Object,
      loadedData: false
    };
  },
  props: {
    songIndex: Number
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  watch: {
    loadedData: function() {
      this.updateData();
    }
  },
  methods: {
    async submitEntry() {
      if (this.form.title === "") {
        alert("Vnesi naslov!");
      } else {
        console.log(this.form.content);
        axios
          .patch("http://localhost:9000/lyrics/" + this.songIndex, {
            title: this.form.title,
            content: this.form.content
            })
          .then(res => {
            console.log(res.data);
          })
          .catch(err => console.log(err.response.data));
       }
    },
    updateData() {
      console.log(this.lyric);
      this.form.title = this.lyric.title;
      this.editor.setContent(this.lyric.content, true);
    }
  },
  async created() {
    try {
      let response = await axios.get(
        "http://localhost:9000/lyrics/" + this.songIndex
      );
      this.lyric = Object.assign({}, response.data[0]);
      console.log(this.lyric);
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style scoped>
.enter-lyrics-title {
  margin-bottom: 3%;
}
.editor-menu {
  margin-bottom: 2%;
}
.menu-button {
  margin-left: 2%;
  /* background-color: #2c3e50; */
}
.save-button {
  margin: 3% auto 3% auto;
}
.header-paragraph {
  font-size: 0.9rem;
}
</style>