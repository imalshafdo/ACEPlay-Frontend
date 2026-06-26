<script setup>
import { navigateTo } from '#app'

const { data: casinosResponse } = await useFetch('http://localhost:5000/api/public/casinos')
const casinos = casinosResponse.value?.data || []
if (casinos.length > 0) {
  const firstSlug = casinos[0].name.toLowerCase().replace(/\s+/g, '-')
  navigateTo(`/casinopage/${firstSlug}`, { redirectCode: 302 })
}
</script>

<template>
  <div class="loading-panel">
    <p>Redirecting to casino review page...</p>
  </div>
</template>

<style scoped>
.loading-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #0b0f19;
  color: #94a3b8;
  font-family: system-ui, -apple-system, sans-serif;
}
</style>
