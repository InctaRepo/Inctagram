import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

import { AuthPage } from '../../authPage'
import { useEmailConfirmedMutation } from '../service/emailConfirmed'

import { RouteNames } from '@/src/shared/const/routeNames'
import { AppLoader } from '@/src/shared/ui/appLoader'
import ConfirmedImage from 'public/icon/emailComfirmedIcon.svg'

export const EmailConfirmed = () => {
  const router = useRouter()
  const { code } = router.query // get email confirm code from URL

  const [regConfirm, { data, isSuccess }] = useEmailConfirmedMutation()

  useEffect(() => {
    if (code) {
      regConfirm({ code: code as string })
    }
  }, [code])

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
