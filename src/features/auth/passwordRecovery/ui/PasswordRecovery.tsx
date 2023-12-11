import React, { useState } from 'react'

import { usePasswordRecoveryMutation } from '../service/passwordRecovery'

import { PasswordRecoveryForm } from './passwordRecoveryForm'
import s from './passwordRecoveryForm/passwordRecoveryForm.module.scss'

import { PasswordRecoveryParams } from '@/src/features/auth/passwordRecovery/model/types/passwordRecoveryParams'
import { useTranslate } from '@/src/shared/hooks'
import { Button } from '@/src/shared/ui/button/Button'
import { Typography } from '@/src/shared/ui/typography'
import { Modal } from 'src/shared/ui/modal'

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
