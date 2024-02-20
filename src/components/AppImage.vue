<template>
  <div class="wrapper">
    <template v-if="imageSrc">
      <img :src="imageSrc" alt="image" />
    </template>
    <div v-if="pending" class="pending pulsate">
      <template v-if="props.loadingComponent"
        ><component :is="props.loadingComponent"
      /></template>
      <template v-else>
        <span>Loading...</span>
      </template>
    </div>
    <div v-if="error" class="error">
      <span>{{ error }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import useImagesStore from '@/stores/images'
import type { Component } from 'vue'

const props = defineProps<{ url: string; loadingComponent?: Component }>()

const { getImage } = useImagesStore()
const { error, imageSrc, pending } = getImage(props.url)
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  height: 100%;
}
.error {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: var(--app-c-text-black-2);
  color: var(--app-c-text-light-2);
}
.pending {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.pulsate {
  background-size: 400% 400%;
  animation: pulse 2.25s ease infinite;
}
@keyframes pulse {
  0%,
  100% {
    background-color: var(--app-c-text-light-2);
  }
  50% {
    background-color: var(--app-c-text-grey-1);
  }
}
</style>
