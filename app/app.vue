<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <div v-if="isLoading" class="fixed inset-0 z-50 bg-slate-50">
    <Loader />
  </div>
</template>
<script setup lang="ts">
const isLoading = ref(true)
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})
</script>
