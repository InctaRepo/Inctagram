import { useState } from 'react'

import { useMutation } from 'react-query'

import s from './sign-up.module.scss'

import { authAPI } from '@/src/assets/api'
import { RegisterForm, RegisterFormType } from '@/src/components/auth/register-form'
import { Header } from '@/src/components/Header/Header'
import { BaseModal } from '@/src/components/ui/modals/BaseModal'
import { ClientOnlyModalWrapper } from '@/src/components/ui/modals/ClientOnlyModalWrapper'
import { ReactToast } from '@/src/components/ui/toast'
import { Typography } from '@/src/components/ui/typography'

const SignUpPage = () => {
  const [emailSentModal, setEmailSentModal] = useState<boolean>(false)

  const {
    mutate: userRegistration,
    data,
    isError,
    isSuccess,
    error,
    isLoading,
  } = useMutation({
    mutationFn: authAPI.createUser,
  })

  const submit = (data: RegisterFormType) => {
    userRegistration(data)
  }

  const toasthandler = () => {
    // ReactToast('error', 'some error')
    ReactToast(true, 'privet')
    ReactToast(false, 'privet')
    // ReactToast('success', 'success')
  }

  if (isSuccess && data.status === 204) {
    setEmailSentModal(true)
  }

  const onModalClose = () => {
    setEmailSentModal(false)
    //TODO actions on close
  }
  const onSaveModalAction = () => {
    setEmailSentModal(false)
    // TODO actions on save
  }

  // TODO error handling
  let userEmail = null

  return (
    <div className={s.container}>
      {!emailSentModal && <Header />}
      <div className={s.main}>
        <button onClick={toasthandler}>TOASTER</button>
        <RegisterForm onSubmitHandler={submit} />
        <ClientOnlyModalWrapper>
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
