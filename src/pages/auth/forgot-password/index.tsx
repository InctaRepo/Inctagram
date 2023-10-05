import React, { useState } from 'react'

import { useTranslate } from '@/src/assets/hooks/use-translate'
import { ForgotPassword } from '@/src/components/auth/forgot-password/ForgotPassword'
import s from '@/src/components/auth/forgot-password/forgotPassword.module.scss'
import { AuthLayout } from '@/src/components/layout/auth-layout'
import { Button } from '@/src/components/ui/button/button'
import { Modal } from '@/src/components/ui/modals/BaseModal'
import { Typography } from '@/src/components/ui/typography/typography'
import { usePasswordRecoveryMutation } from '@/src/services/auth/auth-api'
import { PasswordRecoveryType } from '@/src/services/auth/auth-api-types'

const PasswordRecovery = () => {
  const [passwordRecovery] = usePasswordRecoveryMutation()
  const { t } = useTranslate()
  const [email, setEmail] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const modalHandler = () => {
    setOpenModal(!openModal)
  }

  const submit = (data: PasswordRecoveryType) => {
    passwordRecovery(data)
    setEmail(data.email.length > 30 ? data.email.slice(0, 30) + '...' : data.email)
  }

  return (
    <AuthLayout>
      <ForgotPassword onSubmitHandler={submit} modalHandler={modalHandler} />
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
    </AuthLayout>
  )
}

export default PasswordRecovery
