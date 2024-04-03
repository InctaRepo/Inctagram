import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

import { AuthPage } from '@/entities/auth/authPage'
import { useEmailConfirmedMutation } from '@/features/auth/emailConfirmed/service/emailConfirmed'
import ConfirmedImage from '@/public/icon/emailComfirmedIcon.svg'
import TimeManagementImage from '@/public/icon/timeMenegmentIcon.svg'
import { resultCode, RouteNames } from '@/shared/const'
import { useTranslate } from '@/shared/hooks'

export const EmailConfirmed = () => {
  const { query } = useRouter()
  const { t } = useTranslate()
  const { code } = query

  const [regConfirm, { data, isSuccess }] = useEmailConfirmedMutation()

  useEffect(() => {
    if (code) {
      regConfirm({ code: code as string })
    }
  }, [code])
  useEffect(() => {
    if (isSuccess && data?.resultCode == resultCode.BAD_REQUEST) {
      return
    }
  }, [data])
  const message = data?.extensions[0].message as string
  const messageConfirmed = 'email is already confirmed'
  const messageIncorrectCode = 'Code is incorrect'
  const messageExpire = 'email confirmation code is expired'

  return (
    <>
      {isSuccess && data?.resultCode == resultCode.OK && (
        <AuthPage
          title={t.auth.congratulations}
          text={t.auth.confirmedEmail}
          nameButton={t.auth.signIn}
          linkPath={RouteNames.SIGN_IN}
        >
          <ConfirmedImage />
        </AuthPage>
      )}
      {isSuccess && data?.resultCode == resultCode.BAD_REQUEST && message === messageConfirmed && (
        <AuthPage
          title={t.auth.congratulations}
          text={t.auth.alreadyConfirmedEmail}
          nameButton={t.auth.signIn}
          linkPath={RouteNames.SIGN_IN}
        >
          <ConfirmedImage />
        </AuthPage>
      )}
      {isSuccess &&
        data?.resultCode == resultCode.BAD_REQUEST &&
        message === messageIncorrectCode && (
          <AuthPage
            title={t.auth.wereSorry}
            text={t.auth.codeIncorrect}
            nameButton={t.auth.signIn}
            linkPath={RouteNames.SIGN_IN}
          ></AuthPage>
        )}
      {isSuccess && data?.resultCode == resultCode.BAD_REQUEST && message === messageExpire && (
        <AuthPage
          title={t.auth.emailVerificationLink}
          text={t.auth.verificationLinkExpired}
          nameButton={t.auth.resendVerificationLinkTitle}
          linkPath={RouteNames.EMAIL_VERIFICATION}
        >
          <TimeManagementImage />
        </AuthPage>
      )}
    </>
  )
}
