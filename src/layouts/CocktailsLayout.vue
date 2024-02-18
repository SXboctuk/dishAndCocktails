<template>
  <div class="layout">
    <CocktailsHeader />

    <main class="layout__main">
      <UIContainer>
        <RouterView v-slot="{ Component, route }">
          <Transition name="layoutCocktails" mode="out-in">
            <component :is="Component" :key="route.path" />
          </Transition>

          ></RouterView
        >
      </UIContainer>
    </main>
    <footer>some footer</footer>
  </div>
</template>

<script setup lang="ts">
import { useCategoriesStore } from '@/stores/cocktails/categories'
import CocktailsHeader from '@/components/cocktails/CocktailsHeader.vue'
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

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  background-color: var(--cocktail-dark-1);
  min-height: 100dvh;
  margin: 0 auto;
  &__main {
    display: flex;
    flex: 1 1 100%;
    padding: 1rem 0;
    height: 100%;
    width: 100%;
  }
}
.page {
  flex: 1 1 100%;
}
$colors: (
  light-1: #e8f5e9,
  light-2: #c8e6c9,
  light-3: #66bb6a,

  dark-1: #1b5e20,
  dark-2: #388e3c,
  dark-3: #43a047
);

:root {
  @each $color, $value in $colors {
    --cocktail-#{$color}: #{$value};
    --cocktail-#{$color}-rgb: #{red($value)}, #{green($value)}, #{blue($value)};
  }
  // --cocktail-dark-1: #1b5e20;
  // --cocktail-dark-2: #388e3c;
  // --cocktail-dark-3: #43a047;

  // --cocktail-light-1: #e8f5e9;
  // --cocktail-light-2: #c8e6c9;
  // --cocktail-light-3: #66bb6a;
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
  font-size: 8rem;
  color: var(--cocktail-light-1);
}
.cocktail-title__2 {
  font-size: 6rem;
  color: var(--cocktail-light-1);
}
.cocktail-title__3 {
  font-size: 5rem;
  color: var(--cocktail-light-1);
}
.cocktail-font__1 {
  font-weight: bold;
  font-size: 3.2rem;
  color: var(--cocktail-light-1);
}
.cocktail-font__2 {
  font-size: 2.6rem;
  color: var(--cocktail-light-1);
}
.cocktail-font__3 {
  font-size: 2rem;
  color: var(--cocktail-light-2);
}
</style>
