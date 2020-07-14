<template>
  <div>
    <!-- Jumbotron -->
    <div>
      <b-jumbotron header-level="5" header="Seznam pesmi" class="jumbo-tron">
        <p>Kliknite na pesem za izbiro možnosti in urejanje</p>
      </b-jumbotron>
    </div>
    <!-- Search bar -->
    <div class="search-bar">
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav class="ml-auto">
          <b-nav-form right>
            <form @submit.prevent>
              <b-form-input
                class="mr-sm-2"
                placeholder="Naslov / številka pesmi"
                right
                v-model="searchData"
                v-on:keyup.enter="onSubmit()"
              ></b-form-input>
              <b-button
                variant="dark"
                class="my-2 my-sm-0"
                right
                @click.prevent="onSubmit()"
              >Iskanje</b-button>
            </form>
          </b-nav-form>
        </b-navbar-nav>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../../main.js";

export default {
  data() {
    return {
      searchData: ""
    };
  },
  methods: {
    onSubmit() {
      eventBus.$emit("listSearchTerm", this.searchData);
      this.searchData = "";
    }
  }
};
</script>

<style scoped>
.jumbo-tron {
  margin-bottom: 0;
  padding: 1% 0 1% 0;
}
.search-bar {
  margin-bottom: 2%;
}
</style>