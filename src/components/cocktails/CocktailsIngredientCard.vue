<template>
  <div class="ingredient">
    <div class="ingredient__image">
      <AppImage
        :url="ingredienThumbURL(props.name)"
        :loading-component="CocktailsLoading"
      />
    </div>
    <div class="ingredient__name cocktail-font__2">
      {{ props.name }}
    </div>
    <div class="ingredient__measure cocktail-font__3" v-if="props.measure">
      {{ props.measure }}
    </div>
  </div>
</template>

<script setup lang="ts">
import useCocktails from '@/composables/useCocktails'
import CocktailsLoading from '@/components/cocktails/CocktailsLoading.vue'
import AppImage from '../AppImage.vue'

const { ingredienThumbURL } = useCocktails()
const props = defineProps<{
  name: string
  measure: string | null
  size?: 'sm' | 'md' | 'lg'
}>()
</script>

<style scoped lang="scss">
.ingredient {
  &__image {
    aspect-ratio: 1/1;
  }
  &__name {
    margin-top: 2rem;
    line-height: 1;
    text-align: center;
  }
  &__measure {
    text-align: center;
  }
}
</style>
