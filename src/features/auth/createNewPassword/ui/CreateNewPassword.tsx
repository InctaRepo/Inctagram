import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useCreateNewPasswordMutation } from '@/features/auth/createNewPassword/service/CreateNewPassword'
import s from '@/features/auth/createNewPassword/ui/createNewPassword.module.scss'
import { CreateNewPasswordForm } from '@/features/auth/createNewPassword/ui/createNewPasswordForm'
import { useErrorToast, useTranslate } from '@/shared/hooks'
import { PasswordsMatchForm } from '@/shared/schemas/passwordsMatchSchema'
import { Loader } from '@/ui/loader'
import { Modal } from '@/ui/modal'
import { Typography } from '@/ui/typography'

export const CreateNewPassword = () => {
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

  if (isLoading) return <Loader />

  return (
    <div className={s.container}>
      <div className={s.main}>
        <CreateNewPasswordForm onSubmitHandler={submit} />
        <Modal
          modalWidth={'sm'}
          title={t.auth.wasCreateNewPassword}
          open={passwordSentModal}
          actionButtonName={t.auth.ok}
          onClose={onModalClose}
          onAction={onSaveModalAction}
        >
          <Typography variant={'regular16'}>{t.auth.passwordChanged}</Typography>
        </Modal>
      </div>
    </div>
  )
}
