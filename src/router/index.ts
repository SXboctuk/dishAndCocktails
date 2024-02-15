import AppErrorLoading from '@/components/AppErrorLoading.vue'
import CocktailsLanding from '@/components/cocktails/CocktailsLanding.vue'
import CocktailsLoading from '@/components/cocktails/CocktailsLoading.vue'
import MealsLoading from '@/components/meals/MealsLoading.vue'
import AppLanding from '@/views/AppLanding.vue'

import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

export const routerName = {
  landing: 'landing',
  meals: 'meals',
  mealsHome: 'mealsHome',
  cocktails: 'cocktails',
  cocktailHome: 'cocktailHome',
  cocktailDetails: 'cocktailDetails',
  cocktailsCategories: 'cocktailsCategories',
  cocktailsGlasses: 'cocktailsGlasses',
  cocktailSearchByGlass: 'cocktailSearchByGlass',
  cocktailsIngredients: 'cocktailsIngredients',
  notFound: 'notFound'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: routerName.landing,
      component: () => import('@/views/AppLanding.vue')
    },
    {
      path: '/meals',
      name: routerName.meals,
      component: () => import('@/components/meals/MealsHeader.vue'),
      children: [
        {
          path: '',
          name: routerName.mealsHome,
          component: () => import('@/components/meals/MealsLanding.vue')
        }
      ]
    },
    {
      path: '/cocktails',
      name: routerName.cocktails,
      component: () => import('@/components/cocktails/CocktailsLayout.vue'),
      children: [
        {
          path: '',
          name: routerName.cocktailHome,
          component: () => import('@/components/cocktails/CocktailsLanding.vue')
        },
        {
          path: ':id',
          name: routerName.cocktailDetails,
          component: () => import('@/components/cocktails/CocktailsDetails.vue')
        },
        {
          path: 'ingredients',
          name: routerName.cocktailsIngredients,
          component: () =>
            import('@/components/cocktails/CocktailsIngredients.vue')
        },
        {
          path: 'categories',
          name: routerName.cocktailsCategories,
          component: () =>
            import('@/components/cocktails/CocktailsCategories.vue')
        },
        {
          path: 'glasses',
          children: [
            {
              path: '',
              name: routerName.cocktailsGlasses,
              component: () =>
                import('@/components/cocktails/CocktailsGlasses.vue')
            },
            {
              path: ':glass',
              name: routerName.cocktailSearchByGlass,
              component: () =>
                import('@/components/cocktails/CocktailsSearchByGlass.vue')
            }
          ]
        }
      ]
    }
  ]
})

export default router
