import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { DrinkSlugNormalized } from '@/types/cocktails.types'
import useCocktails from '@/composables/useCocktails'
import useCocktailsNormalizerData from '@/composables/useCocktailsNormalizerData'

const useDrinksByGlassStore = defineStore('cocktails/drinkByGlass', () => {
  const drinksSlugs = ref<Record<string, DrinkSlugNormalized[]>>({})

  const { filterByGlass } = useCocktails()
  const { normalizeDrinkSlugs } = useCocktailsNormalizerData()

  const getDrinks = (glass: string) => {
    const error = ref<string | null>(null)
    const pending = ref<boolean>(false)

    const fetch = (glass: string) => {
      pending.value = true
      filterByGlass(glass)
        .then((res) => {
          const dinksSlugRaw = res.data.drinks

          if (dinksSlugRaw) {
            const drinksSlugNormalized = normalizeDrinkSlugs(dinksSlugRaw)
            drinksSlugs.value[glass] = drinksSlugNormalized
          } else {
            throw new Error('Drinks not found')
          }
        })
        .catch((e: Error) => (error.value = e.message))
        .finally(() => (pending.value = false))
    }

    if (!drinksSlugs.value[glass]) {
      fetch(glass)
    }

    return {
      error,
      pending,
      drinksSlugs: computed(() => drinksSlugs.value[glass])
    }
  }

  return { getDrinks, drinksSlugs }
})

export default useDrinksByGlassStore
