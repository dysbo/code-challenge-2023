import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { Input } from './Input.component'
import { AppContextProvider } from '../../providers'

jest.mock('./../../hooks/useCalculationCall', () => ({
  useCalculationCall: () => (s: string) => {
    const input = parseFloat(s)
    const inputTimesTwo = input * 2
    return {
      input,
      inputTimesTwo,
      inputTimesTwoSquared: inputTimesTwo * inputTimesTwo
    }
  }
}))

describe('Input component tests', () => {
  test('should show error on submit when no number is entered', async () => {
    const { findByTestId, findByText } = render(<Input />, { wrapper: AppContextProvider })
    const btn = await findByTestId('button-calculate')
    expect(btn).toBeInTheDocument()

    act(() => {
      btn.click()
    })

    await expect(findByText('Please enter a number!')).resolves.toBeInTheDocument()
  })

  test('should submit when number is provided', async () => {
    const { findByTestId } = render(<Input />, { wrapper: AppContextProvider })
    const input = await findByTestId('input-number')
    expect(input).toBeInTheDocument()

    act(() => {
      fireEvent.change(input, { target: { value: '3' } })
    })

    expect(input).toHaveValue('3')

    const btn = await findByTestId('button-calculate')
    expect(btn).toBeInTheDocument()

    await act(async () => {
      btn.click()
    })

    expect(input).toHaveValue('')
  })

  test('should show error when same number is submitted twice in a row', async () => {
    const { findByTestId, findByText } = render(<Input />, { wrapper: AppContextProvider })
    const input = await findByTestId('input-number')
    expect(input).toBeInTheDocument()

    act(() => {
      fireEvent.change(input, { target: { value: '7' } })
    })

    expect(input).toHaveValue('7')

    const btn = await findByTestId('button-calculate')
    expect(btn).toBeInTheDocument()

    await act(async () => {
      btn.click()
    })

    act(() => {
      fireEvent.change(input, { target: { value: '7' } })
    })

    await act(async () => {
      btn.click()
    })

    await expect(findByText('Please enter a different number!'))
      .resolves
      .toBeInTheDocument()
  })
})
