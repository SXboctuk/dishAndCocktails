<template>
  <section class="page">
    <template v-if="error">error</template>
    <template v-else-if="pending"><CocktailsLoading /></template>
    <template v-else-if="categories">
      <CocktailsSearch v-model="filter" />
      <div class="item-list">
        <TransitionGroup name="listGroup">
          <template v-if="showCategories().length > 0">
            <div
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
          </template>
          <template v-else
            ><div class="cocktail-title__2">Nothing found</div></template
          >
        </TransitionGroup>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { routerName } from '@/router'
import { useCategoriesStore } from '@/stores/cocktails/categories'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'

import CocktailsSearch from '@/components/cocktails/CocktailsSearch.vue'
import CocktailsLoading from '@/components/cocktails/CocktailsLoading.vue'
import { computed, ref } from 'vue'

const filter = ref('')

const store = useCategoriesStore()
const { categoriesFilter } = store
const { error, categories, pending } = storeToRefs(store)

const showCategories = computed(() => categoriesFilter(filter.value))
</script>

<style scoped lang="scss"></style>
