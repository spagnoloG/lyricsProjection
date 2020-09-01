<template>
  <div>
    <!-- Show delete dialog -->
    <div>
      <v-overlay :value="deleteDialog">
        <h1>Si prepričan/a?</h1>
        <br />
        <v-btn @click="deleteDialog = false"
         color="primary"
         class="mx-3">
         Prekliči</v-btn>
        <v-btn @click="deleteLyric" color="primary" class="mx-3">
          Da
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-overlay>
    </div>

    <!-- Show popup message -->
    <div>
      <v-row justify="center">
        <v-dialog v-model="showPopUp" persistent max-width="360">
          <v-card>
            <v-container>
              <v-row>
                <v-col align="center" cols="2">
                  <v-avatar
                    color="secondary"
                    size="35"
                    class="white--text"
                  >{{ selectedLyric.index }}</v-avatar>
                </v-col>
                <v-col cols="8" align="center">
                  <h3 class="headline">{{ selectedLyric.title }}</h3>
                </v-col>
                <v-col cols="1" align="center">
                  <v-icon color="primary" @click="showDeleteDialog">mdi-delete</v-icon>
                </v-col>
              </v-row>
              <v-row justify="center" align="center">
                <v-col cols="6" align="center">
                  <v-btn
                    :to="{ name: 'EditLyric', params: { id: selectedLyric.index }}"
                    small
                    outlined
                    color="primary"
                  >
                    <v-icon>mdi-lead-pencil</v-icon>Uredi
                  </v-btn>
                </v-col>
                <v-col cols="6" align="center">
                  <v-btn
                    :to="{ name: 'Project', params: { id: selectedLyric.index }, query: { type: 'lyric' } }"
                    small
                    outlined
                    color="primary"
                  >
                    <v-icon>mdi-image-multiple</v-icon>Oglej
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" align="center">
                  <v-btn
                  @click="onProject"
                  small
                  outlined
                  color="primary">
                    <v-icon>mdi-cast</v-icon>Projeciraj
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="showPopUp = false" color="primary" text>Prekliči</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>

    <!-- Card header -->
    <v-card class="mx-auto" max-width="600">
      <v-card-title class="white--text secondary">
        Seznam pesmi
        <v-spacer></v-spacer>
        <v-btn @click="goToAddLyric" color="primary" class="text--primary" fab small>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-text-field v-model="search" label="Išči" @click="page = 1"></v-text-field>
      </v-card-text>

      <v-divider></v-divider>

      <!-- List lyrics -->
      <div v-for="lyric in paginatedLyrics" :key="lyric.index">
        <v-list-item>
          <v-list-item-avatar>
            <v-avatar color="secondary" size="56" class="white--text">{{ lyric.index }}</v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ lyric.title }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn depressed small @click="selectLyric(lyric)">
              <v-icon color="secondary">mdi-dots-horizontal</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </div>
      <v-divider></v-divider>
      <br />
      <v-pagination v-model="page" :length="totalPages" :total-visible="totalVisible" circle></v-pagination>
      <br />
      <v-divider></v-divider>
    </v-card>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      search: '',
      perPage: 5,
      page: 1,
      totalVisible: 6,
      showPopUp: false,
      deleteDialog: false,
      selectedLyric: Object
    }
  },
  computed: {
    allLyrics () {
      return Object.keys(this.filteredLyrics).map(pid => this.filteredLyrics[pid])
    },
    filteredLyrics () {
      return this.lyrics.filter((lyric) => {
        return lyric.title.toUpperCase().match(this.search.toUpperCase())
      })
    },
    paginatedLyrics () {
      return this.allLyrics.slice((this.page - 1) * this.perPage, this.page * this.perPage)
    },
    totalPages () {
      return Math.ceil(this.allLyrics.length / this.perPage)
    },
    ...mapGetters({
      lyrics: 'lyric/getAllLyrics'
    })
  },
  methods: {
    goToAddLyric () {
      this.$router.push({ name: 'AddLyric' })
    },
    selectLyric (lyric) {
      this.selectedLyric = lyric
      this.showPopUp = true
    },
    showDeleteDialog () {
      this.showPopUp = false
      this.deleteDialog = true
    },
    deleteLyric () {
      this.deleteDialog = false
      this.$store.dispatch('lyric/deleteLyric', this.selectedLyric.index)
      this.$store.dispatch('appState/showSnackbar', 'Pesem uspešno izbrisana!')
    },
    onProject () {
      const document = {
        index: this.selectedLyric.index,
        type: 'lyric'
      }
      this.socket.emit('onSocketProject', document)
    }
  },
  created () {
    // Connect to socket.io
    this.socket = io('http://' + window.location.hostname + ':3000')
  }
}
</script>
