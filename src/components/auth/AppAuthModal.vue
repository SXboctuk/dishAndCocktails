<template>
  <Transition name="fade" appear>
    <div class="modal" @click.self="model = false">
      <UIContainer>
        <div class="modal__content">
          <div class="modal__close" @click="() => (model = false)">
            <IconClose class="modal__close-icon" />
          </div>
          <div class="modal__background">
            <div class="modal__image modal__image--1"></div>
            <div class="modal__image modal__image--2"></div>
          </div>
          <Transition name="fade" mode="default">
            <template v-if="isSignUp"
              ><AppSignup
                class="modal__main"
                @login="() => changeSignUp(false)"
            /></template>
            <template v-else>
              <AppLogin class="modal__main" @sign-up="() => changeSignUp(true)"
            /></template>
          </Transition>
        </div>
      </UIContainer>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import AppLogin from './AppLogin.vue'
import AppSignup from './AppSignup.vue'
import UIContainer from '@/components/ui/UIContainer.vue'
import IconClose from '@/components/icons/IconClose.vue'
const model = defineModel<boolean>({ required: true, type: Boolean })

const isSignUp = ref(false)

const changeSignUp = (value: boolean) => {
  isSignUp.value = value
}

const setOverflowY = (value: 'auto' | 'hidden') => {
  document.body.style.overflowY = value
}
onMounted(() => {
  setOverflowY('hidden')
})

onUnmounted(() => {
  setOverflowY('auto')
})
</script>

<style scoped lang="scss">
.modal {
  background-color: rgba($color: #000000, $alpha: 0.4);
  position: fixed;
  display: flex;
  inset: 0;
  z-index: 1000;
  width: 100dvw;
  height: 100dvh;

  &__content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-block: 3rem;
    height: 100%;
    width: 100%;
  }
  &__main {
    z-index: 1;
    background-color: #fff;
    box-shadow: 0 0 3rem rgba(0, 0, 0, 0.4);
  }
  &__close {
    z-index: 1;
    position: absolute;
    top: 2rem;
    right: 3rem;
    cursor: pointer;
    transition: transform 0.4s ease;
    color: white;
    &:hover {
      transform: scale(1.2);
    }
  }
  &__background {
    position: absolute;
    inset: 0;
    filter: blur(0.3rem);
  }
  &__image {
    position: absolute;
    z-index: 0;
    inset: 0;
    &--1 {
      clip-path: polygon(0 0, 90% 0, 10% 100%, 0 100%);
      filter: brightness(0.6);
      background-image: url('@/assets/images/cocktailsAuthBackground.jfif');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    &--2 {
      clip-path: polygon(90% 0, 100% 0, 100% 100%, 10% 100%);
      filter: brightness(0.6);
      background-image: url('@/assets/images/mealsAuthBackground.jfif');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
  &__close-icon {
  }
}
</style>
