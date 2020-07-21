<template>
  <div class="home">
    <welcome-top></welcome-top>
    <main-jumbotron></main-jumbotron>
  </div>
</template>

<script>
import WelcomeTop from "../components/main-page/WelcomeTop.vue";
import MainJumbotron from "../components/main-page/MainJumbotron.vue";

export default {
  name: "home",
  components: {
    WelcomeTop,
    MainJumbotron
  }
};
</script>

<style scoped>
.main-heading {
  font-family: "Comic Sans MS", cursive, sans-serif;
  font-size: 3rem;
}
</style>
