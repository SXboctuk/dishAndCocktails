<template>
  <span class="auth__footer-link"><slot /></span>
</template>

<script setup lang="ts"></script>

<style scoped>
.auth__footer-link {
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: var(--app-c-text-black-2);
  }
}
</style>
