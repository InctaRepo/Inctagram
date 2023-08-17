import { useState } from 'react'

import { useMutation } from 'react-query'

import s from './sign-up.module.scss'

import { authAPI } from '@/src/assets/api'
import { useErrorToastHandler } from '@/src/assets/hooks/useErrorToastHandler'
import { RegisterForm, RegisterFormType } from '@/src/components/auth/register-form'
import { Header } from '@/src/components/Header/Header'
import { BaseModal } from '@/src/components/ui/modals/BaseModal'
import { ClientOnlyModalWrapper } from '@/src/components/ui/modals/ClientOnlyModalWrapper'
import { Typography } from '@/src/components/ui/typography'

const SignUpPage = () => {
  const [emailSentModal, setEmailSentModal] = useState<boolean>(false)

  const {
    mutate: userRegistration,
    isSuccess,
    error,
    isLoading,
  } = useMutation({
    mutationFn: authAPI.createUser,
  })

  useErrorToastHandler(isSuccess, error)

  if (isSuccess) {
    setEmailSentModal(true)
  }

  const submit = (data: RegisterFormType) => {
    userRegistration(data)
  }

  const onModalClose = () => {
    setEmailSentModal(false)
    //TODO actions on close
  }
  const onSaveModalAction = () => {
    setEmailSentModal(false)
    // TODO actions on save
  }

  let userEmail = null

  return (
    <div className={s.container}>
      {!emailSentModal && <Header />}
      <div className={s.main}>
        <RegisterForm onSubmitHandler={submit} />
        <ClientOnlyModalWrapper>
          {/*TODO refactor modal and delete wrapper*/}
          {/*using wrapper of the modal to disable SSR*/}
          <BaseModal
            modalWidth={'sm'}
            title={'Email sent'}
            open={emailSentModal}
            actionButtonName={'OK'}
            onClose={onModalClose}
            onAction={onSaveModalAction}
          >
            <Typography variant={'regular16'}>
              We have sent a link to confirm your email to{' '}
              {userEmail ? userEmail : 'User Email here'}
              {/*TODO email from response*/}
            </Typography>
          </BaseModal>
        </ClientOnlyModalWrapper>
      </div>
    </div>
  )
}

export default SignUpPage
