import { useEffect } from 'react'

import { useEmailConfirmedMutation } from '@/features/auth/emailConfirmed/service/emailConfirmed'
import { resultCode } from '@/shared/const'
import { useTranslate } from '@/shared/hooks'
import { useRouter } from 'next/router'

export const useEmailConfirmed = () => {
  const { query } = useRouter()
  const { t } = useTranslate()
  const { code } = query

  const [regConfirm, { data, isSuccess }] = useEmailConfirmedMutation()

  useEffect(() => {
    if (code) {
      regConfirm({ code: code as string })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  useEffect(() => {
    if (isSuccess && data?.resultCode == resultCode.BAD_REQUEST) {
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  const message = (data?.extensions[0]?.message as string) ?? ''
  const messageConfirmed = 'email is already confirmed'
  const messageIncorrectCode = 'Code is incorrect'
  const messageExpire = 'email confirmation code is expired'

  return {
    data,
    isSuccess,
    message,
    messageConfirmed,
    messageExpire,
    messageIncorrectCode,
    t,
  }
}
