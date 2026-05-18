import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { useAuthSessionCookie } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware((to) => {
  const session = useAuthSessionCookie()

  if (to.path === '/login') {
    if (session.value) {
      return navigateTo('/')
    }
    return
  }

  if (!session.value) {
    return navigateTo('/login')
  }
})
