<template>
  <div>
    <welcome-top></welcome-top>
    <text-editor v-bind:new-index="index" ></text-editor>
  </div>
</template>

<script>
import WelcomeTop from "../components/main-page/WelcomeTop.vue";
import TextEditor from "../components/main-page/TextEditor.vue";
import axios from "axios";

export default {
  data() {
    return {
      // Lyric
      title: "",
      content: String,
      index: 1,
      // Lyrics Array
      lyrics: []
    };
  },
  components: {
    WelcomeTop,
    TextEditor
  },
  created() {},
  methods: {
    updateAllDataFromApi() {
      var Url = "http://" + window.location.hostname + ":9000/lyrics"
      axios
        .get(Url)
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
          let helper = this.lyrics.length -1;
          if(helper === -1) {
            this.index = 1
          } else {
            this.index = this.lyrics[helper].index +1;
          }
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