import { useEffect, useState } from 'react'

import { useSignUpMutation } from '@/features/auth/signUp/service/signUp'
import { resultCode } from '@/shared/const'
import { useErrorToast, useTranslate } from '@/shared/hooks'
import { SignUpFormSchema } from '@/shared/schemas/signUpSchema'

export const useSignUp = () => {
  const { t } = useTranslate()

  const [emailSentModal, setEmailSentModal] = useState<boolean>(false)
  const [userRegistration, { data, isLoading, isSuccess }] = useSignUpMutation()
  const successRes = isSuccess && data?.resultCode === resultCode.OK
  const errorRes = isSuccess && data?.resultCode !== resultCode.OK
  const error = data?.extensions && data.extensions.length > 0 && data.extensions[0].message

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setToastHandler = () => {
    if (successRes) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useErrorToast(isSuccess, false)
    }
    if (errorRes) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return { emailSentModal, isLoading, onModalClose, onSaveModalAction, submit }
}
