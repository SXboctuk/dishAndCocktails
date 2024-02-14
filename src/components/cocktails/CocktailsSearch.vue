<template>
  <div class="wrapper">
    <input class="input" type="search" placeholder="Search" v-model="model" />
  </div>
</template>

<script setup lang="ts">
const model = defineModel()
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  text-align: center;
}
.input {
  width: 100%;
  max-width: 60rem;
  margin: 2rem auto;
  padding: 1rem 2rem;
  border-radius: 1000rem;
  font-size: 3rem;
  outline: none;
  border: none;
}
</style>
