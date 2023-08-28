import React, { useState } from 'react'

import { usePasswordRecoveryMutation } from '@/src/assets/api/auth'
import { PasswordRecoveryType } from '@/src/assets/api/types'
import { useErrorToastHandler } from '@/src/assets/hooks/useErrorToastHandler'
import { useTranslate } from '@/src/assets/hooks/useTranslate'
import { ForgotPassword } from '@/src/components/auth/forgot-password/ForgotPassword'
import { AuthLayout } from '@/src/components/layout/auth-layout'
import { Modal } from '@/src/components/ui/modals/BaseModal'
import { Typography } from '@/src/components/ui/typography/typography'

const PasswordRecovery = () => {
  const [passwordRecovery, { isSuccess, error }] = usePasswordRecoveryMutation()
  const [openModal, setOpenModal] = useState(false)
  const { t } = useTranslate()

  useErrorToastHandler(isSuccess, error)

  const modalHandler = () => {
    setOpenModal(!openModal)
  }

  const submit = (data: PasswordRecoveryType) => {
    passwordRecovery(data)
  }

  return (
    <AuthLayout>
      <ForgotPassword onSubmitHandler={submit} modalHandler={modalHandler} />
      <Modal
        modalWidth={'sm'}
        open={openModal}
        title={t.auth.forgotPasswordTitle}
        onAction={modalHandler}
        onCancel={modalHandler}
        onClose={modalHandler}
      >
        <Typography variant="regular16">{t.auth.linkHasBeenSent}</Typography>
      </Modal>
    </AuthLayout>
  )
}

export default PasswordRecovery
