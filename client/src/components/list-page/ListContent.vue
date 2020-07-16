<template>
  <b-container class="bv-example-row">
    <div>
      <!-- Delete alert -->
      <b-alert
        :show="dismissCountDown"
        dismissible
        variant="success"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
      >Pesem uspešno izbrisana!</b-alert>
    </div>
    <!-- Search bar -->
    <div class="search-bar">
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav class="search-box">
              <b-input type="text" v-model="search" placeholder="išči pesmi" />
        </b-navbar-nav>
      </b-navbar>
    </div>
    <!-- List lyrics -->
    <b-row class="text-center">
      <b-col></b-col>
      <b-col cols="10">
        <div v-for="lyric in filteredLyrics" :key="lyric.index">
          <b-list-group horizontal="md">
            <b-list-group-item
              v-b-modal.modal-center
              class="lyric-item"
              button
              @click="selectLyric(lyric)"
            >Pesem št: {{ lyric.index }}, naslov: {{ lyric.title }}</b-list-group-item>
          </b-list-group>
        </div>
      </b-col>
      <b-col></b-col>
    </b-row>
    <!-- Popover menu -->
    <div>
      <b-modal
        ref="option-modal"
        id="modal-center"
        centered
        title="Možnosti:"
        ok-only
        ok-variant="dark"
      >
        <h3>{{ selectedLyric.title }}</h3>
        <p>Številka pesmi: {{ selectedLyric.index }}</p>
        <b-button
          :to="{ name: 'edit', params: { id: selectedLyric.index } }"
          variant="primary"
          pill
          class="update-delete-project-btn"
        >
          <b-icon icon="pencil"></b-icon>Uredi
        </b-button>
        <b-button
          :to="{ name: 'project', params: { id: selectedLyric.index }}"
          variant="warning"
          pill
          class="update-delete-project-btn"
        >
          <b-icon icon="play-fill"></b-icon>Projeciraj
        </b-button>
        <div>
          <b-button
            variant="danger"
            pill
            class="update-delete-project-btn m-1"
            v-b-toggle.collapse-1
          >
            <b-icon icon="trash2"></b-icon>Izbriši
          </b-button>
          <b-collapse id="collapse-1">
            <b-card>
              Si prepričan/a?
              <b-button class="final-delete-btn" @click="deleteLyric()" variant="outline-danger">Da</b-button>
            </b-card>
          </b-collapse>
        </div>
      </b-modal>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";
import { eventBus } from "../../main.js";

export default {
  data() {
    return {
      lyrics: [],
      selected: Number,
      selectedLyric: Object,
      dismissSecs: 5,
      dismissCountDown: 0,
      search: ""
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
    selectLyric(lyric) {
      this.selectedLyric = lyric;
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    deleteLyric() {
      axios
        .delete("http://localhost:9000/lyrics/" + this.selectedLyric.index)
        .then(res => {
          console.log(res);
          this.$refs["option-modal"].hide();
          this.updateList();
          this.showAlert();
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateList() {
      axios
        .get("http://localhost:9000/lyrics")
        .then(res => {
          console.log(res);
          this.lyrics.length = 0;
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
    }
  },
  computed: {
    filteredLyrics() {
      return this.lyrics.filter(lyric => {
        return lyric.title.match(this.search);
      });
    }
  }
};
</script>

<style scoped>
.lyric-item {
  margin-bottom: 1%;
}
.update-delete-project-btn {
  margin: auto 1% 1% 1%;
}

.final-delete-btn {
  position: absolute;
  right: 20px;
  bottom: 15px;
}

.search-bar {
  margin-bottom: 3%;
}
.search-box {
  margin: auto;
}
</style>