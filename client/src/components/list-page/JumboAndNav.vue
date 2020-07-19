<template>
  <div>
    <!-- Jumbotron -->
    <div>
      <b-jumbotron header-level="5" header="Seznam pesmi" class="jumbo-tron">
        <p>Kliknite na pesem za izbiro možnosti in urejanje</p>
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../../main.js";

export default {};
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
