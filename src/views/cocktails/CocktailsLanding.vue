<template>
  <section class="landing">
    <div class="landing__hero">
      <h1 class="landing__hero-title">Free Cocktails App</h1>
      <div class="landing__hero-background"></div>
    </div>
    <div class="landing__section">
      <h2 class="landing__section-title">Find your favorite cocktail</h2>
      <div class="landing__block">
        <h3 class="landing__block-title landing__block-title--left">
          BY INGREDIENT
        </h3>
        <div class="landing__block--img-1"></div>
      </div>
      <div class="landing__block">
        <h3 class="landing__block-title landing__block-title--right">
          BY CATEGORY
        </h3>
        <div class="landing__block--img-2"></div>
      </div>
      <div class="landing__block">
        <h3 class="landing__block-title landing__block-title--left">
          BY GLASS TYPE
        </h3>
        <div class="landing__block--img-3"></div>
      </div>
    </div>
    <div class="landing__section">
      <h2 class="landing__section-title">Save your favorite cocktail</h2>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.landing {
  display: flex;
  flex-direction: column;
  gap: min(2vw, 2rem);
  &__hero {
    width: 100%;
    display: flex;
    aspect-ratio: 2/1;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  &__hero-background {
    position: absolute;
    inset: 0;
    z-index: 0;

    background-image: url('@/assets/images/landingHero.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    filter: brightness(0.5);
  }
  &__hero-title {
    z-index: 1;
    font-size: min(6vw, 8rem);
    font-weight: bold;
    color: white;
    text-transform: uppercase;
  }
  &__section {
    display: flex;
    flex-direction: column;
    gap: 1vw;
  }
  &__section-title {
    font-size: min(4vw, 6rem);
    font-weight: bold;
    color: white;
    text-transform: uppercase;
  }
  &__block {
    aspect-ratio: 4/1;
    position: relative;
    &--img-1 {
      position: absolute;
      inset: 0;
      z-index: 0;
      background-image: url('@/assets/images/landingIngredient.jpg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      filter: brightness(0.5);
    }
    &--img-2 {
      position: absolute;
      inset: 0;
      z-index: 0;
      background-image: url('@/assets/images/landingCategories.jpg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      filter: brightness(0.5);
    }
    &--img-3 {
      position: absolute;
      inset: 0;
      z-index: 0;
      background-image: url('@/assets/images/landingGlasses.jpg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      filter: brightness(0.5);
    }
  }
  &__block-title {
    z-index: 1;
    position: absolute;
    font-size: min(3vw, 4rem);
    font-weight: bold;
    color: white;
    text-transform: uppercase;

    top: 2vw;
    &--left {
      left: 2vw;
    }
    &--right {
      right: 2vw;
    }
  }
}
</style>
