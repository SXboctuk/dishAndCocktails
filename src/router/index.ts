import AppErrorLoading from '@/components/AppErrorLoading.vue'
import CocktailsLanding from '@/components/cocktails/CocktailsLanding.vue'
import CocktailsLoading from '@/components/cocktails/CocktailsLoading.vue'
import MealsLoading from '@/components/meals/MealsLoading.vue'
import AppLanding from '@/views/AppLanding.vue'

import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () =>
        defineAsyncComponent({
          loader: () => import('@/views/AppLanding.vue'),
          errorComponent: AppErrorLoading,
          loadingComponent: AppLanding
        })
    },
    {
      path: '/meals',
      name: 'meals',
      component: () =>
        defineAsyncComponent({
          loader: () => import('@/components/meals/MealsHeader.vue'),
          errorComponent: AppErrorLoading,
          loadingComponent: MealsLoading
        }),
      children: [
        {
          path: '',
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
      name: 'cocktails',
      component: () =>
        defineAsyncComponent({
          loader: () => import('@/components/cocktails/CocktailsLayout.vue'),
          errorComponent: AppErrorLoading,
          loadingComponent: CocktailsLoading
        }),
      children: [
        {
          path: '',
          name: 'cocktailsHome',
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
          name: 'cocktailsDetails',
          component: () =>
            defineAsyncComponent({
              loader: () =>
                import('@/components/cocktails/CocktailsDetails.vue'),
              errorComponent: AppErrorLoading,
              loadingComponent: CocktailsLoading
            })
        }
      ]
    }
  ]
})

export default router
