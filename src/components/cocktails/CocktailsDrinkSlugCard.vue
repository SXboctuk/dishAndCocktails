<template>
  <RouterLink
    :to="{ name: routerName.cocktailDetails, params: { id: props.id } }"
  >
    <div class="block">
      <AppImage :url="props.thumb" />
      <div class="name-block">
        <div class="name-block__text cocktail-font__1">{{ name }}</div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { routerName } from '@/router'
import AppImage from '../AppImage.vue'

const props = defineProps<{
  name: string
  thumb: string
  id: string
}>()
</script>

<style lang="scss" scoped>
.block {
  position: relative;
  width: 100%;
  aspect-ratio: 1/1.2;
  transition: transform 0.2s ease;
  overflow: hidden;
  &:hover {
    transform: scale(1.1);
    z-index: 100;
    box-shadow: 0 1rem 1rem 1rem rgba(var(--cocktail-dark-1-rgb), 0.8);
  }
}
.name-block {
  position: absolute;
  bottom: 0;
  width: 101%;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  background: var(--cocktail-dark-3);
  line-height: 1;
  &__text {
    margin: 0 auto;
    padding: 1rem 0;
    max-width: 70%;
  }
}
</style>
