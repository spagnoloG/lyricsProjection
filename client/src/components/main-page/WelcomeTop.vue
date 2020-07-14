<template>
  <div class="nav-spacing">
    <!-- Image and Title -->
    <b-navbar toggleable="md" variant="dark" type="dark">
      <b-navbar-brand :to="{ name: 'home' }">
        <img
          src="@/assets/slikaCerkve.jpg"
          width="40"
          height="40"
          class="d-inline-block align-top"
          alt="Kitten"
        />
        <strong class="glavni-napis">Župnija Šempeter pri Gorici</strong>
      </b-navbar-brand>


      <!-- Routes and Options -->
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto" right>
          <b-nav-item :to="{ name: 'project' }">Projeciraj</b-nav-item>
          <b-nav-item :to="{ name: 'list' }">Pregled</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* .nav-spacing {
    margin-bottom: 3%;
} */

.glavni-napis {
  margin-left: 5%;
}
</style>