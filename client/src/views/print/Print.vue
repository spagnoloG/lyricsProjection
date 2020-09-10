<template>
  <div>
    <v-container fluid>
      <v-row  class="fill-height">
        <v-col align="end">
          <v-btn @click="print()" icon>
            <v-icon>mdi-printer</v-icon>
         </v-btn>
        </v-col>
      </v-row>
      <v-row class="fill-height">
        <v-col align="center" justify="center">
          <table class="styled-table">
            <thead>
              <tr>
                <th>Številka pesmi</th>
                <th>Naslov pesmi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="lyric in lyrics" :key="lyric.index">
                <td>{{ lyric.index }}</td>
                <td>{{ lyric.title }}</td>
              </tr>
            </tbody>
          </table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Print',
  data () {
    return {
      headers: [
        { text: 'Naslov pesmi', align: 'start', value: 'title' },
        { text: 'Številka pesmi', align: 'start', value: 'index' }
      ],
      tests: 70
    }
  },
  computed: {
    ...mapGetters({
      lyrics: 'lyric/getAllLyrics'
    })
  },
  methods: {
    print () {
      window.print()
    }
  },
  created () {
    this.$store.dispatch('lyric/fetchLyrics')
  }
}
</script>

<style scoped>
.styled-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.styled-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
}

.styled-table th,
.styled-table td {
    padding: 12px 15px;
}

.styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
    background-color: #bdbdbd;
}

.styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
}

.styled-table tbody tr.active-row {
    font-weight: bold;
    color: #009879;
}
</style>
