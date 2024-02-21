<template>
  <div class="details">
    <h3 class="details__title cocktail-title__1">
      {{ details.name }}
    </h3>
    <UIGrid class="details__block" :xl="2" :lg="2" :md="2">
      <div class="details__image">
        <AppImage :url="details.thumb" :loading-component="CocktailsLoading" />
        {{ isAuthenticated }}
        <template v-if="isAuthenticated">
          <div class="details__favorite details__favorite--hover">
            <IconFavorite
              :fill="isFavorite"
              :disabled="pendingAdd || pendingRemove"
              @click="favoriteHandler"
            />
          </div>
        </template>
      </div>
      <div class="details__content">
        <div class="details__alcoholic cocktail-color__2 cocktail-font__1">
          {{ details.alcoholic }}
        </div>
        <div
          class="details__CC"
          v-if="details.creativeCommonsConfirmed === 'Yes'"
        >
          <IconCC class="cocktail-color__2" />
        </div>
        <div class="details__category">
          <span class="cocktail-font__2">Category: </span
          ><span class="cocktail-font__3"
            ><RouterLink
              :to="{
                name: routerName.cocktailSearchByCategory,
                params: { slug: details.category }
              }"
              >{{ details.category }}</RouterLink
            ></span
          >
        </div>
        <div class="details__glass">
          <span class="cocktail-font__2">Glass: </span>
          <span class="cocktail-font__3">
            <RouterLink
              :to="{
                name: routerName.cocktailSearchByGlass,
                params: { slug: details.glass }
              }"
              >{{ details.glass }}</RouterLink
            ></span
          >
        </div>
        <div class="details__tags" v-if="details.tags.length > 0">
          <span class="cocktail-font__2">Tags: </span>
          <span
            class="tag cocktail-font__3"
            v-for="tag in details.tags"
            :key="tag"
            >{{ tag }}</span
          >
        </div>
        <div class="details__IBA" v-if="details.IBA">
          <span class="cocktail-font__2">IBA: </span>
          <span class="cocktail-font__3">{{ details.IBA }}</span>
        </div>
        <div class="details__alternative" v-if="details.drinkAlternative">
          <span class="cocktail-font__2">Alternative: </span>
          <span class="cocktail-font__3">{{ details.drinkAlternative }}</span>
        </div>
        <div class="details__instructions">
          <span class="cocktail-font__2">Instructions: </span>
          <span class="cocktail-font__3">{{ details.instructions }}</span>
        </div>
        <div class="details__ingredients">
          <template
            v-for="ingredient in details.ingredients"
            :key="ingredient.name"
          >
            <CocktailsIngredientCard
              :name="ingredient.name"
              :measure="ingredient.measure"
            />
          </template>
        </div>
      </div>
    </UIGrid>
  </div>
</template>

<script setup lang="ts">
import type { NormalizedDrink } from '@/types/cocktails.types'
import AppImage from '@/components/AppImage.vue'
import UIGrid from '@/components/ui/UIGrid.vue'
import CocktailsIngredientCard from '@/components/cocktails/CocktailsIngredientCard.vue'
import IconCC from '@/components/icons/IconCC.vue'
import CocktailsLoading from '@/components/cocktails/CocktailsLoading.vue'
import IconFavorite from '@/components/icons/IconFavorite.vue'
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import { routerName } from '@/router'
import { storeToRefs } from 'pinia'
import useAuthStore from '@/stores/auth'

import useUserLikesStore from '@/stores/cocktails/userLikes'

const props = defineProps<{ details: NormalizedDrink }>()

const userLikesStore = useUserLikesStore()
const { isLiked } = storeToRefs(userLikesStore)

const isFavorite = computed(() => {
  const like = isLiked.value(props.details.id)
  return like ? true : false
})

const { add, errorAdd, pendingAdd } = userLikesStore.addFunc(props.details.id)
const { errorRemove, pendingRemove, remove } = userLikesStore.removeFunc(
  props.details.id
)

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

const favoriteHandler = () => {
  if (isAuthenticated.value && !isFavorite.value) {
    add()
  } else {
    remove()
  }
}
</script>

<style scoped lang="scss">
.tag {
  padding: 0.4rem 1rem;
  border-radius: 0.8rem;
  background-color: var(--cocktail-dark-2);
}
.details {
  &__title {
    text-align: justify;
    text-transform: uppercase;
  }

  &__block {
  }
  &__image {
    position: relative;
    margin-top: 0rem;
    border-radius: 0 5rem 0 0;
    overflow: hidden;
    aspect-ratio: 1/1;
  }
  &__favorite {
    z-index: 1;
    position: absolute;
    top: 2rem;
    right: 2rem;
    transition: transform 0.4s ease;
    cursor: pointer;
    &--hover:hover {
      transform: scale(1.2);
    }
    & > svg {
      color: white;
      filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.8));
    }
  }
  &__content {
  }
  &__alcoholic {
  }
  &__CC {
  }
  &__category {
  }
  &__glass {
  }
  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
  }
  &__IBA {
  }
  &__alternative {
  }
  &__instructions {
  }
  &__ingredients {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
    margin-top: 5rem;
    & > * {
      flex: 0 0 max(20%, 10rem);
    }
  }
}
</style>
