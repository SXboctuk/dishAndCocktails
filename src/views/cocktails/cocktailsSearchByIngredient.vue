<template>
  <section>
    <template v-if="error">{{ error }}</template>
    <template v-else-if="pending"><CocktailsLoading /></template>
    <template v-else-if="drinksSlugs.length > 0">
      <h2 class="cocktail-title__2">{{ router.params.slug }}</h2>
      <UIGrid :xl="3" :lg="2" :md="1">
        <CocktailsDrinkSlugCard
          v-for="slug in drinksSlugs"
          :key="slug.id"
          :name="slug.name"
          :id="slug.id"
          :thumb="slug.thumb"
        />
      </UIGrid>
    </template>
    <template v-else>Nothing found</template>
  </section>
</template>

<script setup lang="ts">
import useDrinksByIngredientStore from '@/stores/cocktails/drinkByIngredient'
import CocktailsDrinkSlugCard from '@/components/cocktails/CocktailsDrinkSlugCard.vue'
import CocktailsLoading from '@/components/cocktails/CocktailsLoading.vue'
import UIGrid from '@/components/ui/UIGrid.vue'
import { useRoute } from 'vue-router'

const router = useRoute()
const { getDrinks } = useDrinksByIngredientStore()
const { drinksSlugs, error, pending } = getDrinks(router.params.slug as string)
</script>

<style scoped></style>
