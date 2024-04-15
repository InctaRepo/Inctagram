import React, { useState } from 'react'

import { RecoveryParams } from '@/features/auth/recovery/service/types/recoveryParams'
import { RecoveryForm } from '@/features/auth/recovery/ui/recoveryForm'
import { useTranslate } from '@/shared/hooks'
import { Button } from '@/ui/button/Button'
import { Modal } from '@/ui/modal'
import { Typography } from '@/ui/typography'

import s from '@/features/auth/recovery/ui/recovery.module.scss'

type Props = {
  recoveryMutation: (data: RecoveryParams) => void
  type: 'email' | 'password'
}
export const Recovery = ({ recoveryMutation, type }: Props) => {
  const { t } = useTranslate()
  const [email, setEmail] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const modalHandler = () => {
    setOpenModal(!openModal)
  }

  const submit = (data: RecoveryParams) => {
    recoveryMutation(data)
    setEmail(data.email.length > 30 ? data.email.slice(0, 30) + '...' : data.email)
  }

  return (
    <>
      <RecoveryForm modalHandler={modalHandler} onSubmitHandler={submit} type={type} />
      <Modal
        className={s.modal}
        modalWidth={'sm'}
        onAction={modalHandler}
        onCancel={modalHandler}
        onClose={modalHandler}
        open={openModal}
        title={t.auth.emailSent}
      >
        <Typography variant={'regular16'}>{t.auth.emailConfirm(email)}</Typography>
        <div className={s.buttonOkWrapper}>
          <Button className={s.buttonOk} onClick={modalHandler} type={'button'}>
            {t.auth.ok}
          </Button>
        </div>
      </Modal>
    </>
  )
}
