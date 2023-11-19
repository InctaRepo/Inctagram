import { AuthPage } from '../authPage/AuthPage'
import { EmailConfirmed } from '../emailConfirmed/EmailConfirmed'

export const EmailVerification = () => {
  return (
    <AuthPage
      title="Email verification link expired"
      text="Looks like the verification link has
                      expired. Not to worry, we can send the
                      link again"
      nameButton="Resend verification link"
    >
      {<EmailConfirmed />}
    </AuthPage>
  )
}
