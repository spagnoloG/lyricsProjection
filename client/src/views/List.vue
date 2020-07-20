<template>
  <div>
    <welcome-top> </welcome-top>
    <jumbo-and-nav> </jumbo-and-nav>
    <list-content> </list-content>
  </div>
</template>

<script>
import WelcomeTop from "../components/main-page/WelcomeTop.vue";
import JumboAndNav from "../components/list-page/JumboAndNav.vue";
import ListContent from "../components/list-page/ListContent.vue";

export default {
  components: {
    WelcomeTop,
    JumboAndNav,
    ListContent
  },
  created() {
    this.$store.dispatch('lyric/fetchLyrics');
  },
};
</script>

<style></style>
