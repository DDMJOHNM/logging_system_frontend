import { createError, defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody<{ email?: string; password?: string }>(event)
  if (!email || !password) {
    throw createError({ statusCode: 400, message: 'Email and password are required' })
  }

  const config = useRuntimeConfig()
  const backendUrl = new URL('/api/login', `${config.backendApiOrigin}`.replace(/\/$/, ''))

  const response = await fetch(backendUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()
  const contentType = response.headers.get('content-type') ?? ''
  return data
})
