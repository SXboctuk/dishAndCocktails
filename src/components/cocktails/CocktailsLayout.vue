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
:root {
  --cocktail-grey: rgb(239, 236, 236);
  --cocktail-navy: rgb(12, 45, 87);
  --cocktail-orange: rgb(252, 103, 54);
  --cocktail-peach: rgb(255, 176, 176);
  --cocktail-boxshadow: 0 1rem 2rem 1rem rgba(0, 0, 0, 0.2);

  --cocktail-dark-1: rgb(47, 59, 59);
  --cocktail-dark-1: rgb(47, 59, 50);
  --cocktail-dark-2: rgb(70, 87, 69);
  --cocktail-dark-3: rgb(100, 110, 93);

  --cocktail-light-1: #f8f0e5;
  --cocktail-light-2: rgb(234, 219, 200);
  --cocktail-light-3: rgb(218, 192, 163);
}
.cocktail-color__1 {
  color: var(--cocktail-light-1);
}
.cocktail-color__2 {
  color: var(--cocktail-light-2);
}
.cocktail-color__3 {
  color: var(--cocktail-light-3);
}
.cocktail-title__1 {
  font-weight: bold;
  font-size: 15rem;
  color: var(--cocktail-light-1);
}
.cocktail-title__2 {
  font-size: 10rem;
  color: var(--cocktail-light-1);
}
.cocktail-title__3 {
  font-size: 7rem;
  color: var(--cocktail-light-1);
}
.cocktail-font__1 {
  font-weight: bold;
  font-size: 5rem;
}
.cocktail-font__2 {
  font-size: 3rem;
  color: var(--cocktail-light-2);
}
.cocktail-font__3 {
  font-size: 2.3rem;
  color: var(--cocktail-light-3);
}
</style>
