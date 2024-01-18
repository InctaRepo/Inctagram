import { render } from '@testing-library/react'

import { AppLoader } from './AppLoader'

describe('AppLoader', () => {
  it('should render the loader component', () => {
    const { container } = render(<AppLoader />)
    const wrapperElement = container.firstChild
    const loaderElement = wrapperElement?.firstChild

    expect(wrapperElement).toHaveClass('wrapper')
    expect(loaderElement).toHaveClass('loader')
  })
})
