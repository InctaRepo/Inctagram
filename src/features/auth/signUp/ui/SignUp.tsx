import { useEffect, useState } from 'react'

import { useSignUpMutation } from '../service/signUp'

import s from './signUp.module.scss'
import { SingUpForm } from './singUpForm'

import { useErrorToast, useTranslate } from '@/src/shared/hooks'
import { SignUpFormSchema } from '@/src/shared/schemas/signUpSchema'
import { NextPageWithLayout } from '@/src/shared/service/nextPageWithLayout'
import { Loader } from '@/src/shared/ui/loader'
import { Modal } from 'src/shared/ui/modal'
import { Typography } from 'src/shared/ui/typography'

export const SignUp: NextPageWithLayout = () => {
  const { t } = useTranslate()

  const [emailSentModal, setEmailSentModal] = useState<boolean>(false)
  const [userRegistration, { isLoading, isSuccess, data }] = useSignUpMutation()
  // START : for error handling manual , need refactor =================================================
  const successRes = isSuccess && data?.resultCode === 0
  const errorRes = isSuccess && data?.resultCode !== 0
  const error = data?.extensions && data.extensions.length > 0 && data.extensions[0].message

  const setToastHandler = () => {
    if (successRes) {
      useErrorToast(isSuccess, false)
    }
    if (errorRes) {
      useErrorToast(false, error ? error : 'Some error')
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setToastHandler()
      if (successRes) {
        setEmailSentModal(true)
      }
    }
  }, [isSuccess, data])

  const submit = (data: SignUpFormSchema) => {
    userRegistration(data)
  }

  const onModalClose = () => {
    setEmailSentModal(false)
  }
  const onSaveModalAction = () => {
    setEmailSentModal(false)
  }

  if (isLoading) return <Loader />

  return (
    <div className={s.container}>
      {!emailSentModal}
      <div className={s.main}>
        <SingUpForm onSubmitHandler={submit} />
        <Modal
          modalWidth={'sm'}
          title={t.auth.emailSent}
          open={emailSentModal}
          actionButtonName={t.auth.ok}
          onClose={onModalClose}
          onAction={onSaveModalAction}
        >
          <Typography variant={'regular16'}>
            {t.auth.emailConfirm(data?.data?.email ? data?.data?.email : '...')}
          </Typography>
        </Modal>
      </div>
    </div>
  )
}
