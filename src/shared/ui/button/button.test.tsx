import { render } from '@testing-library/react'

import { Button } from './Button'

describe('Button', () => {
  it('should render a button element with default variant', () => {
    const { getByText } = render(<Button>Click me</Button>)
    const buttonElement = getByText('Click me')

    expect(buttonElement.tagName).toBe('BUTTON')
    expect(buttonElement).toHaveClass('primary')
    expect(buttonElement).not.toHaveClass('fullWidth')
  })

  it('should render a button element with custom variant and fullWidth', () => {
    const { getByText } = render(
      <Button fullWidth variant={'secondary'}>
        Submit
      </Button>
    )
    const buttonElement = getByText('Submit')

    expect(buttonElement.tagName).toBe('BUTTON')
    expect(buttonElement).toHaveClass('secondary')
    expect(buttonElement).toHaveClass('fullWidth')
  })

  it('should render a custom component with custom props', () => {
    const CustomComponent = ({ children, customProp }: any) => {
      return (
        <div className={'customComponent'} data-customprop={customProp}>
          {children}
        </div>
      )
    }

    const { getByText } = render(
      <Button as={CustomComponent} customProp={'custom'}>
        Custom Button
      </Button>
    )
    const customComponentElement = getByText('Custom Button')

    expect(customComponentElement.tagName).toBe('DIV')
    expect(customComponentElement).toHaveClass('customComponent')
    expect(customComponentElement).toHaveAttribute('data-customprop', 'custom')
  })
})
