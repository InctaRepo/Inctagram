import { useEffect, useState } from 'react'

import s from './sign-up.module.scss'

import { useCreateUserMutation } from '@/src/assets/api/auth'
import { useErrorToastHandler } from '@/src/assets/hooks/useErrorToastHandler'
import { useTranslation } from '@/src/assets/hooks/useTranslation'
import { RegisterForm, RegisterFormType } from '@/src/components/auth/register-form'
import { Header } from '@/src/components/ui/Header/Header'
import { Modal } from '@/src/components/ui/modals/BaseModal'
import { Typography } from '@/src/components/ui/typography'

const SignUpPage = () => {
  const { t } = useTranslation()

  const [emailSentModal, setEmailSentModal] = useState<boolean>(false)
  const [userRegistration, { isSuccess, data }] = useCreateUserMutation()

  const setToastHandler = () => {
    if (isSuccess && data?.resultCode === 0) {
      useErrorToastHandler(isSuccess, false)
    }
    if (isSuccess && !(data?.resultCode === 0)) {
      useErrorToastHandler(false, data?.extensions[0].message)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setToastHandler()
      if (isSuccess && data?.resultCode === 0) {
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
            {t.auth.emailConfirm(data ? data?.extensions[0].key : '...')}
          </Typography>
        </Modal>
      </div>
    </div>
  )
}

export default SignUpPage
