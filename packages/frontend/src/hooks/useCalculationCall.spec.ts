import { renderHook } from '@testing-library/react'
import { useCalculationCall } from './useCalculationCall'

jest.mock('axios')

describe('useCalculationCall tests', ()=> {
  test('should call endpoint when function is called', async () => {
    const mockPost = jest.fn().mockResolvedValue({
      data: {
        input: 3
      }
    })
    jest.spyOn(jest.requireMock('axios'), 'create').mockReturnValue({ post: mockPost })
    const { result } = renderHook(() => useCalculationCall())
    await result.current('3')
    expect(mockPost).toHaveBeenCalledWith('/input/3')
  })

  test('should throw error when error occurs', async () => {
    const mockPost = jest.fn().mockImplementation(() => {
      throw new Error('oh no network issues or something')
    })
    jest.spyOn(jest.requireMock('axios'), 'create').mockReturnValue({ post: mockPost })
    const { result } = renderHook(() => useCalculationCall())
    await expect(result.current('3')).rejects.toThrow('oh no network issues or something')
  })
})