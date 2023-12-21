import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

import { useEmailConfirmedMutation } from '../service/emailConfirmed'

import { AuthPage } from '@/src/entities/auth/authPage'
import { resultCode } from '@/src/shared/const/resultCode'
import { RouteNames } from '@/src/shared/const/routeNames'
import { AppLoader } from '@/src/shared/ui/appLoader'
import ConfirmedImage from 'public/icon/emailComfirmedIcon.svg'

export const EmailConfirmed = () => {
  const router = useRouter()
  const code = router.query as unknown as string

  const [regConfirm, { data, isSuccess }] = useEmailConfirmedMutation()

  useEffect(() => {
    if (code) {
      regConfirm({ code: code as string })
    }
  }, [code])

  return (
    <>
      {isSuccess && data?.resultCode == resultCode.OK ? (
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
      )}
    </>
  )
}
