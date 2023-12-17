import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useCreateNewPasswordMutation } from '../service/CreateNewPassword'
import s from '../ui/createNewPassword.module.scss'

import { CreateNewPasswordForm } from './createNewPasswordForm'

import { useErrorToast, useTranslate } from '@/src/shared/hooks'
import { PasswordsMatchForm } from '@/src/shared/schemas/passwordsMatchSchema'
import { NextPageWithLayout } from '@/src/shared/service/nextPageWithLayout'
import { Loader } from '@/src/shared/ui/loader'
import { Typography } from '@/src/shared/ui/typography'
import { Modal } from 'src/shared/ui/modal'

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
