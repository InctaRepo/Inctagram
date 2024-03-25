import { render, screen } from '@testing-library/react'

import { Typography } from './Typography'

describe('Typography component', () => {
  it('Typography render', () => {
    render(<Typography variant={'link'}>Typography</Typography>)
    const typographyElement = screen.getByText('Typography')

    expect(typographyElement).toHaveClass('link')
  })
})
