// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { backendApiUrl } from '../../server/utils/backendApiUrl'

describe('backendApiUrl', () => {
  it('preserves API Gateway stage paths in the origin', () => {
    const url = backendApiUrl(
      'https://nh23v1ua76.execute-api.us-east-1.amazonaws.com/prod',
      '/api/login',
    )
    expect(url.href).toBe(
      'https://nh23v1ua76.execute-api.us-east-1.amazonaws.com/prod/api/login',
    )
  })

  it('works with a plain localhost origin', () => {
    const url = backendApiUrl('http://127.0.0.1:8080', '/api/login')
    expect(url.href).toBe('http://127.0.0.1:8080/api/login')
  })
})
