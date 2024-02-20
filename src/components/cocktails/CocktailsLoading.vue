<template>
  <div class="cocktails-loading" ref="container">
    <IconCocktail class="cocktails-loading__icon" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import IconCocktail from '../icons/IconCocktail.vue'

const container = ref<HTMLDivElement | null>(null)

const containerWidth = computed(() => {
  return container.value ? container.value.offsetWidth : 0
})
</script>

<style lang="scss" scoped>
.cocktails-loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  &__icon {
    width: 20%;
    height: 20%;
    aspect-ratio: 1/1;
    animation: 2s iconPulsate infinite ease-in-out;
    color: currentColor;
  }
  &__text {
    color: currentColor;
    font-size: v-bind((containerWidth / 10)+'px');
    font-weight: bold;
    margin-top: 1rem;
    text-align: center;
    text-wrap: nowrap;
    counter-reset: dots;
  }
  &__dot {
    display: inline-block;
    margin-bottom: 0.2rem;
    max-width: 0.6rem;
    width: 100%;
    max-height: 0.6rem;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
    &:not(:last-child) {
      margin-right: 0.6rem;
    }
    counter-increment: dots;
    animation: 1.5s dotPulsate var(--delay) infinite ease-in-out;
  }

  @keyframes dotPulsate {
    0%,
    100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(0.8);
      opacity: 0;
    }
  }
  @keyframes iconPulsate {
    0%,
    100% {
      transform: scale(1) translateY(0);
      opacity: 0.8;
    }
    50% {
      transform: scale(1.2) translateY(-2rem);
      opacity: 1;
    }
  }
}
</style>
