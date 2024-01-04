import React, { useState } from 'react'

import { usePasswordRecoveryMutation } from '@/src/features/auth/passwordRecovery/service/passwordRecovery'
import { PasswordRecoveryParams } from '@/src/features/auth/passwordRecovery/service/types/passwordRecoveryParams'
import { PasswordRecoveryForm } from '@/src/features/auth/passwordRecovery/ui/passwordRecoveryForm'
import s from '@/src/features/auth/passwordRecovery/ui/passwordRecoveryForm/passwordRecoveryForm.module.scss'
import { useTranslate } from '@/src/shared/hooks'
import { Button } from '@/src/shared/ui/button/Button'
import { Modal } from '@/src/shared/ui/modal'
import { Typography } from '@/src/shared/ui/typography'

export const PasswordRecovery = () => {
  const [passwordRecovery] = usePasswordRecoveryMutation()
  const { t } = useTranslate()
  const [email, setEmail] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const modalHandler = () => {
    setOpenModal(!openModal)
  }

  const submit = (data: PasswordRecoveryParams) => {
    passwordRecovery(data)
    setEmail(data.email.length > 30 ? data.email.slice(0, 30) + '...' : data.email)
  }

  return (
    <>
      <PasswordRecoveryForm onSubmitHandler={submit} modalHandler={modalHandler} />
      <Modal
        className={s.modal}
        modalWidth={'sm'}
        open={openModal}
        title={t.auth.emailSent}
        onAction={modalHandler}
        onCancel={modalHandler}
        onClose={modalHandler}
      >
        <Typography variant="regular16">{t.auth.emailConfirm(email)}</Typography>
        <div className={s.buttonOkWrapper}>
          <Button className={s.buttonOk} onClick={modalHandler} type="button">
            {t.auth.ok}
          </Button>
        </div>
      </Modal>
    </>
  )
}
