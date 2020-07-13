<template>
  <div>
    <welcome-top></welcome-top>
    <text-editor></text-editor>
  </div>
</template>

<script>
import WelcomeTop from "../components/main-page/WelcomeTop.vue";
import TextEditor from "../components/main-page/TextEditor.vue";
import { eventBus } from "../main.js";
import axios from "axios";

export default {
  data() {
    return {
      // Lyric
      title: "",
      content: String,
      index: Number,
      // Lyrics Array
      lyrics: []
    };
  },
  components: {
    WelcomeTop,
    TextEditor
  },
  created() {
    eventBus.$on("postLyricTitleToDb", lyric => {
      this.title = lyric.title;
      this.content = lyric.content;
      // Form a document
      const document = {
        title: String(this.title),
        content: this.content,
        index: this.index
      };
      // Post a document
      axios.post("http://localhost:9000/lyrics", document)
        .then(res => {alert("Pesem uspešno dodana, št. pesmi: " + this.index); console.log(res);})
        .catch(error => {console.log(error); alert("Napaka!!");});
      this.$router.push({ path: "/" });
    });
  },
  methods: {
    updateAllDataFromApi() {
      axios
        .get("http://localhost:9000/lyrics")
        .then(res => {
          console.log(res);
          const data = res.data;
          for (let key in data) {
            const lyric = {
              index: data[key].index,
              title: data[key].title,
              content: data[key].content
            };
            this.lyrics.push(lyric);
          }
          this.index = this.lyrics.length + 1;
        })
        .catch(error => console.log(error));
    },
  },
  mounted() {
    this.updateAllDataFromApi();
  }
};
</script>

<style>
</style>