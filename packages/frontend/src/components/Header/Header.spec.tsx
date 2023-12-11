import { render } from '@testing-library/react'
import { Header } from './Header.component'

describe('Header tests', () => {
  test('should render heading it is given', async () => {
    const { findByText } = render(<Header text='Sample Text' />)
    const ele = await findByText('Sample Text')
    expect(ele).toBeInTheDocument()
    expect(ele).toHaveClass('MuiTypography-h2')
    expect(ele.tagName.toLowerCase()).toBe('h1')
  })
})
