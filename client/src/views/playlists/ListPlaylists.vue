<template>
  <div class="main">
    <div class="list">
      <!-- Card header -->
      <v-card class="mx-auto" max-width="600">
        <v-card-title class="white--text secondary">
          Seznami predvajanj
          <v-spacer></v-spacer>
          <v-btn @click="newPlaylist" color="primary" class="text--primary" fab small>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <v-text-field v-model="search" label="Išči" @click="page = 1"></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <!-- List Playlists -->
        <div v-for="playlist in paginatedPlaylists" :key="playlist._id">
          <v-list-item>
            <v-list-item-avatar>
              <v-avatar color="secondary" size="56" class="white--text">{{ playlist.playlistName[0] }}</v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ playlist.playlistName }}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn depressed small @click="selectPlaylist(playlist)">
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

    <div class="popUpMessage">
      <!-- Show popup message -->
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
                  ><v-icon>mdi-play-speed</v-icon></v-avatar>
                </v-col>
                <v-col cols="8" align="center">
                  <h3 class="headline">{{ selectedPlaylist.playlistName }}</h3>
                </v-col>
                <v-col cols="1" align="center">
                  <v-icon color="primary" @click="showDeleteDialog">mdi-delete</v-icon>
                </v-col>
              </v-row>
              <v-row justify="center" align="center">
                <v-col cols="6" align="center">
                  <v-btn
                    :to="{ name: 'EditPlaylist', params: { id: selectedPlaylist._id }}"
                    small
                    outlined
                    color="primary"
                  >
                    <v-icon>mdi-lead-pencil</v-icon>Uredi
                  </v-btn>
                </v-col>
                <v-col cols="6" align="center">
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

    <div class="deleteDialog">
      <!-- Show delete dialog -->
      <v-overlay :value="deleteDialog">
        <h1>Si prepričan/a?</h1>
        <br />
        <v-btn @click="deleteDialog = false"
          color="primary"
          class="mx-3">
          Prekliči</v-btn>
        <v-btn @click="deletePlaylist" color="primary" class="mx-3">
          Da<v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-overlay>
    </div>
  </div>
</template>

<script>
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
      selectedPlaylist: Object
    }
  },
  computed: {
    allPlaylists () {
      return Object.keys(this.filteredPlaylists).map(pid => this.filteredPlaylists[pid])
    },
    filteredPlaylists () {
      return this.playlists.filter((playlist) => {
        return playlist.playlistName.toUpperCase().match(this.search.toUpperCase())
      })
    },
    paginatedPlaylists () {
      return this.allPlaylists.slice((this.page - 1) * this.perPage, this.page * this.perPage)
    },
    totalPages () {
      return Math.ceil(this.allPlaylists.length / this.perPage)
    },
    ...mapGetters({
      playlists: 'playlist/getAllPlaylists'
    })
  },
  methods: {
    newPlaylist () {
      this.$router.push({ name: 'EditPlaylist', params: { id: 'new' } })
    },
    selectPlaylist (playlist) {
      this.selectedPlaylist = playlist
      this.showPopUp = true
    },
    showDeleteDialog () {
      this.showPopUp = false
      this.deleteDialog = true
    },
    deletePlaylist () {
      this.$store.dispatch('playlist/deletePlaylist', this.selectPlaylist._id)
    },
    onProject () {}
  },
  created () {
    this.$store.dispatch('playlist/fetchPlaylists')
  }
}
</script>
// https://vuetifyjs.com/en/components/slide-groups/
