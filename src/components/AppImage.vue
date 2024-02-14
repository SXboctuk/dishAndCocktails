<template>
  <div class="wrapper">
    <template v-if="imageSrc">
      <img :src="imageSrc" alt="image" />
    </template>
    <div v-if="pending" class="pending pulsate">Loading...</div>
    <div v-if="error" class="error">
      <span>{{ error }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import useImagesStore from '@/stores/images'

const props = defineProps<{ url: string }>()

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
</style>
