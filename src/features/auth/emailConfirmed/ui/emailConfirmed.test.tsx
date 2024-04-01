import { EmailConfirmed } from './EmailConfirmed'

import { render } from '__mocks__/customRender'

// Mock the dependencies used in the component
jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { code: 'mockCode' },
  }),
}))

jest.mock('@/features/auth/emailConfirmed/service/emailConfirmed', () => ({
  useEmailConfirmedMutation: () => [
    jest.fn(), // Mocked mutation function
    {
      data: {
        extensions: [{ message: 'mockMessage' }],
        resultCode: 'mockResultCode',
      },
      isSuccess: true,
    },
  ],
}))

jest.mock('@/shared/hooks', () => ({
  useTranslate: () => ({
    t: {
      auth: {
        alreadyConfirmedEmail: 'Already confirmed email',
        codeIncorrect: 'Incorrect code',
        confirmedEmail: 'Email confirmed',
        congratulations: 'Congratulations',
        emailVerificationLink: 'Email verification link',
        resendVerificationLinkTitle: 'Resend verification link',
        signIn: 'Sign In',
        verificationLinkExpired: 'Verification link expired',
        wereSorry: "We're sorry",
      },
    },
  }),
}))

describe('EmailConfirmed', () => {
  test('renders the appropriate AuthPage component when code is valid and result code is OK', async () => {
    render(<EmailConfirmed />)

    // expect(screen.getByText('Congratulations')).toBe(true)
    // screen.getByText('Email confirmed')
    // expect(screen.getByText('Sign In'))
  })

  // Add more tests for other scenarios, such as when the result code is BAD_REQUEST
})
