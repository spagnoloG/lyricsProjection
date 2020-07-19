<template>
  <div class="error404">
    <div>
      <h2>Stran ne obstaja!</h2>
      <router-link :to="{ name: 'home' }">Nazaj domov</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error404"
};
</script>

<style scoped>
.error404 {
  height: 100vh;
  width: 100vw;
  display: grid;
  justify-content: center;
  align-content: center;
}
</style>
