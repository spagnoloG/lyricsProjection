<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Vnesi naslov</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">Izberi kategorijo</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">Vnesi besedilo</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-12" color="grey lighten-1" height="200px">
          <v-form>
            <v-container>
              <v-row>
                <v-col></v-col>
                <v-col
                cols="12"
                sm="6">
                  <v-text-field
                    v-model="title"
                    label="Naslov Psalma"
                    required>
                  </v-text-field>
                </v-col>
                <v-col></v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>

        <v-container fluid>
          <v-row>
            <v-col>
              <v-btn color="primary" @click="e1 = 2">Nadaljuj</v-btn>
            </v-col>
            <v-col align="end">
              <v-btn text :to="{ name: 'Home'}">Domov</v-btn>
            </v-col>
          </v-row>
        </v-container>

      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

        <v-container>
          <v-row>
            <v-col>
              <v-btn color="primary" @click="e1 = 3">Nadaljuj</v-btn>
              <v-btn text  @click="--e1">Nazaj</v-btn>
            </v-col>
          </v-row>
        </v-container>

      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

        <v-container fluid>
          <v-row>
            <v-col>
              <v-btn text @click="--e1">Nazaj</v-btn>
            </v-col>
            <v-col align="end">
              <v-btn color="primary" stext :to="{ name: 'Home'}">Shrani</v-btn>
            </v-col>
          </v-row>
        </v-container>

      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
export default {
  data () {
    return {
      e1: 1,
      title: '',
      category: '',
      content: ''
    }
  }
}
</script>

<style>
</style>
