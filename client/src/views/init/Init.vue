<template>
  <div class="main">
    <v-app-bar color="primary"><span class="app-bar-element"><strong>lyricsProjection</strong></span></v-app-bar>

    <v-container class="main-container">
      <v-row class="fill-height">
        <v-col align="center" justify="center">
          <h1 class="text-h1"><strong>Setup</strong></h1>
          <br>
          <p>Enter basic information about your organisation / personal project.</p>
        </v-col>
      </v-row>
      <v-row class="fill-height" align="center" justify="center">
        <v-col align="center" justify="center" cols="12" md="6" sm="10">
          <v-card elevation="4" dark>
            <v-container fluid>
              <v-row>
                <v-col cols="4">
                  <v-subheader>Enter Organisation / your name:</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field v-model="organisation" label="Organisation / project"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>Enter project name:</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field v-model="appName" label="Name(Optional)"></v-text-field>
                </v-col>
              </v-row>
              <v-row class="fill-height">
                <v-col class="fill-height" align="end" justify="end">
                  <v-btn color="primary" elevation="2" @click="onSubmit">Save</v-btn>
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
export default {
  name: 'Init',

  data () {
    return {
      organisation: '',
      appName: ''
    }
  },

  methods: {
    onSubmit () {
      if (this.organisation !== '') {
        if (this.appName !== '') {
          const doc = {
            organisation: this.organisation,
            appName: this.appName
          }
          this.$store.dispatch('appState/postInitialState', doc)
        } else {
          const doc = {
            organisation: this.organisation
          }
          this.$store.dispatch('appState/postInitialState', doc)
        }
        this.$router.push({ name: 'Home' })
      } else {
        alert('Organisation is missing, please enter at least organisation!')
      }
    }
  },
  async created () {
    await this.$store.dispatch('appState/fetchState')
    const fetchedState = this.$store.getters['appState/getAppState']
    if (fetchedState !== -1) {
      this.$router.push({ path: '/404' })
    }
  }
}
</script>

<style>
.v-main__wrap {
  background-color:#DCDCDC;
}

.app-bar-element {
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.2rem;
}

.main-container {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
</style>
