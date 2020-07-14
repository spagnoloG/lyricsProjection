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
import {eventBus} from "../main.js";

export default {
  components: {
    WelcomeTop,
    JumboAndNav,
    ListContent
  },
  created() {
      eventBus.$on("listSearchTerm", (title) => {
        console.log("Searced for " + title);
     });
  },
};
</script>

<style>
</style>