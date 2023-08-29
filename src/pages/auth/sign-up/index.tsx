import { useEffect, useState } from 'react'

import s from './sign-up.module.scss'

import { useCreateUserMutation } from '@/src/assets/api/auth'
import { useErrorToastHandler } from '@/src/assets/hooks/useErrorToastHandler'
import { useTranslate } from '@/src/assets/hooks/useTranslate'
import { RegisterFormType } from '@/src/common/schemas/register-schema'
import { RegisterForm } from '@/src/components/auth/register-form'
import { Header } from '@/src/components/ui/Header/Header'
import { Modal } from '@/src/components/ui/modals/BaseModal'
import { Typography } from '@/src/components/ui/typography'

const SignUpPage = () => {
  const { t } = useTranslate()

  const [emailSentModal, setEmailSentModal] = useState<boolean>(false)
  const [userRegistration, { isSuccess, data }] = useCreateUserMutation()

  const successRes = isSuccess && data?.resultCode === 0
  const errorRes = isSuccess && !(data?.resultCode === 0)
  const error = data?.extensions[0].message
  const successKey = data?.extensions[0].key
  const setToastHandler = () => {
    if (successRes) {
      useErrorToastHandler(isSuccess, false)
    }
    if (errorRes) {
      useErrorToastHandler(false, error ? error : 'Some error')
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

  const submit = (data: RegisterFormType) => {
    userRegistration(data)
  }

  const onModalClose = () => {
    setEmailSentModal(false)
  }
  const onSaveModalAction = () => {
    setEmailSentModal(false)
  }

  return (
    <div className={s.container}>
      {!emailSentModal && <Header />}
      <div className={s.main}>
        <RegisterForm onSubmitHandler={submit} />
        <Modal
          modalWidth={'sm'}
          title={t.auth.emailSent}
          open={emailSentModal}
          actionButtonName={t.auth.ok}
          onClose={onModalClose}
          onAction={onSaveModalAction}
        >
          <Typography variant={'regular16'}>
            {t.auth.emailConfirm(successKey ? successKey : '...')}
          </Typography>
        </Modal>
      </div>
    </div>
  )
}

export default SignUpPage
