<template>
  <button class="auth__btn"><slot /></button>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.auth__btn {
  display: block;
  padding: 1rem 2rem;
  font-size: 2rem;
  border: none;
  outline: none;
  transition: filter 0.2s ease;
  cursor: pointer;

  &:hover {
    filter: brightness(0.8);
  }
  &:disabled {
    filter: brightness(0.6);
  }
}
</style>
