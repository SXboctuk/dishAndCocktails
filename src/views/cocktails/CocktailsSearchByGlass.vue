<template>
  <section class="page">
    <template v-if="error">{{ error }}</template>
    <template v-else-if="pending"><CocktailsLoading /></template>
    <template v-else-if="drinksSlugs.length > 0">
      <h2 class="cocktail-title__2">{{ router.params.slug }}</h2>
      <div class="grid-3 lg-grid-2 md-grid-1">
        <CocktailsDrinkSlugCard
          v-for="slug in drinksSlugs"
          :key="slug.id"
          :name="slug.name"
          :id="slug.id"
          :thumb="slug.thumb"
        />
      </div>
    </template>
    <template v-else>Nothing found</template>
  </section>
</template>

<script setup lang="ts">
import useDrinksByGlassStore from '@/stores/cocktails/drinksByGlass'
import CocktailsDrinkSlugCard from '@/components/cocktails/CocktailsDrinkSlugCard.vue'
import CocktailsLoading from '@/components/cocktails/CocktailsLoading.vue'
import { useRoute } from 'vue-router'

const router = useRoute()
const { getDrinks } = useDrinksByGlassStore()
const { drinksSlugs, error, pending } = getDrinks(router.params.slug as string)
</script>

<style scoped></style>
