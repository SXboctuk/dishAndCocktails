<template>
  <header class="header">
    <UIContainer>
      <nav class="nav">
        <div class="nav__logo">COCKTAILS</div>
        <div class="nav__block">
          <div
            class="nav__search search"
            ref="searchEL"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
          >
            <IconSearch class="search__icon" />
            <input
              class="search__input"
              type="search"
              placeholder="Search "
              v-model="searchMessage"
            />
          </div>

          <div class="nav__link">
            <RouterLink
              :to="{ name: routerName.cocktailsIngredients }"
              :active-class="'nav__link--active'"
              >Ingredients</RouterLink
            >
          </div>
          <div class="nav__link">
            <RouterLink
              :to="{ name: routerName.cocktailsCategories }"
              :active-class="'nav__link--active'"
              >Categories</RouterLink
            >
          </div>
          <div class="nav__link">
            <RouterLink
              :to="{ name: routerName.cocktailsGlasses }"
              :active-class="'nav__link--active'"
              >Glasses</RouterLink
            >
          </div>
          <div class="user">
            <div class="nav__link">Profile</div>
          </div>
        </div>
      </nav>
    </UIContainer>
  </header>
</template>

<script setup lang="ts">
import UIContainer from '@/components/ui/UIContainer.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { routerName } from '@/router'

const searchEL = ref<HTMLDivElement | null>(null)
const searchTimer = ref<number | null>(null)
const searchMessage = ref('')

const searchElOpen = () => {
  if (searchEL.value) {
    searchEL.value.classList.add('search--active')
  }
}
const searchElClose = () => {
  if (searchEL.value) {
    searchEL.value.classList.remove('search--active')
  }
}
const handleMouseEnter = () => {
  if (searchTimer.value) {
    clearTimeout(searchTimer.value)
  }
  searchElOpen()
}
const handleMouseLeave = () => {
  if (searchMessage.value.length > 0) return
  searchTimer.value = setTimeout(() => {
    searchElClose()
  }, 3000)
}
watch(
  () => searchMessage.value,
  (message) => {
    if (
      message.length === 0 &&
      searchEL.value &&
      !searchEL.value.classList.contains('search--active')
    ) {
      searchElClose()
    }
  }
)
onMounted(() => {})
onUnmounted(() => {
  if (searchTimer.value) {
    clearTimeout(searchTimer.value)
  }
})
</script>

<style scoped lang="scss">
.link {
  // color: var(--app-c-text-light-1);
  // font-size: 2rem;
  // transition:
  //   transform 2s ease,
  //   color 2s ease;
  // &--active {
  //   color: var(--cocktail-light-3);
  //   transform: scale(1.2);
  // }
}
.header {
  background-color: var(--cocktail-dark-3);
}
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;

  &__logo {
  }
  &__block {
    display: flex;
    align-items: center;
  }
  &__link {
    padding-left: 3rem;
    color: var(--app-c-text-light-1);
    font-size: 2rem;
    transition: transform 0.4s ease;
    & > :has(&--active) {
      transform: scale(1.2);
    }
    &--active {
      color: var(--cocktail-light-3);
      transition: color 0.4s ease;
    }
    &:hover {
      transform: scale(1.2);
    }
  }
}
.search {
  display: flex;
  align-items: center;
  position: relative;
  &--active {
    .search__input {
      max-width: 40rem;

      padding-left: 3.3rem;
      padding-right: 1.5rem;
      &::placeholder {
        opacity: 1;
      }
    }
  }
  &__icon {
    position: absolute;
    color: var(--app-c-text-black-2);
    left: 2rem;
    top: 50%;
    transform: translate(-52%, -48%) scale(1.2);
  }
  &__input {
    transition: max-width 1s ease;
    font-size: 2rem;
    border-radius: 4rem;
    height: 4rem;
    max-width: 4rem;
    width: 100%;
    padding-left: 0;
    padding-right: 0;
    border: none;
    outline: none;
    &::placeholder {
      transition: opacity 0.1s ease;
      color: var(--app-c-text-black-2);
      opacity: 0;
    }
  }
}
</style>
