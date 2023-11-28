import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import ConfirmedImage from 'public/icon/emailComfirmedIcon.svg'
import { RouteNames } from '@/src/shared/const/routeNames'
import { AppLoader } from '@/src/shared/ui/appLoader'
import { AuthPage } from '../../authPage'
import { useEmailConfirmedMutation } from '../service/emailConfirmed'

export const EmailConfirmed = () => {
  const router = useRouter()
  const { emailCode } = router.query

  const [regConfirm, { data, isSuccess }] = useEmailConfirmedMutation()

  useEffect(() => {
    if (emailCode) {
      regConfirm({ code: emailCode as string })
    }
  }, [emailCode])

  return (
    <>
      {isSuccess && data?.resultCode == 0 ? (
        <AuthPage
          title="Congratulations!"
          text="Your email has been confirmed"
          nameButton="Sign In"
          linkPath={RouteNames.SIGN_IN}
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
