<template>
  <div>
  <b-jumbotron>
    <template v-slot:header><strong>Projekcija Pesmi</strong></template>

    <template v-slot:lead>
        Dobrodošel/a na spletnem vmesniku za projekcijo pesmi. Izberi gumb "Projeciraj" za projekcijo pesmi na projektorju. 
    </template>

    <hr class="my-4">

    <p>
     Za dodajanje nove pesmi klikni na gumb "dodaj novo pesem".  Za pregled,
      urejanje in izbris pesmi, izberi "Pregled" v orodni vrstici.
    </p>

    <b-button pill variant="warning" 
    :to="{ path: 'project/0' }"
    class="btn-jumbotron"
    size="lg"><b-icon icon="play-fill"></b-icon> Projeciraj</b-button>
    
    <b-button pill variant="info" 
    :to="{ name: 'add' }"
    class="btn-jumbotron"
    size="lg"><b-icon icon="pencil-square"></b-icon>  Dodaj novo pesem</b-button>

  </b-jumbotron>
</div>
</template>

<script>
//import { eventBus } from '../../main.js';

export default {
  data() {
    return {
      enableEditor: false
    };
  },
  methods: {
    // openTextEditor() {
    //   this.enableEditor = true;
    //   eventBus.$emit('openTextEditor', this.enableEditor);
    // }
  }
}
</script>

<style scoped>
.btn-jumbotron {
    margin: 1% 3% 0 3%;
}
</style>