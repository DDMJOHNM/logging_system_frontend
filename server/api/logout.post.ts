import { createError, defineEventHandler, getCookie } from 'h3'
import { backendApiUrl } from '../utils/backendApiUrl'

/** Must match `AUTH_SESSION_COOKIE` in `app/composables/useAuth.ts`. */
const AUTH_SESSION_COOKIE = 'auth_session'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, AUTH_SESSION_COOKIE)
  if (!token) {
    throw createError({ statusCode: 401, message: 'Not authenticated' })
  }

  const config = useRuntimeConfig()
  const backendUrl = backendApiUrl(`${config.backendApiOrigin}`, '/api/logout')

  const response = await fetch(backendUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ token }),
  })

  const raw = await response.text()
  const contentType = response.headers.get('content-type') ?? ''

  if (!response.ok) {
    throw createError({
      statusCode: response.status === 401 ? 401 : 502,
      message: 'Logout failed',
    })
  }

  const trimmed = raw.trimStart()
  const looksLikeJson = trimmed.startsWith('{') || trimmed.startsWith('[')
  if (raw.length > 0 && !contentType.includes('application/json') && !looksLikeJson) {
    throw createError({
      statusCode: 502,
      message: `Auth API returned non-JSON (${contentType || 'no content-type'})`,
    })
  }

  if (!raw.length) {
    return { ok: true as const }
  }

  try {
    return JSON.parse(raw) as unknown
  } catch {
    throw createError({ statusCode: 502, message: 'Auth API returned invalid JSON' })
  }
})
