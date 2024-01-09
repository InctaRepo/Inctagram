import { useEffect, useState } from 'react'

import { useSignUpMutation } from '@/src/features/auth/signUp/service/signUp'
import s from '@/src/features/auth/signUp/ui/signUp.module.scss'
import { SingUpForm } from '@/src/features/auth/signUp/ui/singUpForm'
import { resultCode } from '@/src/shared/const'
import { useErrorToast, useTranslate } from '@/src/shared/hooks'
import { SignUpFormSchema } from '@/src/shared/schemas/signUpSchema'
import { NextPageWithLayout } from '@/src/shared/service/nextPageWithLayout'
import { Loader } from '@/src/shared/ui/loader'
import { Modal } from '@/src/shared/ui/modal'
import { Typography } from '@/src/shared/ui/typography'

export const SignUp: NextPageWithLayout = () => {
  const { t } = useTranslate()

  const [emailSentModal, setEmailSentModal] = useState<boolean>(false)
  const [userRegistration, { isLoading, isSuccess, data }] = useSignUpMutation()
  const successRes = isSuccess && data?.resultCode === resultCode.OK
  const errorRes = isSuccess && data?.resultCode !== resultCode.OK
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
