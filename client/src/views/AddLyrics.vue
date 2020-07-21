<template>
  <div>
    <welcome-top></welcome-top>
    <text-editor></text-editor>
  </div>
</template>

<script>
import WelcomeTop from "../components/main-page/WelcomeTop.vue";
import TextEditor from "../components/main-page/TextEditor.vue";

export default {
  components: {
    WelcomeTop,
    TextEditor
  },
  created() {
    this.$store.dispatch("lyric/fetchLyrics");
  },
  beforeDestroy() {
    this.$store.dispatch("lyric/fetchLyrics");
  }
};
</script>

<style></style>
