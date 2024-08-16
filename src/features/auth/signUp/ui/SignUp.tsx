import { useEffect, useState } from 'react'

import { useSignUpMutation } from '@/features/auth/signUp/service/signUp'
import { SingUpForm } from '@/features/auth/signUp/ui/singUpForm'
import { resultCode } from '@/shared/const'
import { useErrorToast, useTranslate } from '@/shared/hooks'
import { SignUpFormSchema } from '@/shared/schemas/signUpSchema'
import { Loader } from '@/ui/loader'
import { Modal } from '@/ui/modal'
import { Typography } from '@/ui/typography'

export const SignUp = () => {
  const { t } = useTranslate()

  const [emailSentModal, setEmailSentModal] = useState<boolean>(false)
  const [userRegistration, { data, error: requestError, isLoading, isSuccess, status }] =
    useSignUpMutation()
  const successRes = isSuccess && status === 'fulfilled'

  // @ts-ignore
  const error = requestError?.data?.messages[0]?.message

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setToastHandler = () => {
    if (successRes) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useErrorToast(isSuccess, false)
    }
    if (requestError) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useErrorToast(false, error ? error : 'Some error')
    }
  }

  useEffect(() => {
    if (isSuccess || !!requestError) {
      setToastHandler()
      if (successRes) {
        setEmailSentModal(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data, requestError])

  const submit = (data: SignUpFormSchema) => {
    userRegistration(data)
  }

  const onModalClose = () => {
    setEmailSentModal(false)
  }
  const onSaveModalAction = () => {
    setEmailSentModal(false)
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div>
      <SingUpForm onSubmitHandler={submit} />
      <Modal
        actionButtonName={t.auth.ok}
        modalWidth={'sm'}
        onAction={onSaveModalAction}
        onClose={onModalClose}
        open={emailSentModal}
        title={t.auth.emailSent}
      >
        <Typography variant={'regular16'}>
          {t.auth.emailConfirm(data?.data?.email ? data?.data?.email : '...')}
        </Typography>
      </Modal>
    </div>
  )
}
