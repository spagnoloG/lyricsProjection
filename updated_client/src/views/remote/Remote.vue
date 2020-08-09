<template>
 <v-container>
    <v-tabs centered>
      <v-tabs-slider/>
      <v-tab><v-icon x-large>mdi-dialpad</v-icon></v-tab>
      <v-tab><v-icon x-large>mdi-play-box-outline</v-icon></v-tab>

      <v-tab-item>
        <remote-controller></remote-controller>
      </v-tab-item>
      <v-tab-item>
        <slide-controller></slide-controller>
      </v-tab-item>
    </v-tabs>
 </v-container>
</template>

<script>
import RemoteController from './components/RemoteController.vue'
import SlideController from './components/SlideController'

export default {
  components: {
    RemoteController,
    SlideController
  }
}
</script>

<style>

</style>
