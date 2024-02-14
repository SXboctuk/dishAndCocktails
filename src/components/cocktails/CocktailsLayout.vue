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
import CocktailsHeader from './CocktailsHeader.vue'
import UIContainer from '@/components/ui/UIContainer.vue'
</script>

<style>
.layout {
  background-color: var(--cocktail-dark-1);
  min-height: 100dvh;
  margin: 0 auto;
  padding: 2rem;
}
</style>
