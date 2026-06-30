import { createError, defineEventHandler, getCookie, getQuery, type H3Event } from 'h3'
import { backendApiUrl } from '../utils/backendApiUrl'

const AUTH_SESSION_COOKIE = 'auth_session'

export default defineEventHandler(async (event) => {
  const { project_id, page, per_page, order_by, direction, severity } = getQuery(event)
  if (!project_id || typeof project_id !== 'string') {
    throw createError({ statusCode: 400, message: 'project_id is required' })
  }
  return getLogs(event, project_id, page, per_page, order_by, direction, severity)
})

async function getLogs(
  event: H3Event,
  project_id: string,
  page: unknown,
  per_page: unknown,
  order_by: unknown,
  direction: unknown,
  severity: unknown,
) {
  const token = getCookie(event, AUTH_SESSION_COOKIE)
  if (!token) {
    throw createError({ statusCode: 401, message: 'Not authenticated' })
  }

  const config = useRuntimeConfig()
  const backendUrl = backendApiUrl(
    `${config.backendApiOrigin}`,
    `/api/v1/logs/${project_id}`,
  )
  backendUrl.searchParams.set('page', String(Math.max(1, Number(page) || 1)))
  backendUrl.searchParams.set('perPage', String(Math.max(1, Math.min(100, Number(per_page) || 10))))
  if (typeof order_by === 'string' && order_by) {
    backendUrl.searchParams.set('orderBy', order_by)
  }
  if (direction === 'asc' || direction === 'desc') {
    backendUrl.searchParams.set('orderDirection', direction)
  }
  if (typeof severity === 'string' && severity) {
    backendUrl.searchParams.set('severity', severity)
  }

  const response = await fetch(backendUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw createError({
      statusCode: response.status === 401 ? 401 : 502,
      message: 'Failed to fetch logs',
    })
  }

  return response.json()
}