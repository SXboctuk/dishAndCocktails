<template>
  <div class="container">
    <slot />
  </div>
</template>
<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  max-width: 1280px;
  flex: 1 1 100%;
  padding: 0 1rem;
  padding-right: 3.4rem;
}
</style>
<script setup lang="ts"></script>
