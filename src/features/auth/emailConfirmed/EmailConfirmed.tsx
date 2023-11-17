import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import ConfirmedImage from '@/src/assets/images/email-confirmed-image'
import { AppLoader } from '@/src/shared/ui/appLoader'
import { AuthPage } from '../authPage/AuthPage'
import { useRegConfirmMutation } from '../authService'

export const EmailConfirmed = () => {
  const router = useRouter()
  const { emailCode } = router.query // get email confirm code from URL

  const [regConfirm, { data, isSuccess }] = useRegConfirmMutation()

  useEffect(() => {
    if (emailCode) {
      regConfirm({ code: emailCode as string })
    }
  }, [emailCode])

  return (
    <>
      {isSuccess && data?.resultCode === 0 ? (
        <AuthPage
          title="Congratulations!"
          text="Your email has been confirmed"
          nameButton="Sign In"
          linkPath={'/auth/sign-in'}
        >
          <ConfirmedImage />
        </AuthPage>
      ) : (
        <AppLoader />
        // TODO global loader on waiting response and global error handling
      )}
    </>
  )
}
