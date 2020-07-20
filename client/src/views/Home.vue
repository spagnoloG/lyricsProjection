<template>
    <div class="home">
        <welcome-top></welcome-top>
        <main-jumbotron></main-jumbotron>
        <button @click="fetchLyric(3)">Fetchaj</button>
    </div>
</template>

<script>
import WelcomeTop from "../components/main-page/WelcomeTop.vue";
import MainJumbotron from "../components/main-page/MainJumbotron.vue";
import { mapActions } from "vuex";

export default {
    name: "home",
    data: function() {
        return {
            lyrics: []
        };
    },
    components: {
        WelcomeTop,
        MainJumbotron
    },
    methods: {
      ...mapActions('lyric',['fetchLyric'])
    },
    mounted() {
    }
};
</script>

<style scoped>
.main-heading {
    font-family: "Comic Sans MS", cursive, sans-serif;
    font-size: 3rem;
}
</style>
