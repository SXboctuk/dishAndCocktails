<template>
  <div :class="classes"><slot /></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  xl?: number
  lg?: number
  md?: number
  sm?: number
}>()

const computedXl = Array(props.xl).fill('1fr').join(' ')
const computedLg = Array(props.lg).fill('1fr').join(' ')
const computedMd = Array(props.md).fill('1fr').join(' ')
const computedSm = Array(props.sm).fill('1fr').join(' ')

const classes = computed(() => {
  return {
    grid: true,

    'grid--lg': props.lg ? true : false,
    'grid--md': props.md ? true : false,
    'grid--sm': props.sm ? true : false,
    'grid--xl': props.xl ? true : false
  }
})
</script>

<style scoped lang="scss">
@import '@/assets/mixin.scss';
.grid {
  display: grid;
  grid-gap: 4rem;
}
.grid--xl {
  @include media-breakpoint-xl() {
    grid-template-columns: v-bind('computedXl');
  }
}
.grid--lg {
  @include media-breakpoint-lg() {
    grid-template-columns: v-bind('computedLg');
  }
}
.grid--md {
  @include media-breakpoint-md() {
    grid-template-columns: v-bind('computedMd');
  }
}
.grid--sm {
  @include media-breakpoint-sm() {
    grid-template-columns: v-bind('computedSm');
  }
}
</style>
