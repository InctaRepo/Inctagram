import React, { useEffect } from 'react'

import { AuthPage } from '@/entities/auth/authPage'
import { useEmailConfirmedMutation } from '@/features/auth/emailConfirmed/service/emailConfirmed'
import ConfirmedImage from '@/public/icon/emailComfirmedIcon.svg'
import TimeManagementImage from '@/public/icon/timeMenegmentIcon.svg'
import { RouteNames, resultCode } from '@/shared/const'
import { useTranslate } from '@/shared/hooks'
import { useRouter } from 'next/router'

export const EmailConfirmed = () => {
  const { query } = useRouter()
  const { t } = useTranslate()
  const { code } = query

  const [regConfirm, { data, isSuccess }] = useEmailConfirmedMutation()

  useEffect(() => {
    if (code) {
      regConfirm({ code: code as string })
    }
  }, [code, regConfirm])
  useEffect(() => {
    if (isSuccess && data?.resultCode == resultCode.BAD_REQUEST) {
      return
    }
  }, [data, isSuccess])
  const message = data?.extensions[0].message as string
  const messageConfirmed = 'email is already confirmed'
  const messageIncorrectCode = 'Code is incorrect'
  const messageExpire = 'email confirmation code is expired'

  return (
    <>
      {isSuccess && data?.resultCode == resultCode.OK && (
        <AuthPage
          linkPath={RouteNames.SIGN_IN}
          nameButton={t.auth.signIn}
          text={t.auth.confirmedEmail}
          title={t.auth.congratulations}
        >
          <ConfirmedImage />
        </AuthPage>
      )}
      {isSuccess && data?.resultCode == resultCode.BAD_REQUEST && message === messageConfirmed && (
        <AuthPage
          linkPath={RouteNames.SIGN_IN}
          nameButton={t.auth.signIn}
          text={t.auth.alreadyConfirmedEmail}
          title={t.auth.congratulations}
        >
          <ConfirmedImage />
        </AuthPage>
      )}
      {isSuccess &&
        data?.resultCode == resultCode.BAD_REQUEST &&
        message === messageIncorrectCode && (
          <AuthPage
            linkPath={RouteNames.SIGN_IN}
            nameButton={t.auth.signIn}
            text={t.auth.codeIncorrect}
            title={t.auth.wereSorry}
          ></AuthPage>
        )}
      {isSuccess && data?.resultCode == resultCode.BAD_REQUEST && message === messageExpire && (
        <AuthPage
          linkPath={RouteNames.EMAIL_VERIFICATION}
          nameButton={t.auth.resendVerificationLinkTitle}
          text={t.auth.verificationLinkExpired}
          title={t.auth.emailVerificationLink}
        >
          <TimeManagementImage />
        </AuthPage>
      )}
    </>
  )
}
