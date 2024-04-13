import React from 'react'

import { AuthPage } from '@/entities/auth/authPage'
import { useEmailConfirmed } from '@/features/auth/emailConfirmed/hooks'
import ConfirmedImage from '@/public/icon/emailComfirmedIcon.svg'
import TimeManagementImage from '@/public/icon/timeMenegmentIcon.svg'
import { RouteNames, resultCode } from '@/shared/const'

export const EmailConfirmed = () => {
  const { data, isSuccess, message, messageConfirmed, messageExpire, messageIncorrectCode, t } =
    useEmailConfirmed()

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
