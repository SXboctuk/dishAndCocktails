<template>
  <div class="auth__wrapper">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.auth__wrapper {
  max-width: 60rem;
  width: 100%;
  padding: 2rem;
  margin-inline: auto;
  color: var(--app-c-text-black-1);
}
</style>
