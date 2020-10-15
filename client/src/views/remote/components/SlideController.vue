<template>
  <div class="main">
    <!-- <div class="select-playlist" v-if="step === 0">
      <v-container fluid>
        <v-row>
          <v-col align="center">
            <h2>Projeciraj seznam predvajanj</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col></v-col>
          <v-col cols="12" md="8">
            <v-select
            :items="playlists"
            item-text="playlistName"
            v-model="selectedPlaylist"
            return-object
            label="Izberi"
            />
          </v-col>
          <v-col></v-col>
        </v-row>
        <v-row>
          <v-col class="fill-height" align="center" justify="center">
            <v-btn
            @click="startProjectingPlaylist"
            depressed
            color="success"
            >Projeciraj  <v-icon>mdi-cast</v-icon></v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="playlist-player" v-if="step === 1">
      <v-container fluid>
        <v-row>
          <v-col class="fill-height" align="center" justify="center">
            <h1>{{ selectedPlaylist.playlistName }}</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col></v-col>
          <v-col cols="12" sm="6">
            <v-progress-linear
            color="teal"
            buffer-value="0"
            v-model="progress"
            stream
            ></v-progress-linear>
            <v-card flat tile>
             <v-window v-model="position" vertical>
               <v-window-item v-for="index in selectedPlaylist.indexes" :key="index">
                 <v-card color="grey" height="200">
                   <v-row
                     class="fill-height"
                     align="center"
                     justify="center">
                     <h1  class="white--text">
                       {{ currentLyric.title ? currentLyric.title : 'naslov' }}
                     </h1>
                   </v-row>
                 </v-card>
               </v-window-item>
             </v-window>

             <v-card-actions class="justify-space-between">
               <v-btn text @click="goBack">
                 <v-icon>mdi-chevron-left</v-icon>
               </v-btn>
               <v-item-group
                 v-model="position"
                 class="text-center"
                 mandatory>
                 <v-item
                   v-for="index in selectedPlaylist.indexes"
                   :key="index"
                   v-slot:default="{ active, toggle }">
                   <v-btn
                     :input-value="active"
                     icon
                     @click="toggle">
                     <v-icon>mdi-record</v-icon>
                   </v-btn>
                 </v-item>
               </v-item-group>
               <v-btn text @click="goForward">
                 <v-icon>mdi-chevron-right</v-icon>
               </v-btn>
             </v-card-actions>
           </v-card>
          </v-col>
          <v-col></v-col>
        </v-row>
        <v-row>
          <v-col align="center" cols="12" sm="4">
            <v-btn
            @click="scroll('up')"
            class="mx-2"
            fab
            color="primary"><v-icon>mdi-arrow-up-bold</v-icon></v-btn>
          </v-col>
          <v-col class="fill-height" align="center" justify="center" cols="12" sm="4">
             <v-btn @click="stopProjection" text large color="error">Zaključi</v-btn>
          </v-col>
          <v-col align="center" cols="12" sm="4">
            <v-btn
            @click="scroll('down')"
            class="mx-2"
            fab
            color="primary"><v-icon>mdi-arrow-down-bold</v-icon></v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div> -->
    <p> Misko</p>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

// export default {
//   name: 'SlideController',
//   data () {
//     return {
//       step: 0,
//       playlists: null,
//       selectedPlaylist: null,
//       playlistId: null,
//       position: 0,
//       currentLyric: null,
//       length: 3
//     }
//   },
//   computed: {
//     progress () {
//       return this.position / (this.selectedPlaylist.indexes.length - 1) * 100
//     },
//     ...mapGetters({
//       currentLyricId: 'socket/getCurrentLyric'
//     })
//   },
//   watch: {
//     currentLyricId: function (newId, oldId) {
//       this.position = this.selectedPlaylist.indexes.indexOf(newId)
//       this.currentLyric = this.$store.getters['lyric/getLyricByIndex'](newId)
//     }
//   },
//   methods: {
//     startProjectingPlaylist () {
//       if (this.selectedPlaylist !== null) {
//         this.$store.dispatch('playlist/fetchPlaylist', this.selectedPlaylist._id)
//         this.currentLyric = this.$store.getters['lyric/getLyricByIndex'](this.selectedPlaylist.indexes[0])
//         const message = {
//           currentLyric: this.selectedPlaylist.indexes[this.position],
//           currentPlaylist: this.selectedPlaylist._id
//         }
//         this.$store.dispatch('socket/sendRemoteMessage', message)
//         this.step++
//       }
//     },
//     goForward () {
//       if (this.position === this.selectedPlaylist.indexes.length - 1) {
//         return null
//       } else {
//         this.position++
//         const message = {
//           currentLyric: this.selectedPlaylist.indexes[this.position],
//           currentPlaylist: this.selectedPlaylist._id
//         }
//         this.$store.dispatch('socket/sendRemoteMessage', message)
//       }
//     },
//     goBack () {
//       if (this.position === 0) {
//         return null
//       } else {
//         this.position--
//         const message = {
//           currentLyric: this.selectedPlaylist.indexes[this.position],
//           currentPlaylist: this.selectedPlaylist._id
//         }
//         this.$store.dispatch('socket/sendRemoteMessage', message)
//       }
//     },
//     scroll (direction) {
//       this.$store.dispatch('socket/sendScrollMessage', direction)
//     },
//     stopProjection () {
//       this.$store.dispatch('socket/stopProjection')
//       this.step--
//     }
//   },
//   mounted () {
//     setTimeout(() => {
//       if (this.$store.getters['socket/getCurrentPlaylist'] === null) {
//         this.step = 0
//         this.playlists = this.$store.getters['playlist/getAllPlaylists']
//       } else {
//         this.playlistId = this.$store.getters['socket/getCurrentPlaylist']
//         this.currentLyric = this.$store.getters['lyric/getLyricByIndex'](this.$store.getters['socket/getCurrentLyric'])
//         this.selectedPlaylist = this.$store.getters['playlist/getPlaylistById'](this.playlistId)
//         this.position = this.selectedPlaylist.indexes.indexOf(this.$store.getters['socket/getCurrentLyric'])
//         this.step = 1
//       }
//     }, 200)
//   }
// }
</script>
