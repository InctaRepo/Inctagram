import React from 'react'

import { useCreateNewPassword } from '@/features/auth/createNewPassword/hooks'
import s from '@/features/auth/createNewPassword/ui/createNewPassword.module.scss'
import { CreateNewPasswordForm } from '@/features/auth/createNewPassword/ui/createNewPasswordForm'
import { Loader } from '@/ui/loader'
import { Modal } from '@/ui/modal'
import { Typography } from '@/ui/typography'

export const CreateNewPassword = () => {
  const { t, submit, onSaveModalAction, passwordSentModal, onModalClose, isLoading } =
    useCreateNewPassword()

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
