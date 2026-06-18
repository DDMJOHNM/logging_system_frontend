// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { logDetailsMask } from '../../app/utils/logDetailsMask'

describe('logDetailsMask', () => {
  it('masks sensitive fields inside output without mutating the original payload', () => {
    const payload = {
      id: 'log-1',
      output: JSON.stringify({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password',
      }),
    }

    const maskedPayload = logDetailsMask(payload)
    const maskedOutput = JSON.parse(maskedPayload.output)

    expect(maskedOutput.name).toBe('********')
    expect(maskedOutput.email).toBe('********')
    expect(maskedOutput.password).toBe('********')
    expect(maskedPayload.id).toBe('log-1')

    const originalOutput = JSON.parse(payload.output)
    expect(originalOutput.name).toBe('John Doe')
    expect(originalOutput.email).toBe('john.doe@example.com')
    expect(originalOutput.password).toBe('password')
  })
})
