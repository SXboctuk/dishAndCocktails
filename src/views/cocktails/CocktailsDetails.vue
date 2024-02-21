<template>
  <section>
    <template v-if="details">
      <CocktailsCocktail :details="details" />
    </template>

    <template v-else-if="error">
      <h2 class="details__title cocktail-title__1">Nothing found</h2>
    </template>
    <template v-else-if="pending">
      <CocktailsLoading />
    </template>
    <template v-else>
      <h2 class="details__title cocktail-title__1">Nothing found</h2>
    </template>
  </section>
</template>

<script setup lang="ts">
import CocktailsCocktail from '@/components/cocktails/CocktailsCocktail.vue'

import CocktailsLoading from '@/components/cocktails/CocktailsLoading.vue'

import useDetailsStore from '@/stores/cocktails/details'

import { useRoute } from 'vue-router'

const router = useRoute()
const { getDetails } = useDetailsStore()
const { error, pending, details } = getDetails(router.params.id as string)
</script>

<style scoped lang="scss"></style>
