import React from 'react'

import { useCreateNewPassword } from '@/features/auth/createNewPassword/hooks'
import { CreateNewPasswordForm } from '@/features/auth/createNewPassword/ui/createNewPasswordForm'
import { Loader } from '@/ui/loader'
import { Modal } from '@/ui/modal'
import { Typography } from '@/ui/typography'

import s from '@/features/auth/createNewPassword/ui/createNewPassword.module.scss'

export const CreateNewPassword = () => {
  const { isLoading, onModalClose, onSaveModalAction, passwordSentModal, submit, t } =
    useCreateNewPassword()

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={s.container}>
      <div className={s.main}>
        <CreateNewPasswordForm onSubmitHandler={submit} />
        <Modal
          actionButtonName={t.auth.ok}
          modalWidth={'sm'}
          onAction={onSaveModalAction}
          onClose={onModalClose}
          open={passwordSentModal}
          title={t.auth.wasCreateNewPassword}
        >
          <Typography variant={'regular16'}>{t.auth.passwordChanged}</Typography>
        </Modal>
      </div>
    </div>
  )
}
