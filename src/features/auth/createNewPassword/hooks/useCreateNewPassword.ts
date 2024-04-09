import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useCreateNewPasswordMutation } from '@/features/auth/createNewPassword/service'
import { useErrorToast, useTranslate } from '@/shared/hooks'
import { PasswordsMatchForm } from '@/shared/schemas/passwordsMatchSchema'

export const useCreateNewPassword = () => {
  const [passwordSentModal, setPasswordSentModal] = useState<boolean>(false)

  const [createNewPassword, { isSuccess, isLoading, error, data }] = useCreateNewPasswordMutation()
  const { t } = useTranslate()
  const { query } = useRouter()
  const { code } = query

  let recoveryCode = ''

  useEffect(() => {
    if (code) {
      recoveryCode = code as string
    }
  }, [code])

  useEffect(() => {
    if (data?.extensions[0] === undefined && isSuccess === true) {
      setPasswordSentModal(true)
    } else {
      useErrorToast(false, data?.extensions[0]?.message)
    }
  }, [data])

  const submit = (data: PasswordsMatchForm) => {
    createNewPassword({ newPassword: data.password, recoveryCode })
  }

  useEffect(() => {
    useErrorToast(isSuccess, error)
  }, [isSuccess, error])

  const onModalClose = () => {
    setPasswordSentModal(false)
  }
  const onSaveModalAction = () => {
    setPasswordSentModal(false)
  }

  return { submit, t, passwordSentModal, onModalClose, onSaveModalAction, isLoading }
}
