<template>
  <div>SEARCH BY GLASS {{ router.params.glass }}</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const router = useRoute()
</script>

<style scoped></style>
