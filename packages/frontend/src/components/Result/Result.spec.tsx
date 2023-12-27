import { act, fireEvent, render } from '@testing-library/react'
import { PropsWithChildren } from 'react'
import { Table, TableBody } from '@mui/material'
import { appContext } from '../../providers'
import { Result } from './Result.component'

// eslint-disable-next-line react/display-name
const wrapper = (activeNumber?: number) => ({ children }: PropsWithChildren) => (
  <appContext.Provider
    value={{
      clearResult: jest.fn(),
      input: activeNumber?.toString() ?? '',
      onSubmit: jest.fn(),
      result: { input: activeNumber?.toString() ?? '', inputTimesTwo: '', inputTimesTwoSquared: '' },
      setError: jest.fn(),
      setInput: jest.fn()
    }}>
    <Table>
      <TableBody>
        {children}
      </TableBody>
    </Table>
  </appContext.Provider>
)

describe('Result tests', () => {
  test('should show result when it is provided', () => {
    const { container } = render(<Result removeResult={jest.fn()} input="3" inputTimesTwo="6"
      inputTimesTwoSquared="36" />, { wrapper: wrapper(3) })
    expect(container).toMatchSnapshot()
  })

  test('should call to remove row when remove is clicked', async () => {
    const mockRemoveResult = jest.fn()
    const { findByTestId } = render(<Result removeResult={mockRemoveResult} input='4' inputTimesTwo='16' inputTimesTwoSquared='256' />, { wrapper: wrapper() })

    const btnRemove = await findByTestId('result-actions-4-remove')

    act(() => {
      fireEvent.click(btnRemove)
    })

    expect(mockRemoveResult).toHaveBeenCalledTimes(1)
  })
})