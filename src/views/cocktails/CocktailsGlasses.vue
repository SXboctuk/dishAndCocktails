<template>
  <section class="page">
    <template v-if="error">error</template>
    <template v-else-if="pending"><CocktailsLoading /></template>
    <template v-else-if="glasses">
      <CocktailsSearch v-model="filter" />
      <div class="item-list">
        <TransitionGroup name="listGroup">
          <template v-if="showGlasses().length > 0">
            <div
              class="item-list__item cocktail-font__2"
              v-for="glass in showGlasses()"
              :key="glass"
            >
              <RouterLink
                :to="{
                  name: routerName.cocktailSearchByGlass,
                  params: { slug: glass }
                }"
                >{{ glass }}</RouterLink
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
import { useGlassesStore } from '@/stores/cocktails/glasses'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'

import CocktailsSearch from '@/components/cocktails/CocktailsSearch.vue'
import CocktailsLoading from '@/components/cocktails/CocktailsLoading.vue'
import { computed, ref } from 'vue'

const filter = ref('')

const store = useGlassesStore()
const { glassesFilter } = store
const { error, glasses, pending } = storeToRefs(store)

const showGlasses = computed(() => glassesFilter(filter.value))
</script>

<style scoped lang="scss"></style>
