import { useEffect, useState } from 'react'

import { useSignUpMutation } from '@/features/auth/signUp/service/signUp'
import { SingUpForm } from '@/features/auth/signUp/ui/singUpForm'
import { resultCode } from '@/shared/const'
import { useErrorToast, useTranslate } from '@/shared/hooks'
import { SignUpFormSchema } from '@/shared/schemas/signUpSchema'
import { NextPageWithLayout } from '@/shared/service/nextPageWithLayout'
import { Loader } from '@/ui/loader'
import { Modal } from '@/ui/modal'
import { Typography } from '@/ui/typography'

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
    <div>
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
  )
}
