<template>
  <div class="home">
    <welcome-top></welcome-top>
    <main-jumbotron></main-jumbotron>
  </div>
</template>

<script>
import { eventBus } from '../main.js';
import WelcomeTop from "../components/main-page/WelcomeTop.vue";
import MainJumbotron from "../components/main-page/MainJumbotron.vue"

export default {
  name: "home",
  data: function() {
    return {
      lyrics: []
    };
  },
   components: {
     WelcomeTop,
     MainJumbotron,
  },
  methods: {
    // updateAllDataFromApi() {
    //   axios
    //     .get("http://localhost:9000/lyrics")
    //     .then(res => {
    //       console.log(res);
    //       const data = res.data;
    //       for (let key in data) {
    //         const lyric = {
    //           index: data[key].index,
    //           title: data[key].title,
    //           content: data[key].content
    //         };
    //         this.lyrics.push(lyric);
    //       }
    //       console.log(this.lyrics);
    //     })
    //     .catch(error => console.log(error));
    //   this.buttonClicked = true;
    // }
  },
  created() {
    // eventBus.$on('openTextEditor', (data) => {
    //   this.showTextEditor = data;
    // });
  }
};
</script>

<style scoped>
.main-heading {
  font-family: "Comic Sans MS", cursive, sans-serif;
  font-size: 3rem;
}
</style>
