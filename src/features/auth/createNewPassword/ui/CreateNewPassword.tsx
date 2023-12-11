import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useCreateNewPasswordMutation } from '../service/CreateNewPassword'
import s from '../ui/createNewPassword.module.scss'

import { CreateNewPasswordForm } from './createNewPasswordForm'

import { Header } from '@/src/shared/header'
import { useErrorToast, useTranslate } from '@/src/shared/hooks'
import { PasswordsMatchForm } from '@/src/shared/schemas/passwordsMatchSchema'
import { NextPageWithLayout } from '@/src/shared/service/nextPageWithLayout'
import { Typography } from '@/src/shared/ui/typography'
import { Modal } from 'src/shared/ui/modal'

export const CreateNewPassword: NextPageWithLayout = () => {
  const [passwordSentModal, setPasswordSentModal] = useState<boolean>(false)

  const [createNewPassword, { isSuccess, isLoading, error }] = useCreateNewPasswordMutation()
  const { t } = useTranslate()

  useErrorToast(isSuccess, error)

  if (isLoading) return <p>Loading...</p>

  const router = useRouter()

  const submit = (data: PasswordsMatchForm) => {
    setPasswordSentModal(true)
    createNewPassword({ newPassword: data.password, recoveryCode: router.pathname })
  }

  useEffect(() => {
    if (isSuccess) {
      setPasswordSentModal(true)
    }
  }, [isSuccess])

  const onModalClose = () => {
    setPasswordSentModal(false)
  }
  const onSaveModalAction = () => {
    setPasswordSentModal(false)
  }

  return (
    <div className={s.container}>
      {!passwordSentModal && <Header />}
      <div className={s.main}>
        <CreateNewPasswordForm onSubmitHandler={submit} />
        <Modal
          modalWidth={'sm'}
          title={'New password was created'}
          open={passwordSentModal}
          actionButtonName={'OK'}
          onClose={onModalClose}
          onAction={onSaveModalAction}
        >
          <Typography variant={'regular16'}>{t.auth.passwordChanged}</Typography>
        </Modal>
      </div>
    </div>
  )
}
