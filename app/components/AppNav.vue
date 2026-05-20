<template>
  <header class="border-b border-slate-200/80 bg-white/90 backdrop-blur-sm">
    <nav
      class="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-3"
      aria-label="Main navigation"
    >
      <NuxtLink
        to="/"
        class="text-lg font-semibold tracking-tight text-slate-900 transition hover:text-emerald-700"
      >
        Logging & Subscription Manager 
      </NuxtLink>
      <ul class="flex items-center gap-1 sm:gap-2">
        <li v-for="link in links" :key="link.to">
          <NuxtLink
            :to="link.to"
            :exact-active-class="link.useExactActive ? activeClass : undefined"
            :active-class="!link.useExactActive ? activeClass : undefined"
            class="rounded-md px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
        <li>
          <button class="rounded-md px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900" @click="logout()">Sign Out</button>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script setup lang="ts">
const activeClass = 'font-semibold text-emerald-700 bg-slate-100'

const links = [
  { to: '/', label: 'Dashboard', useExactActive: true },
] as const
  
const { signOut } = useAuth()

function logout() {
  signOut();
  navigateTo('/login');
}
</script>
