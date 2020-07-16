<template>
  <div>
      <h1>Pesmi</h1>
    <label>
      <input type="text" v-model="search" placeholder="išči pesmi"/>
    </label>
    <table style="width: 100%">
      <thead>
        <th>Naslov</th>
        <th>Številka</th>
      </thead>
      <tbody>
        <tr v-for="lyric in filteredBlogs" :key="lyric.index">
          <td>{{lyric.title}}</td>
          <td>{{lyric.index}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      lyrics: []
    };
  },
  async mounted() {
      axios
        .get("http://localhost:9000/lyrics")
        .then(res => {
          console.log(res);
          const data = res.data;
          for (let key in data) {
            const lyric = {
              index: data[key].index,
              title: data[key].title,
              content: data[key].content
            };
            this.lyrics.push(lyric);
          }
          console.log(this.lyrics);
        })
        .catch(error => console.log(error));
    },
    computed: {
        filteredBlogs() {
            return this.lyrics.filter((lyric) => {
                return lyric.title.match(this.search);
            })
        }
    }
};
</script>

<style>
</style>