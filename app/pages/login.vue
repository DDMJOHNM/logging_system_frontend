<template>
  <div>
    <h1 class="text-2xl font-semibold text-slate-900">Logging & Subscription Manager</h1>
    <input type="email" v-model="email" placeholder="Email" class="mt-2 rounded-md border border-slate-300 px-3 py-2 text-sm" />
    <br/>
    <input type="password" v-model="password" placeholder="Password" class="mt-2 rounded-md border border-slate-300 px-3 py-2 text-sm" />   
    <br/>
    <button
      type="button"
      class="mt-6 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
      @click="login()"
    >
      Login 
   </button>
  </div>
</template>
<script setup lang="ts">

const { signIn } = useAuth()
const email = ref('')
const password = ref('')

async function login() {
  const result = await $fetch<string | { token: string }>('/api/login', {
    method: 'POST',
    body: { email: email.value, password: password.value },
  })
  const token = typeof result === 'string' ? result : result.token
  signIn(token)
  navigateTo('/')
}

</script>
