<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-group id="input-group-1" label="Številka pesmi" label-for="input-1">
        <b-form-input id="input-1" v-model="index" required placeholder="Vnesi stevilko"></b-form-input>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: ""
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      console.log("smo tle")
      this.$router.push({name: 'project', params: {id: Number(this.index)}});
    }
  }
};
</script>

<style>
</style>