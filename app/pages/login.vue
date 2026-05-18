<template>
  <div>
    <h1 class="text-2xl font-semibold text-slate-900">Login</h1>
    <button
      type="button"
      class="mt-6 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
      @click="signIn()"
    >
      Login 
   </button>
  </div>
</template>
<script setup lang="ts">
const { signIn } = useAuth()
</script>
