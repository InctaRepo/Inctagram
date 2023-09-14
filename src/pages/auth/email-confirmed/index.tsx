import { useEffect } from 'react'

import { useRouter } from 'next/router'

import ConfirmedImage from '@/src/assets/images/email-confirmed-image'
import { AuthPage } from '@/src/components/auth/auth-page/AuthPage'
import { AuthLayout } from '@/src/components/layout/auth-layout'
import { AppLoader } from '@/src/components/ui/loader'
import { NextPageWithLayout } from '@/src/pages/_app'
import { useRegConfirmMutation } from '@/src/services/auth/auth-api'

const EmailConfirmed: NextPageWithLayout = () => {
  const router = useRouter()
  const { emailCode } = router.query // get email confirm code from URL

  const [regConfirm, { data, isSuccess }] = useRegConfirmMutation()

  useEffect(() => {
    if (emailCode) {
      regConfirm({ code: emailCode as string })
    }
  }, [emailCode])

  return (
    <AuthLayout>
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
    </AuthLayout>
  )
}

export default EmailConfirmed
