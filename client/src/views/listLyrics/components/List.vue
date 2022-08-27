<template>
  <div>
    <!-- Show delete dialog -->
    <div>
      <v-overlay :value="deleteDialog">
        <h1>{{$t('Are you sure?')}}</h1>
        <br />
        <v-btn @click="deleteDialog = false" color="primary" class="mx-3">
          {{$t('Cancel')}}</v-btn
        >
        <v-btn @click="deleteLyric" color="primary" class="mx-3">
          {{$t('Yes')}}
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
                  <v-avatar color="secondary" size="35" class="white--text">{{
                    selectedLyric._id
                  }}</v-avatar>
                </v-col>
                <v-col cols="8" align="center">
                  <h3 class="headline">{{ selectedLyric.title }}</h3>
                </v-col>
                <v-col cols="1" align="center">
                  <v-icon color="primary" @click="showDeleteDialog"
                    >mdi-delete</v-icon
                  >
                </v-col>
              </v-row>
              <v-row justify="center" align="center">
                <v-col cols="6" align="center">
                  <v-btn
                    :to="{
                      name: 'EditLyric',
                      params: { id: selectedLyric._id }
                    }"
                    small
                    outlined
                    color="primary"
                  >
                    <v-icon left>mdi-lead-pencil</v-icon>Edit
                  </v-btn>
                </v-col>
                <v-col cols="6" align="center">
                  <v-btn
                    :to="{
                      name: 'Project',
                      params: { id: selectedLyric._id },
                      query: { type: 'lyric' }
                    }"
                    small
                    outlined
                    color="primary"
                  >
                    <v-icon left>mdi-image-multiple</v-icon>{{ $t('Peek')}}
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" align="center">
                  <v-btn @click="onProject" small outlined color="primary">
                    <v-icon left>mdi-cast</v-icon>{{$t('Project')}}
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="showPopUp = false" color="primary" text
                >{{$t('Cancel')}}</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>

    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="8">
          <!-- Card header -->
          <v-card class="mx-auto">
            <v-card-title class="white--text secondary">
              {{$t('List of Lyrics')}}
              <v-spacer></v-spacer>
              <v-btn
                @click="goToAddLyric"
                color="tercinary"
                class="text--primary"
                fab
                small
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text>
              {{$t('Search, Edit and Project Lyrics.')}}
              <v-text-field
                v-model="search"
                label="Search"
                @click="page = 1"
                append-icon="mdi-magnify"
              ></v-text-field>
            </v-card-text>

            <v-divider></v-divider>

            <!-- List lyrics -->
            <div v-for="(lyric, index) in paginatedLyrics" :key="lyric._id">
              <v-list-item>
                <div class="lyric-index">
                  {{ lyric._id }}
                </div>
                <v-list-item-content>
                  <v-list-item-title>{{ lyric.title }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn depressed small @click="selectLyric(lyric, index)">
                    <v-icon color="secondary">mdi-dots-horizontal</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </div>
            <v-divider></v-divider>
            <br />
            <v-pagination
              v-model="page"
              :length="totalPages"
              :total-visible="totalVisible"
              circle
            ></v-pagination>
            <br />
            <v-divider></v-divider>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card class="mx-auto">
            <v-card-title class="white--text secondary">
              {{$t('Choose Category')}}
              <v-spacer></v-spacer>
              <v-btn
                :to="{ name: 'Options' }"
                color="tercinary"
                class="text--primary"
                fab
                small
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-container>
              <v-row>
                <v-col>
                  <v-select
                    v-model="selectedCategories"
                    :items="availableCategories"
                    label="Choose"
                    multiple
                    chips
                    :hint="$t('Available Categories')"
                    persistent-hint
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
          <br />
          <v-card class="mx-auto">
            <v-card-title class="white--text secondary">
              {{$t('Print List of Lyrics')}}
              <v-spacer></v-spacer>
              <v-icon>mdi-printer</v-icon>
            </v-card-title>
            <v-divider></v-divider>
            <v-container fluid>
              <v-row class="fill-height">
                <v-col align="center" justify="center">
                  <v-btn :to="{ name: 'Print' }">{{$t('Print')}}</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'List',
  data () {
    return {
      search: '',
      perPage: 12,
      page: 1,
      totalVisible: 6,
      showPopUp: false,
      deleteDialog: false,
      selectedLyric: Object,
      selectedCategories: []
    }
  },
  computed: {
    filteredLyrics () {
      return this.lyrics.filter((lyric) => {
        return (lyric.title.toUpperCase().match(this.search.toUpperCase()) ||
          lyric._id === Number(this.search ||
          this.ignoreNoisemakers(lyric.title, this.search))) && this.selectedCategories.every(i => lyric.categories.includes(i))
      })
    },
    paginatedLyrics () {
      return this.filteredLyrics.slice((this.page - 1) * this.perPage, this.page * this.perPage)
    },
    totalPages () {
      return Math.ceil(this.filteredLyrics.length / this.perPage)
    },
    ...mapGetters({
      lyrics: 'lyric/getAllLyrics',
      availableCategories: 'lyric/getCategories'
    })
  },
  methods: {
    goToAddLyric () {
      this.$router.push({ name: 'AddLyric' })
    },
    selectLyric (lyric, index) {
      this.selectedLyric = lyric
      this.selectedLyric.index = index
      this.showPopUp = true
    },
    showDeleteDialog () {
      this.showPopUp = false
      this.deleteDialog = true
    },
    deleteLyric () {
      this.deleteDialog = false
      this.$store.dispatch('lyric/deleteLyric', this.selectedLyric._id)
    },
    onProject () {
      const document = {
        currentLyric: this.selectedLyric._id,
        currentPlaylist: null
      }
      this.$store.dispatch('socket/sendRemoteMessage', document)
      this.showPopUp = false
    },
    ignoreNoisemakers (t1, t2) {
      t1.toLowerCase()
        .replaceAll('š', 's')
        .replaceAll('č', 'c')
        .replaceAll('ć', 'c')
        .replaceAll('ž', 'c')

      t2.toLowerCase()
        .replaceAll('š', 's')
        .replaceAll('č', 'c')
        .replaceAll('ć', 'c')
        .replaceAll('ž', 'c')

      return t1 === t2
    }
  }
}
</script>

<style>
.lyric-index{
  margin-right: 30px;
  font-weight: bold;
}
</style>
