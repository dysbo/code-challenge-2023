import { render } from '@testing-library/react'
import { Instructions } from './Instructions.component'

describe('Instructions tests', () => {
  test('should show instructions', () => {
    expect(render(<Instructions />).container).toMatchSnapshot()
  })
})
