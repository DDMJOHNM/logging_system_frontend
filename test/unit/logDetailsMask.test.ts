// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { logDetailsMask } from '../../app/utils/logDetailsMask'

describe('logDetailsMask', () => {
  it('masks sensitive fields inside output without mutating the original payload', () => {
    const payload = {
      id: 'log-1',
      output: JSON.stringify({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        password: 'password',
       }),
    }

    const maskedPayload = logDetailsMask(payload)
    const maskedOutput = JSON.parse(maskedPayload.output)

    expect(maskedOutput.first_name).toBe('********')
    expect(maskedOutput.last_name).toBe('********')
    expect(maskedOutput.email).toBe('********')
    expect(maskedOutput.password).toBe('********')
    expect(maskedPayload.id).toBe('log-1')

    const originalOutput = JSON.parse(payload.output)
    expect(originalOutput.first_name).toBe('John')
    expect(originalOutput.last_name).toBe('Doe')
    expect(originalOutput.email).toBe('john.doe@example.com')
    expect(originalOutput.password).toBe('password')
  })
})
