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
      component: () =>
        defineAsyncComponent({
          loader: () => import('@/views/AppLanding.vue'),
          errorComponent: AppErrorLoading,
          loadingComponent: AppLanding
        })
    },
    {
      path: '/meals',
      name: routerName.meals,
      component: () =>
        defineAsyncComponent({
          loader: () => import('@/components/meals/MealsHeader.vue'),
          errorComponent: AppErrorLoading,
          loadingComponent: MealsLoading
        }),
      children: [
        {
          path: '',
          name: routerName.mealsHome,
          component: () =>
            defineAsyncComponent({
              loader: () => import('@/components/meals/MealsLanding.vue'),
              errorComponent: AppErrorLoading,
              loadingComponent: MealsLoading
            })
        }
      ]
    },
    {
      path: '/cocktails',
      name: routerName.cocktails,
      component: () =>
        defineAsyncComponent({
          loader: () => import('@/components/cocktails/CocktailsLayout.vue'),
          errorComponent: AppErrorLoading,
          loadingComponent: CocktailsLoading
        }),
      children: [
        {
          path: '',
          name: routerName.cocktailHome,
          component: () =>
            defineAsyncComponent({
              loader: () =>
                import('@/components/cocktails/CocktailsLanding.vue'),
              errorComponent: AppErrorLoading,
              loadingComponent: CocktailsLanding
            })
        },
        {
          path: ':id',
          name: routerName.cocktailDetails,
          component: () =>
            defineAsyncComponent({
              loader: () =>
                import('@/components/cocktails/CocktailsDetails.vue'),
              errorComponent: AppErrorLoading,
              loadingComponent: CocktailsLoading
            })
        },
        {
          path: 'ingredients',
          name: routerName.cocktailsIngredients,
          component: () =>
            defineAsyncComponent({
              loader: () =>
                import('@/components/cocktails/CocktailsIngredients.vue'),
              errorComponent: AppErrorLoading,
              loadingComponent: CocktailsLoading
            })
        },
        {
          path: 'categories',
          name: routerName.cocktailsCategories,
          component: () =>
            defineAsyncComponent({
              loader: () =>
                import('@/components/cocktails/CocktailsCategories.vue'),
              errorComponent: AppErrorLoading,
              loadingComponent: CocktailsLoading
            })
        },
        {
          path: 'glasses',
          children: [
            {
              path: '',
              name: routerName.cocktailsGlasses,
              component: () =>
                defineAsyncComponent({
                  loader: () =>
                    import('@/components/cocktails/CocktailsGlasses.vue'),
                  errorComponent: AppErrorLoading,
                  loadingComponent: CocktailsLoading
                })
            },
            {
              path: ':glass',
              name: routerName.cocktailSearchByGlass,
              component: () =>
                defineAsyncComponent({
                  loader: () =>
                    import('@/components/cocktails/CocktailsSearchByGlass.vue'),
                  errorComponent: AppErrorLoading,
                  loadingComponent: CocktailsLoading
                })
            }
          ]
        }
      ]
    }
  ]
})

export default router
