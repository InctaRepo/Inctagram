import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useCreateNewPasswordMutation } from '@/features/auth/createNewPassword/service/CreateNewPassword'
import s from '@/features/auth/createNewPassword/ui/createNewPassword.module.scss'
import { CreateNewPasswordForm } from '@/features/auth/createNewPassword/ui/createNewPasswordForm'
import { useErrorToast, useTranslate } from '@/shared/hooks'
import { PasswordsMatchForm } from '@/shared/schemas/passwordsMatchSchema'
import { NextPageWithLayout } from '@/shared/service/nextPageWithLayout'
import { Loader } from '@/ui/loader'
import { Modal } from '@/ui/modal'
import { Typography } from '@/ui/typography'

export const CreateNewPassword: NextPageWithLayout = () => {
  const [passwordSentModal, setPasswordSentModal] = useState<boolean>(false)

  const [createNewPassword, { isSuccess, isLoading, error }] = useCreateNewPasswordMutation()
  const { t } = useTranslate()

  useErrorToast(isSuccess, error)

  const router = useRouter()
  const { code } = router.query

  let recoveryCode = ''

  useEffect(() => {
    if (code) {
      recoveryCode = code as string
    }
  }, [code])
  const submit = (data: PasswordsMatchForm) => {
    setPasswordSentModal(true)
    createNewPassword({ newPassword: data.password, recoveryCode })
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

  if (isLoading) return <Loader />

  return (
    <div className={s.container}>
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
