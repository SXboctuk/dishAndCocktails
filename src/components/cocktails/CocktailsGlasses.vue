<template>
  <section>
    <template v-if="error">error</template>
    <template v-else-if="pending">{{ pending }}</template>
    <template v-else-if="glasses">
      <CocktailsSearch v-model="filter" />
      <div class="glasses-list">
        <template v-if="showGlasses().length > 0">
          <TransitionGroup name="listGroup"
            ><div
              class="glasses-list__glass cocktail-font__2"
              v-for="glass in showGlasses()"
              :key="glass"
            >
              <RouterLink
                :to="{
                  name: routerName.cocktailSearchByGlass,
                  params: { glass: glass }
                }"
                >{{ glass }}</RouterLink
              >
            </div></TransitionGroup
          >
        </template>
        <template v-else> </template>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { routerName } from '@/router'
import { useGlassesStore } from '@/stores/cocktails/glasses'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'

import CocktailsSearch from './CocktailsSearch.vue'
import { computed, ref } from 'vue'

const filter = ref('')

const store = useGlassesStore()
const { glassesFilter } = store
const { error, glasses, pending } = storeToRefs(store)

const showGlasses = computed(() => glassesFilter(filter.value))
</script>

<style scoped lang="scss">
.glasses-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  &__glass {
    text-align: center;
    padding: 1rem 2rem;
    margin: 2rem;
    background-color: var(--cocktail-dark-2);
    transition: transform 0.4s ease;
    &:hover {
      transform: scale(1.2);
    }
  }
}
</style>
