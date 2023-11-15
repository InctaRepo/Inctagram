import { useEffect, useState } from 'react'

import s from './sign-up.module.scss'

import { useErrorToast } from '@/src/assets/hooks/use-error-toast'
import { useTranslate } from '@/src/assets/hooks/use-translate'
import { RegisterForm } from '@/src/common/schemas/registerSchema'
import { Register } from '@/src/components/auth/register-form'
import { Header } from '@/src/components/header/header'
import { Modal } from '@/src/components/ui/modals/BaseModal'
import { Typography } from '@/src/components/ui/typography'
import { useRegisterMutation } from '@/src/services/auth/auth-api'

// const SignUpPage = (props: Props) => {
const SignUpPage = () => {
  const { t } = useTranslate()

  const [emailSentModal, setEmailSentModal] = useState<boolean>(false)
  const [userRegistration, { isSuccess, data }] = useRegisterMutation()
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

  const submit = (data: RegisterForm) => {
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
        <Register onSubmitHandler={submit} />
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

export default SignUpPage
