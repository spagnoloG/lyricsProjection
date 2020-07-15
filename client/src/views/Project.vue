<template>
  <div>
    <div v-if="!openSearchBox">
        <h1>{{ this.lyric.title }}</h1>
        <p>
        <span v-html="this.lyric.content"></span>
        </p>
    </div>

    <div v-if="openSearchBox">
      <input v-focus v-model="inputTerm" class="search-box">
    </div>
   
  </div>
</template>

<script>
// import SearchBox from "../components/project-page/SearchBox.vue";
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
          window.removeEventListener("keypress", this.doCommand);
          console.log(this.inputTerm);
          // this.$router.push({name: 'project', params: { id:3}})
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
  }
};
</script>

<style scoped>
.search-box {
     margin-top: 4rem;
}
</style>