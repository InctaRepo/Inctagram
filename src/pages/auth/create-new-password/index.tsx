import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import s from './create-new-password.module.scss'

import { useTranslate } from '@/src/assets/hooks'
import { useErrorToast } from '@/src/assets/hooks/use-error-toast'
import { PasswodsMatchFormType } from '@/src/common/schemas/passwordsMatch-schema'
import { CreateNewPassword } from '@/src/components/auth/create-new-password/CreateNewPassword'
import { Header } from '@/src/components/layout/header/header'
import { Modal } from '@/src/components/ui/modals/BaseModal'
import { Typography } from '@/src/components/ui/typography'
import { NextPageWithLayout } from '@/src/pages/_app'
import { useCreateNewPasswordMutation } from '@/src/services/auth/auth-api'

const CreateNewPasswordPage: NextPageWithLayout = () => {
  const [passwordSentModal, setPasswordSentModal] = useState<boolean>(false)

  const [createNewPassword, { isSuccess, isLoading, error }] = useCreateNewPasswordMutation()
  const { t } = useTranslate()

  useErrorToast(isSuccess, error)

  if (isLoading) return <p>Loading...</p>

  const router = useRouter()

  const submit = (data: PasswodsMatchFormType) => {
    setPasswordSentModal(true)
    createNewPassword({ newPassword: data.password, recoveryCode: router.pathname })
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

  return (
    <div className={s.container}>
      {!passwordSentModal && <Header />}
      <div className={s.main}>
        <CreateNewPassword onSubmitHandler={submit} />
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

export default CreateNewPasswordPage
