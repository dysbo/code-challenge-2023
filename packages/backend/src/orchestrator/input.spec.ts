/* eslint-disable @typescript-eslint/no-explicit-any */
import { inputOrchestrator } from './index'

const mockFindByPk = jest.fn()
const mockCreate = jest.fn(obj => obj)

jest.mock('../db/repository', () => ({
  numericInputRepository: {
    build: (input: any) => input,
    create: (obj: any) => mockCreate(obj),
    findByPk: (pk: any) => mockFindByPk(pk)
  }
}))

describe('input orchestrator tests', () => {
  test('should create record if one did not exist already', async () => {
    mockFindByPk.mockResolvedValueOnce(null)
    await expect(inputOrchestrator(5)).resolves.toMatchObject({
      input: 5,
      inputTimesTwo: 10,
      inputTimesTwoSquared: 100
    })
    expect(mockFindByPk).toHaveBeenCalledWith(5)
    expect(mockCreate).toHaveBeenCalledWith({
      input: 5,
      inputTimesTwo: 10,
      inputTimesTwoSquared: 100
    })
  })

  test('should return record if one exists already', async () => {
    mockFindByPk.mockResolvedValueOnce({ input: 2, inputTimesTwo: 4, inputTimesTwoSquared: 16 })
    await expect(inputOrchestrator(2)).resolves.toMatchObject({ input: 2, inputTimesTwo: 4, inputTimesTwoSquared: 16 })
    expect(mockFindByPk).toHaveBeenCalledWith(2)
    expect(mockCreate).not.toHaveBeenCalled()
  })
})
