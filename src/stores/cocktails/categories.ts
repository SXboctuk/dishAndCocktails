import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { CategoryNormalized } from '@/types/cocktails.types'
import useCocktails from '@/composables/useCocktails'
import useCocktailsNormalizerData from '@/composables/useCocktailsNormalizerData'

export const useCategoriesStore = defineStore('cocktails/categories', () => {
  const categories = ref<CategoryNormalized[]>([])
  const pending = ref<boolean>(false)
  const error = ref<string | null>(null)

  function init() {
    const { listOfCategories } = useCocktails()
    const { normalizeCategories } = useCocktailsNormalizerData()

    error.value = null
    pending.value = true

    listOfCategories()
      .then((res) => (categories.value = normalizeCategories(res.data.drinks)))
      .catch((e: Error) => (error.value = e.message))
      .finally(() => (pending.value = false))
  }
  function categoriesFilter(name: string) {
    return () =>
      categories.value.filter((category) =>
        category.toLowerCase().includes(name.toLowerCase())
      )
  }

  return {
    categories: computed(() => categories.value),
    categoriesFilter: categoriesFilter,
    pending: computed(() => pending.value),
    error: computed(() => error.value),
    init
  }
})
