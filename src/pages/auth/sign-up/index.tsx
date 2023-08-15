import { useState } from 'react'

import { useMutation } from 'react-query'

import s from './sign-up.module.scss'

import { authAPI } from '@/src/assets/api'
import { errorHandler } from '@/src/common/helpers/error-handler'
import { RegisterForm, RegisterFormType } from '@/src/components/auth/register-form'
import { Header } from '@/src/components/Header/Header'
import { BaseModal } from '@/src/components/ui/modals/BaseModal'
import { ClientOnlyModalWrapper } from '@/src/components/ui/modals/ClientOnlyModalWrapper'
import { Typography } from '@/src/components/ui/typography'
import { alertToast } from 'src/components/ui/alert'

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

  // TODO error handling
  let userEmail = null

  if (isSuccess) {
    alertToast(false, 'Success')
    setEmailSentModal(true)
  }
  if (error) {
    alertToast(true, errorHandler(error))
  }

  if (isLoading) {
    return <div>Loading...</div>
    //TODO loader component
  }

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
