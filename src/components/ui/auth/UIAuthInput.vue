<template>
  <input class="auth__input" v-model="model" />
</template>

<script lang="ts" setup>
const model = defineModel<string>({ required: true })
</script>

<style scoped>
.auth__input {
  font-size: 2rem;
  padding: 1rem 2rem;

  border: none;
  border-bottom: 0.2rem solid var(--app-c-text-black-2);
  outline: none;
}
</style>
