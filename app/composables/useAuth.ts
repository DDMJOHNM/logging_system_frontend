export const AUTH_SESSION_COOKIE = 'auth_session'

const authSessionCookieOpts = {
  default: () => null as string | null,
  maxAge: 60 * 60 * 24 * 7,
  path: '/' as const,
  sameSite: 'lax' as const,
}

export function useAuthSessionCookie() {
  return useCookie<string | null>(AUTH_SESSION_COOKIE, authSessionCookieOpts)
}

export function useAuth() {
  const session = useAuthSessionCookie()

  const loggedIn = computed(() => Boolean(session.value))

  function signIn(token?: string) {
    session.value = token ?? '1'
  }

  function signOut() {
    session.value = null
  }

  return { session, loggedIn, signIn, signOut }
}
