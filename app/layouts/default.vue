<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 antialiased">
    <AppNav v-if="loggedIn" />
    <main class="mx-auto max-w-5xl px-4 py-8">
      <slot />
    </main>
  </div>
</template>
<script setup lang="ts">
const { loggedIn } = useAuth()
</script>
