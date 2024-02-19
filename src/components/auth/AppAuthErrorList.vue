<template>
  <TransitionGroup name="errorToBottom" tag="ul" class="errors">
    <li class="errors__error" v-for="error in props.errors" :key="error">
      <span>{{ error }}</span>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
const props = defineProps<{ errors: string[] }>()
</script>

<style scoped lang="scss">
.errors {
  padding: 0;

  &__error {
    color: var(--app-c-text-error);
    padding-left: 2rem;
    display: grid;

    & > span {
      overflow: hidden;
    }
  }
}

.errorToBottom-enter-active {
  transition:
    transform 0.4s ease-in-out,
    opacity 0.4s ease-in-out,
    grid-template-rows 0.2s ease-in-out;
}
.errorToBottom-leave-active {
  transition:
    transform 0.4s ease-in-out,
    opacity 0.4s ease-in-out,
    grid-template-rows 0.2s ease-in-out 0.2s;
}
.errorToBottom-enter-to,
.errorToBottom-leave-from {
  grid-template-rows: 1fr;
}
.errorToBottom-enter-from,
.errorToBottom-leave-to {
  opacity: 0;
  transform: translateY(-3rem);
  grid-template-rows: 0fr;
}
</style>
