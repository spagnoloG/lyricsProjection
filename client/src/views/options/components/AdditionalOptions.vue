<template>
<div>
  <v-card class="mx-auto">
    <v-card-title class="white--text secondary">AdditionalOptions</v-card-title>
  </v-card>
  <br>
  <v-expansion-panels multiple>
    <v-expansion-panel>
      <v-expansion-panel-header>
        Margins (define margins in display)
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="6">
              <v-slider
              label="Left margin"
              v-model="marginLeft"
              max="5"
              min="0"
              thumb-label="always">
              </v-slider>
            </v-col>
            <v-col cols="12" md="6">
              <v-slider
              label="Right margin"
              v-model="marginRight"
              max="5"
              min="0"
              thumb-label="always">
              </v-slider>
            </v-col>
          </v-row>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header>
        Organisation name
      </v-expansion-panel-header>
      <v-expansion-panel-content>
         <v-text-field
            v-model="organisation"
            counter="25"
            label="Organisation name"
          ></v-text-field>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header>
        Application name
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-text-field
            v-model="appName"
            counter="25"
            label="App name"
          ></v-text-field>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
  <v-container fluid v-if="edited">
    <v-row class="fill-height" align="center" justify="center">
      <v-col align="center" justify="center">
        <v-btn color="green darken-1" text @click="updateState"
          >Save</v-btn>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
export default {
  name: 'AdditionalOptions',

  data () {
    return {
      edited: false,
      appState: null,
      organisation: null,
      appName: null,
      marginLeft: null,
      marginRight: null
    }
  },

  watch: {
    organisation: function (newOrganisation, oldOrganisation) {
      if (oldOrganisation !== null) {
        this.edited = true
      }
    },
    appName: function (newAppName, oldAppName) {
      if (oldAppName !== null) {
        this.edited = true
      }
    },
    marginLeft: function (newMargin, oldMargin) {
      if (oldMargin !== null) {
        this.edited = true
      }
    },
    marginRight: function (newMargin, oldMargin) {
      if (oldMargin !== null) {
        this.edited = true
      }
    }
  },

  methods: {
    updateState () {
      if (this.organisation === '') {
        alert('You must enter at least organisation!')
        this.edited = false
      } else {
        this.$store.dispatch('appState/updateState', this.returnDocument())
        this.edited = false
      }
    },
    returnDocument () {
      const doc = {
        _id: this.appState._id,
        organisation: this.organisation,
        appName: this.appName,
        marginLeft: this.marginLeft,
        marginRight: this.marginRight
      }
      return doc
    }
  },

  async created () {
    await this.$store.dispatch('appState/fetchState')
    this.appState = this.$store.getters['appState/getAppState']
    this.organisation = this.appState.organisation ? this.appState.organisation : ''
    this.appName = this.appState.appName ? this.appState.appName : ''
    this.marginLeft = this.appState.marginLeft ? this.appState.marginLeft : 2
    this.marginRight = this.appState.marginRight ? this.appState.marginRight : 2
  }
}
</script>
