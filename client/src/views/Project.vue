<template>
  <div>
    <!-- Show lyric -->
    <div v-if="!openSearchBox">
        <h1>{{ this.lyric.title }}</h1>
        <p>
        <span v-html="this.lyric.content"></span>
        </p>
    </div>
    <!-- Show search box -->
    <div v-if="openSearchBox">
      <input v-focus v-model="inputTerm" class="search-box">
    </div>
   
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Project",
  data() {
    return {
      lyric: {
        title: "",
        content: "",
        index: 1
      },
      openSearchBox: false,
      inputTerm: ""
    };
  },
  async mounted() {
    axios
      .get("http://localhost:9000/lyrics/" + this.id)
      .then(res => {
        const data = res.data;
        this.lyric.title = data[0].title;
        this.lyric.index = data[0].index;
        this.lyric.content = data[0].content;
      })
      .catch(error => {
        console.log(error);
      });
  },
  computed: {
    id() {
      return Number(this.$route.params.id);
    }
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
      if(isNaN(cmd)) {
        console.log(cmd);
      } else {
        console.log(cmd)
        this.openSearchBox = true;
        setTimeout(() => {
          this.openSearchBox = false;
          // this.$router.push({path:`/project/1`})
          window.location.replace("http://localhost:8080/project/" + this.inputTerm);
        }, 2000);
      }
    },
    updateData() {
      axios
      .get("http://localhost:9000/lyrics/" + this.id)
      .then(res => {
        const data = res.data;
        this.lyric.title = data[0].title;
        this.lyric.index = data[0].index;
        this.lyric.content = data[0].content;
      })
      .catch(error => {
        console.log(error);
      });
    }
  },
  beforeRouteUpdate() {    
    //updateData();
    // This component needs to be improved
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