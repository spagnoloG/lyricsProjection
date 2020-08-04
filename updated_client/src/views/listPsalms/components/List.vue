<template>
  <v-card class="mx-auto" max-width="600">
    <v-card-title class="white--text secondary">
      Seznam Psalmov
      <v-spacer></v-spacer>
      <v-btn
      @click="goToAddPsalm"
      color="primary"
      class="text--primary"
      fab small>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text>
      <v-text-field
      v-model="search"
      label="Išči"
      @click="page = 1"
      ></v-text-field>
    </v-card-text>

    <v-divider></v-divider>

    <!-- List Psalms -->
    <div v-for="psalm in paginatedPsalms" :key="psalm.index">
      <v-list-item>
          <v-list-item-avatar>
            <v-avatar
            color="secondary"
              size="56"
              class="white--text"
            >
              {{ psalm.index }}
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ psalm.title }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn
              depressed
              small
            ><v-icon
              color="secondary"
              >
              mdi-dots-horizontal
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
    </div>
    <v-divider></v-divider>
    <br>
    <v-pagination
      v-model="page"
      :length="totalPages"
      :per-page=10
    ></v-pagination>
    <br>
    <v-divider></v-divider>
  </v-card>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      search: '',
      perPage: 5,
      page: 1,
      totalVisible: 10
    }
  },
  computed: {
    allPsalms () {
      return Object.keys(this.filteredPsalms).map(pid => this.filteredPsalms[pid])
    },
    filteredPsalms () {
      return this.psalms.filter((psalm) => {
        return psalm.title.toUpperCase().match(this.search.toUpperCase())
      })
    },
    paginatedPsalms () {
      return this.allPsalms.slice((this.page - 1) * this.perPage, this.page * this.perPage)
    },
    totalPages () {
      return Math.ceil(this.allPsalms.length / this.perPage)
    },
    ...mapGetters({
      psalms: 'psalm/getAllPsalms'
    })
  },
  methods: {
    goToAddPsalm () {
      this.$router.push({ name: 'AddPsalm' })
    }
  }
}
</script>

<style>

</style>
