import { getMockReq, getMockRes } from '@jest-mock/express'
import { inputResolver } from './input.resolver'

const mockInputOrchestrator =
  jest.fn((i: number) => Promise.resolve({
    input: i,
    inputTimesTwo: i * 2,
    inputTimesTwoSquared: (i * 2) * (i * 2)
  }))

jest.mock('../orchestrator', () => ({
  inputOrchestrator: (i: number) => mockInputOrchestrator(i)
}))

describe('input resolver tests', () => {
  const { res, mockClear } = getMockRes()

  beforeEach(() => {
    mockClear()
  })

  test('should throw error when input does not parse to float', async () => {
    mockInputOrchestrator.mockRejectedValueOnce(new Error('broken!!!'))
    const req = getMockReq({ params: { input: '4' } })
    await expect(inputResolver(req, res)).resolves.toBeUndefined()
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith(new Error('broken!!!'))
  })

  test('should return result when input parses to float', async () => {
    const req = getMockReq({ params: { input: '2' } })
    await expect(inputResolver(req, res)).resolves.toBeUndefined()
    expect(res.json).toHaveBeenCalledWith({
      input: 2,
      inputTimesTwo: 4,
      inputTimesTwoSquared: 16
    })
    expect(res.status).toHaveBeenCalledWith(200)
  })
})
