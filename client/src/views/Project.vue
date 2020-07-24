<template>
  <div>
    <!-- Show search box -->
    <div v-if="gotoShown || showMobileInput">
      <input v-model="gotoInput" v-focus class="search-box" type="number" />
      <hr />
    </div>
    <!-- Show lyric -->
    <div v-if="lyric || showMobileInput">
      <h1>{{ title }}</h1>
      <p>
        <span v-html="content"></span>
      </p>
    </div>
    <!-- Show no lyric or loading -->
    <div v-else>
      <h2 style="max-width: 95vw;">Besedilo se nalaga ali ne obstaja</h2>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import io from "socket.io-client";

export default {
  name: "Project",
  data() {
    return {
      gotoShown: false,
      gotoInput: "",
      gotoTimeout: null,
      showMobileInput: false,
      socket: {}
    };
  },
  computed: {
    id() {
      return Number(this.$route.params.id);
    },
    lyric() {
      return this.$store.getters["lyric/getAllLyrics"].find(
        (el) => el.index === this.id
      );
    },
    title() {
      return this.lyric ? this.lyric.title : null;
    },
    content() {
      return this.lyric ? this.lyric.content : null;
    },
  },
  created() {
    window.addEventListener("keypress", this.doCommand);
     // Socket.io
    this.socket = io("http://" + window.location.hostname + ":3000");
    //  Listen to Socket.io messages
    this.socket.on("remoteIndex", data => {
      this.$router.push({ path: "/project/" + data});
    })
  },
  destroyed() {
    window.removeEventListener("keypress", this.doCommand);
  },
  methods: {
    doCommand(e) {
      let cmd = String.fromCharCode(e.keyCode).toLowerCase();
      if (!isNaN(cmd)) {
        clearTimeout(this.gotoTimeout);
        this.gotoShown = true;
        this.gotoTimeout = setTimeout(() => {
          this.gotoShown = false;
          if(this.gotoInput !== "") {
            this.$router.push({ path: "/project/" + this.gotoInput });
          }
          this.gotoInput = "";
        }, 1000);
      }
    },
    ...mapActions("lyric", ["fetchLyric", "fetchLyrics"]),
  },
  mounted() {
    this.fetchLyrics();
    this.fetchLyric(this.id);
    
    // Mobile device checker
    if (screen.width <= 430) {
      this.showMobileInput = true;
    }

  },
  beforeRouteUpdate(to, from, next) {
    this.fetchLyric(this.gotoInput);
    next();
  },
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
