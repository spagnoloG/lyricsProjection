<template>
    <div>
        <!-- Show lyric -->
        <div v-if="!openSearchBox">
            <h1>{{ this.currentLyric.title }}</h1>
            <p>
                <span v-html="this.currentLyric.content"></span>
            </p>
        </div>
        <!-- Show search box -->
        <div v-if="openSearchBox">
            <input v-focus v-model="inputTerm" class="search-box" />
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    name: "Project",
    data() {
        return {
            openSearchBox: false,
            inputTerm: "",
        };
    },
    computed: {
        id() {
            return Number(this.$route.params.id);
        },
        ...mapState({
            currentLyric: state => state.lyric.currentLyric
        })
    },
    created() {
        window.addEventListener("keypress", this.doCommand);
    },
    destroyed() {
        window.removeEventListener("keypress", this.doCommand);
    },
    methods: {
        doCommand(e) {
            let cmd = String.fromCharCode(e.keyCode).toLowerCase();
            console.log(cmd)
            if (!isNaN(cmd)) {
                this.openSearchBox = true;
                setTimeout(() => {
                    this.openSearchBox = false;
                    this.$router.push({path:`/project/` + this.inputTerm})
                }, 2000);
            }
            this.inputTerm = ""
        },
        ...mapActions("lyric", ["fetchLyric", "fetchLyrics"])
    },
    async mounted() {
        this.fetchLyrics();
        this.fetchLyric(this.id);
    },
    beforeRouteUpdate (to, from, next) {
      this.fetchLyric(this.inputTerm)
      next();
    }
};
</script>

<style scoped>
.search-box {
    margin-top: 10%;
    font-size: 2rem;
    width: 10%;
    text-align: center;
}
</style>
