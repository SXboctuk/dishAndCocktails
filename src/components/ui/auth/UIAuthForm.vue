<template>
  <form @submit.prevent="() => emits('submit')" class="auth__form">
    <slot />
  </form>
</template>

<script setup lang="ts">
const emits = defineEmits<{ submit: [] }>()
</script>

<style scoped>
.auth__form {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 2rem;
}
</style>
