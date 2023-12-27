import { act, fireEvent, render } from '@testing-library/react'
import { PropsWithChildren, useState } from 'react'
import { appContext, AppContextProvider } from '../../providers'
import { Input } from './Input.component'

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

  test('should log error when error occurs', async () => {
    const provider = ({ children }: PropsWithChildren) => {
      const [input, setInput] = useState<string>('')
      return (
        <appContext.Provider value={{
          clearResult: jest.fn(),
          input,
          onSubmit: () => {
            throw new Error('not today')
          },
          setError: jest.fn(),
          setInput
        }}
        >
          {children}
        </appContext.Provider>
      )
    }

    const spy = jest.spyOn(console, 'error').mockImplementation(jest.fn())

    const { findByTestId } = render(<Input />, { wrapper: provider })
    const input = await findByTestId('input-number')
    expect(input).toBeInTheDocument()

    act(() => {
      fireEvent.change(input, { target: { value: '9' } })
    })

    const btn = await findByTestId('button-calculate')

    await act(async () => {
      btn.click()
    })

    expect(spy).toHaveBeenCalledWith('Error submitting result!', 'not today')
  })

  test('should not submit on keyup when number was entered', async () => {
    const mockOnSubmit = jest.fn()

    const provider = ({ children }: PropsWithChildren) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, setInput] = useState<string>('')
      return (
        <appContext.Provider value={{
          clearResult: jest.fn(),
          input: '3',
          onSubmit: mockOnSubmit,
          setError: jest.fn(),
          setInput
        }}
        >
          {children}
        </appContext.Provider>
      )
    }

    const { findByTestId } = render(<Input />, { wrapper: provider })
    const input = await findByTestId('input-number')
    expect(input).toBeInTheDocument()

    act(() => {
      fireEvent.keyUp(input, { key: '3' })
    })

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  test('should submit on keyup when enter was pressed', async () => {
    const mockOnSubmit = jest.fn()

    const provider = ({ children }: PropsWithChildren) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, setInput] = useState<string>('')
      return (
        <appContext.Provider value={{
          clearResult: jest.fn(),
          input: '30',
          onSubmit: mockOnSubmit,
          setError: jest.fn(),
          setInput
        }}
        >
          {children}
        </appContext.Provider>
      )
    }

    const { findByTestId } = render(<Input />, { wrapper: provider })
    const input = await findByTestId('input-number')
    expect(input).toBeInTheDocument()

    act(() => {
      fireEvent.keyUp(input, { key: 'Enter' })
    })

    expect(mockOnSubmit).toHaveBeenCalled()
  })
})
