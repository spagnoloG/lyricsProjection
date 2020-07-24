<template>
  <b-container class="bv-example-row">
    <div>
      <!-- Delete alert -->
      <b-alert
        :show="dismissCountDown"
        dismissible
        variant="success"
        @dismissed="dismissCountDown = 0"
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
        <b-pagination
          v-model="currentPage"
          :total-rows="lyricsTotal"
          :per-page="perPage"
          first-number
          pills
        ></b-pagination>
        <div v-for="lyric in filteredLyrics" :key="lyric.index">
          <b-card class="lyric-item">
            <b-card-title>
              <strong>{{ lyric.title }}</strong>
            </b-card-title>
            <b-card-text>
              Pesem številka:
              <strong>{{ lyric.index }}</strong>
            </b-card-text>
            <b-button v-b-modal.modal-center @click="selectLyric(lyric)" variant="link">Možnosti</b-button>
          </b-card>
          <!-- <div class="overflow-auto"> -->
          <!-- Use text in props -->
          <!-- <b-pagination
            v-model="currentPage"
            :total-rows="lyricsTotal"
            :per-page="perPage"
            first-number
            pills
          ></b-pagination>
          <b-table
            id="my-table"
            :items="filteredLyrics"
            :per-page="perPage"
            :current-page="currentPage"
            small
          ></b-table>
          </div>-->
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
          @click="onProjectButtonClick()"
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
import { mapState } from "vuex";
import io from "socket.io-client";


export default {
  data() {
    return {
      selected: Number,
      selectedLyric: Object,
      dismissSecs: 5,
      dismissCountDown: 0,
      search: "",
      perPage: 10,
      currentPage: 1,
    };
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
      this.$store.dispatch("lyric/deleteLyric", this.selectedLyric.index);
      this.$refs["option-modal"].hide();
      this.showAlert();
    },
    onProjectButtonClick() {
      if (screen.width <= 430) {
        // Do the socketIo thing
        // Socket.io
        this.socket = io("http://" + window.location.hostname + ":3000");
        //  Send socketIo message
        this.socket.emit("moveTo", this.selectedLyric.index);
        this.$refs["option-modal"].hide();
      } else {
        this.$router.push({
          name: "project",
          params: { id: this.selectedLyric.index },
        });
      }
    },
  },
  computed: {
    filteredLyrics() {
      return this.lyrics.filter((lyric) => {
        return lyric.title.toUpperCase().match(this.search.toUpperCase()); //|| lyric.index.match(Number(this.search))
      });
    },
    ...mapState({
      lyrics: (state) => state.lyric.lyrics,
      lyricsTotal: (state) => state.lyric.lyricsTotal,
    }),
  },
};
</script>

<style scoped>
.lyric-item {
  margin-bottom: 1%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
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
