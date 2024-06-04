import { useEffect, useState } from 'react'

import { useCreateNewPasswordMutation } from '@/features/auth/createNewPassword/service'
import { useErrorToast, useTranslate } from '@/shared/hooks'
import { PasswordsMatchSchema } from '@/shared/schemas/passwordsMatchSchema'
import { useRouter } from 'next/router'

export const useCreateNewPassword = () => {
  const [passwordSentModal, setPasswordSentModal] = useState<boolean>(false)

  const [createNewPassword, { data, error, isLoading, isSuccess }] = useCreateNewPasswordMutation()
  const { t } = useTranslate()
  const { query } = useRouter()
  const { code } = query

  let recoveryCode = ''

  useEffect(() => {
    if (code) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      recoveryCode = code as string
    }
  }, [code])

  useEffect(() => {
    if (data?.extensions[0] === undefined && isSuccess === true) {
      setPasswordSentModal(true)
    } else {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useErrorToast(false, data?.extensions[0]?.message)
    }
  }, [data, isSuccess])

  const submit = (data: PasswordsMatchSchema) => {
    createNewPassword({ newPassword: data.password, recoveryCode })
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useErrorToast(isSuccess, error)
  }, [isSuccess, error])

  const onModalClose = () => {
    setPasswordSentModal(false)
  }
  const onSaveModalAction = () => {
    setPasswordSentModal(false)
  }

  return { isLoading, onModalClose, onSaveModalAction, passwordSentModal, submit, t }
}
