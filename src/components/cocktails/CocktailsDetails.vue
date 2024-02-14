<template>
  <section v-if="details" class="details">
    <h3 class="details__title cocktail-title__1">
      {{ details.name }}
    </h3>
    <div class="details__block">
      <div class="details__image"><AppImage :url="details.thumb" /></div>
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
          ><span class="cocktail-font__3">{{ details.category }}</span>
        </div>
        <div class="details__glass">
          <span class="cocktail-font__2">Glass: </span>
          <span class="cocktail-font__3">{{ details.glass }}</span>
        </div>
        <div class="details__tags">
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
    </div>
  </section>
  <section v-else-if="error">
    <h3 class="details__title cocktail-title__1">
      {{ error }}
    </h3>
  </section>
  <section v-else-if="pending">
    <h3 class="details__title cocktail-title__1">Loading</h3>
  </section>
  <section v-else>
    <h3 class="details__title cocktail-title__1">Nothing found</h3>
  </section>
</template>

<script setup lang="ts">
import AppImage from '../AppImage.vue'
import CocktailsIngredientCard from './CocktailsIngredientCard.vue'
import IconCC from '../icons/IconCC.vue'
import useDetailsStore from '@/stores/cocktails/details'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const router = useRoute()
const { getDetails } = useDetailsStore()
const { error, pending, details } = getDetails(router.params.id as string)

onMounted(() => {})
</script>

<style scoped lang="scss">
.tag {
  padding: 0.4rem 1rem;
  border-radius: 0.8rem;
  background-color: var(--cocktail-dark-2);
}
.details {
  &__title {
    line-height: 0.9;
    text-align: justify;
    text-transform: uppercase;
  }
  &__block {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 4rem;
  }
  &__image {
    margin-top: 1.3rem;
    border-radius: 0 5rem 0 0;
    overflow: hidden;
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
    margin-top: 2rem;
    & > * {
      flex: 0 0 30%;
    }
  }
}
</style>
