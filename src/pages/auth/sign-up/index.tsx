import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'
import { useMutation } from 'react-query'

import s from './sign-up.module.scss'

import { authAPI } from '@/src/assets/api/auth'
import { useErrorToastHandler } from '@/src/assets/hooks/useErrorToastHandler'
import { RegisterForm, RegisterFormType } from '@/src/components/auth/register-form'
import { Header } from '@/src/components/Header/Header'
import { Typography } from '@/src/components/ui/typography'

const SentEmailModal = dynamic(() => import('@/src/components/ui/modals/BaseModal/BaseModal'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

const SignUpPage = () => {
  const [emailSentModal, setEmailSentModal] = useState<boolean>(false)

  const {
    mutate: userRegistration,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: authAPI.createUser,
  })

  useErrorToastHandler(isSuccess, error)

  useEffect(() => {
    if (isSuccess) {
      setEmailSentModal(true)
    }
  }, [isSuccess])

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
        <SentEmailModal
          modalWidth={'sm'}
          title={'Email sent'}
          open={emailSentModal}
          actionButtonName={'OK'}
          onClose={onModalClose}
          onAction={onSaveModalAction}
        >
          <Typography variant={'regular16'}>
            We have sent a link to confirm your email to {userEmail ? userEmail : 'User Email here'}
            {/*TODO email from response*/}
          </Typography>
        </SentEmailModal>
      </div>
    </div>
  )
}

export default SignUpPage
