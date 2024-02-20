<template>
  <header class="header">
    <UIContainer>
      <nav class="nav">
        <div class="nav__logo">
          <RouterLink :to="{ name: routerName.cocktailHome }"
            ><CocktailsLogo
          /></RouterLink>
        </div>
        <div class="nav__block">
          <div class="nav__link">
            <RouterLink
              :to="{ name: routerName.cocktailsIngredients }"
              :exact-active-class="'nav__link--active'"
              >Ingredients</RouterLink
            >
          </div>
          <div class="nav__link">
            <RouterLink
              :to="{ name: routerName.cocktailsCategories }"
              :exact-active-class="'nav__link--active'"
              >Categories</RouterLink
            >
          </div>
          <div class="nav__link">
            <RouterLink
              :to="{ name: routerName.cocktailsGlasses }"
              :exact-active-class="'nav__link--active'"
              >Glasses</RouterLink
            >
          </div>
          <div class="user">
            <template v-if="isAuthenticated">
              <button
                class="nav__btn nav__link"
                @click="
                  () => {
                    authStore.loguot()
                  }
                "
              >
                Logout
              </button>
            </template>
            <template v-else>
              <button class="nav__btn nav__link" @click="handlerOpenLoginModal">
                Login
              </button></template
            >
          </div>
        </div>
      </nav>
    </UIContainer>
  </header>

  <Teleport to="body">
    <Transition name="fade" mode="out-in" appear>
      <template v-if="openAuthModal === true">
        <AppAuthModal key="authModal" v-model="openAuthModal" />
      </template>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import UIContainer from '@/components/ui/UIContainer.vue'
import AppAuthModal from '@/components/auth/AppAuthModal.vue'
import CocktailsLogo from '@/components/cocktails/CocktailsLogo.vue'
// import AppErrorLoading from '@/auth/AppErrorLoading.vue'
// import IconSearch from '@/components/icons/IconSearch.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { routerName } from '@/router'
import useAuthStore from '@/stores/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)
// import router from '@/router'

// const searchEL = ref<HTMLDivElement | null>(null)
// const searchTimer = ref<number | null>(null)
// const searchMessage = ref('')

// onMounted(() => {})
// onUnmounted(() => {
//   if (searchTimer.value) {
//     clearTimeout(searchTimer.value)
//   }
// })
const openAuthModal = ref(false)
const handlerOpenLoginModal = () => {
  openAuthModal.value = true
}
</script>

<style scoped lang="scss">
.header {
  background-color: var(--cocktail-dark-3);
}
.nav {
  display: flex;
  flex: 1 1 100%;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;

  &__logo {
    flex: 0 0 auto;
  }
  &__block {
    display: flex;
    align-items: center;
    gap: 3rem;
  }
  &__link {
    color: var(--app-c-text-light-1);
    font-size: 2rem;
    transition: transform 0.4s ease;
    &:has(.nav__link--active) {
      transform: scale(1.2);
    }
    &--active {
      color: var(--cocktail-light-1);
      transition: color 0.4s ease;
    }
    &:hover {
      transform: scale(1.2);
    }
  }
  &__btn {
    background-color: transparent;
    border: none;
    outline: none;
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
