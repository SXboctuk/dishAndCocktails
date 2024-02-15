<template>
  <section>
    <template v-if="error">error</template>
    <template v-else-if="pending">{{ pending }}</template>
    <template v-else-if="ingredients">
      <CocktailsSearch v-model="filter" />
      <div class="item-list">
        <template v-if="show().length > 0">
          <TransitionGroup name="listGroup"
            ><div
              class="item-list__item cocktail-font__2"
              v-for="ingredient in show()"
              :key="ingredient"
            >
              <RouterLink
                :to="{
                  name: routerName.cocktailSearchByIngredient,
                  params: { slug: ingredient }
                }"
                >{{ ingredient }}</RouterLink
              >
            </div>
          </TransitionGroup>
        </template>
        <template v-else> </template>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { routerName } from '@/router'
import { useIngredientsStore } from '@/stores/cocktails/ingredients'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'

import CocktailsSearch from './CocktailsSearch.vue'
import { computed, ref } from 'vue'

const filter = ref('')

const store = useIngredientsStore()
const { ingredientsFilter } = store
const { error, ingredients, pending } = storeToRefs(store)

const show = computed(() => ingredientsFilter(filter.value))
</script>

<style scoped lang="scss"></style>
