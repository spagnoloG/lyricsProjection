<template>
  <div>
    <h1>{{ id }}</h1>
  </div>
</template>

<script>
export default {
  name: "Project",
  data() {
    return {
      lyric: {}
    };
  },
  computed: {
    id() {
      return Number(this.$route.params.id);
    }
  }
};
</script>