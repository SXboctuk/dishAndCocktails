<template>
  <CocktailsHeader />
  <div class="layout">
    <main>
      <UIContainer>
        <RouterView />
      </UIContainer>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useCategoriesStore } from '@/stores/cocktails/categories'
import CocktailsHeader from './CocktailsHeader.vue'
import UIContainer from '@/components/ui/UIContainer.vue'
import { useGlassesStore } from '@/stores/cocktails/glasses'
import { useIngredientsStore } from '@/stores/cocktails/ingredients'

const { init: initCategories } = useCategoriesStore()
const { init: initGlasses } = useGlassesStore()
const { init: initIngredients } = useIngredientsStore()

initCategories()
initGlasses()
initIngredients()
</script>

<style>
.layout {
  background-color: var(--cocktail-dark-1);
  min-height: 100dvh;
  margin: 0 auto;
  padding: 2rem;
}
</style>
