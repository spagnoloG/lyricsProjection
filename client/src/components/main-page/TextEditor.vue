<template>
  <div>
    <!-- Welcome message -->
    <div>
      <b-jumbotron header-level="5" header="Vnesi pesem" lead>
        <p
          class="header-paragraph"
        >Ko zaključis z vnašanjem besedila pesmi, klikni na "Shrani" gumb.</p>
      </b-jumbotron>
    </div>

    <!-- Editor and stuff -->
    <b-container>
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
            <editor-content class="editor-content" :editor="editor" />
          </div>
        </b-col>
        <b-col></b-col>
      </b-row>

      <b-row class="text-center">
        <b-col></b-col>
        <b-col cols="5">
          <!-- submit button -->
          <b-button
            type="submit"
            variant="dark"
            class="menu-button"
            :to="{ name: 'home'}"
            @click="submitEntry()"
          >Shrani</b-button>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import axios from 'axios';

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
  props: {
    newIndex: Number
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
            Vnesi besedilo pesmi...
          </p>
        `,
        onUpdate: ({ getHTML }) => {
          this.form.content = String(getHTML());
        }
      }),
      form: {
        title: "",
        content: String
      }
    };
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    async submitEntry() {
      if (this.form.title === "") {
        alert("Vnesi naslov!");
      } else {
        console.log(this.form.content);
        // Form a document
        const document = {
          title: this.form.title,
          content: this.form.content,
          index: this.newIndex
        };
        // Post a document
        console.log("api call")
        axios
          .post("http://localhost:9000/lyrics", document)
          .then(res => {
            console.log(res);
          })
          .catch(error => {
            console.log(error);
            alert("Napaka!");
          });
          console.log("after api post")
      }
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
.editor-content {
  border-style: hidden;
}
</style>