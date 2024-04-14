import React from 'react'

import { customRender as render } from '@/__mocks__/customRender'
import { fireEvent, screen, waitFor } from '@testing-library/react'

import { EmailVerification } from './EmailVerification'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ locale: 'en', query: { code: 'code' } }),
}))

const emailRecoveryMock = jest.fn()
const useEmailRecoveryMutation = jest.fn().mockReturnValue([emailRecoveryMock])

jest.mock('@/features/auth/emailVerification/service/emailRecovery', () => ({
  useEmailRecoveryMutation: () => useEmailRecoveryMutation(),
}))
jest.mock('@/ui/recaptcha', () => ({
  Recaptcha: jest.fn(({ onChange }) => {
    onChange(true)
  }),
}))
// ignore console.error
const consoleErrorSpy = jest.spyOn(console, 'error')

consoleErrorSpy.mockImplementation(() => {})
describe('EmailVerification', () => {
  it('submits the email recovery form', async () => {
    render(<EmailVerification />)

    fireEvent.change(screen.getByRole('email'), { target: { value: 'test@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: 'Send Link' }))
    await waitFor(() => {
      expect(emailRecoveryMock).toHaveBeenCalledWith({ email: 'test@example.com' })
    })
  })
  it('snapshot EmailVerification', () => {
    const snapshot = render(<EmailVerification />)

    waitFor(() => expect(snapshot).toMatchSnapshot())
  })
})
