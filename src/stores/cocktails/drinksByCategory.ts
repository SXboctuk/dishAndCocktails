import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { DrinkSlugNormalized } from '@/types/cocktails.types'
import useCocktails from '@/composables/useCocktails'
import useCocktailsNormalizerData from '@/composables/useCocktailsNormalizerData'

const useDrinksByCategoryStore = defineStore(
  'cocktails/drinkByCategory',
  () => {
    const drinksSlugs = ref<Record<string, DrinkSlugNormalized[]>>({})

    const { filterByCategory } = useCocktails()
    const { normalizeDrinkSlugs } = useCocktailsNormalizerData()

    const getDrinks = (category: string) => {
      const error = ref<string | null>(null)
      const pending = ref<boolean>(false)

      const fetch = (category: string) => {
        pending.value = true
        filterByCategory(category)
          .then((res) => {
            const dinksSlugRaw = res.data.drinks

            if (dinksSlugRaw) {
              const drinksSlugNormalized = normalizeDrinkSlugs(dinksSlugRaw)
              drinksSlugs.value[category] = drinksSlugNormalized
            } else {
              throw new Error('Drinks not found')
            }
          })
          .catch((e: Error) => (error.value = e.message))
          .finally(() => (pending.value = false))
      }

      if (!drinksSlugs.value[category]) {
        fetch(category)
      }

      return {
        error,
        pending,
        drinksSlugs: computed(() => drinksSlugs.value[category])
      }
    }

    return { getDrinks, drinksSlugs }
  }
)

export default useDrinksByCategoryStore
