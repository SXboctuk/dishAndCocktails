<template>
  <section>
    <template v-if="error">error</template>
    <template v-else-if="pending">{{ pending }}</template>
    <template v-else-if="categories">
      <CocktailsSearch v-model="filter" />
      <div class="item-list">
        <template v-if="showCategories().length > 0">
          <TransitionGroup name="listGroup"
            ><div
              class="item-list__item cocktail-font__2"
              v-for="category in showCategories()"
              :key="category"
            >
              <RouterLink
                :to="{
                  name: routerName.cocktailSearchByCategory,
                  params: { slug: category }
                }"
                >{{ category }}</RouterLink
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
import { useCategoriesStore } from '@/stores/cocktails/categories'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'

import CocktailsSearch from './CocktailsSearch.vue'
import { computed, ref } from 'vue'

const filter = ref('')

const store = useCategoriesStore()
const { categoriesFilter } = store
const { error, categories, pending } = storeToRefs(store)

const showCategories = computed(() => categoriesFilter(filter.value))
</script>

<style scoped lang="scss"></style>
