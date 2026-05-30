import { createError, defineEventHandler, readBody, setResponseStatus } from 'h3'

export default defineEventHandler(async (event) => {
  let body: { email?: string; password?: string }
  try {
    body = (await readBody<{ email?: string; password?: string }>(event)) ?? {}
  } catch {
    throw createError({ statusCode: 400, message: 'Invalid JSON body' })
  }

  const { email, password } = body
  if (!email || !password) {
    throw createError({ statusCode: 400, message: 'Email and password are required' })
  }

  const config = useRuntimeConfig()
  const origin = `${config.backendApiOrigin}`.replace(/\/$/, '')
  const pointsAtLocalhost =
    origin.includes('127.0.0.1') || origin.includes('localhost')
  if (!import.meta.dev && pointsAtLocalhost) {
    throw createError({
      statusCode: 503,
      message: 'Backend API is not configured (set NUXT_BACKEND_API_ORIGIN)',
    })
  }

  const backendUrl = new URL('/api/login', origin)

  let response: Response
  try {
    response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
  } catch {
    throw createError({ statusCode: 502, message: 'Could not reach auth API' })
  }

  const raw = await response.text()
  const contentType = response.headers.get('content-type') ?? ''

  const trimmed = raw.trimStart()
  const looksLikeJson = trimmed.startsWith('{') || trimmed.startsWith('[')
  if (raw.length > 0 && !contentType.includes('application/json') && !looksLikeJson) {
    throw createError({
      statusCode: 502,
      message: `Auth API returned non-JSON (${contentType || 'no content-type'})`,
    })
  }

  if (!raw.length) {
    setResponseStatus(event, response.status)
    return { ok: response.ok }
  }

  let data: unknown
  try {
    data = JSON.parse(raw) as unknown
  } catch {
    throw createError({ statusCode: 502, message: 'Auth API returned invalid JSON' })
  }

  if (!response.ok) {
    setResponseStatus(event, response.status)
  }

  return data
})
