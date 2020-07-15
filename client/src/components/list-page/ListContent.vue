<template>
  <b-container class="bv-example-row">
    <b-row class="text-center">
      <b-col></b-col>
      <b-col cols="10">
        <div v-for="lyric in lyrics" :key="lyric.index">
          <b-list-group>
            <b-list-group-item  v-b-modal.modal-center
              class="lyric-item"
              button
              @click="testClick(lyric.index)"
            >{{ lyric.title }}</b-list-group-item>
          </b-list-group>
        </div>
      </b-col>
      <b-col></b-col>
    </b-row>
    <div>
      <b-modal id="modal-center" centered title="Možnosti:" ok-only ok-variant="dark">
        <h3>{{ selectedLyric.title }}</h3>
        <p>Številka pesmi: {{ selectedLyric.index }}</p>
        <b-button :to="{ name: 'edit', params: { id: selectedLyric.index } }" variant="primary" pill class="update-delete-project-btn">Uredi</b-button>
        <b-button :to="{ name: 'project', params: { id: selectedLyric.index }}" variant="warning" pill class="update-delete-project-btn">Projeciraj</b-button>
        <b-button @click="deleteLyric()" variant="danger" pill class="update-delete-project-btn">Izbriši</b-button>
      </b-modal>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      lyrics: [],
      selected: Number,
      selectedLyric: Object
    };
  },
  beforeCreate() {
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
  methods: {
    testClick(index) {
      this.selectedLyric = this.lyrics[index -1];
    },
    deleteLyric(){console.log("delete!")},
  }
};
</script>

<style scoped>
.lyric-item {
  margin-bottom: 1%;
}
.update-delete-project-btn {
  margin: auto 1% auto 1%;
}
</style>