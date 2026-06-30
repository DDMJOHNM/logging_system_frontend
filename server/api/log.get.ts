import { createError, defineEventHandler, getCookie, getQuery, type H3Event } from 'h3'
import { backendApiUrl } from '../utils/backendApiUrl'

const AUTH_SESSION_COOKIE = 'auth_session'

export default defineEventHandler(async (event) => {
  const { project_id, event_id } = getQuery(event)
  if (!project_id || typeof project_id !== 'string') {
    throw createError({ statusCode: 400, message: 'project_id is required' })
  }

  if (!event_id || typeof event_id !== 'string') {
    throw createError({ statusCode: 400, message: 'event_id is required' })
  }
  
  return getLog(event, project_id, event_id)
})

async function getLog(
  event: H3Event,
  project_id: string,
  event_id: string,     
) {
  const token = getCookie(event, AUTH_SESSION_COOKIE)
  if (!token) {
    throw createError({ statusCode: 401, message: 'Not authenticated' })
  }

  const config = useRuntimeConfig()
  const backendUrl = backendApiUrl(
    `${config.backendApiOrigin}`,
    `/api/v1/logs/${project_id}/${event_id}`,
  )

  const response = await fetch(backendUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw createError({
      statusCode: response.status === 401 ? 401 : response.status === 404 ? 404 : 502,
      message: 'Failed to fetch log',
    })
  }

  const { log } = (await response.json()) as { log?: Record<string, unknown> }
  if (!log) {
    throw createError({ statusCode: 502, message: 'Invalid log response' })
  }

  return log
}