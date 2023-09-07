import React, { useState } from 'react'

import { useErrorToast } from '@/src/assets/hooks/use-error-toast'
import { useTranslate } from '@/src/assets/hooks/use-translate'
import { ForgotPassword } from '@/src/components/auth/forgot-password/ForgotPassword'
import { AuthLayout } from '@/src/components/layout/auth-layout'
import { Modal } from '@/src/components/ui/modals/BaseModal'
import { Typography } from '@/src/components/ui/typography/typography'
import { PasswordRecoveryType } from '@/src/services/auth/auth-api-types'
import { usePasswordRecoveryMutation } from 'src/services/auth'

const PasswordRecovery = () => {
  const [passwordRecovery, { isSuccess, error }] = usePasswordRecoveryMutation()
  const { t } = useTranslate()
  const [email, setEmail] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const modalHandler = () => {
    setOpenModal(!openModal)
  }

  useErrorToast(isSuccess, error)

  const submit = (data: PasswordRecoveryType) => {
    passwordRecovery(data)
    setEmail(data.email)
  }

  return (
    <AuthLayout>
      <ForgotPassword onSubmitHandler={submit} modalHandler={modalHandler} />
      <Modal
        modalWidth={'sm'}
        open={openModal}
        title={t.auth.emailSent}
        onAction={modalHandler}
        onCancel={modalHandler}
        onClose={modalHandler}
      >
        <Typography variant="regular16">{t.auth.emailConfirm(email)}</Typography>
      </Modal>
    </AuthLayout>
  )
}

export default PasswordRecovery
