import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

import { AuthPage } from '@/entities/auth/authPage'
import { useEmailConfirmedMutation } from '@/features/auth/emailConfirmed/service/emailConfirmed'
import ConfirmedImage from '@/public/icon/emailComfirmedIcon.svg'
import { resultCode, RouteNames } from '@/shared/const'
import { AppLoader } from '@/ui/appLoader'

export const EmailConfirmed = () => {
  const router = useRouter()
  const { code } = router.query

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
