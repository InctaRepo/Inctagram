import { useEffect, useState } from 'react'

import s from './sign-up.module.scss'

import { useCreateUserMutation } from '@/src/assets/api/auth'
import { useErrorToastHandler } from '@/src/assets/hooks/useErrorToastHandler'
import { RegisterForm, RegisterFormType } from '@/src/components/auth/register-form'
import { Header } from '@/src/components/Header/Header'
import { Modal } from '@/src/components/ui/modals/BaseModal'
import { Typography } from '@/src/components/ui/typography'

// export const SentEmailModal = dynamic(
//   () => import('@/src/components/ui/modals/BaseModal/BaseModal'),
//   {
//     loading: () => <p>Loading...</p>,
//     ssr: false,
//   }
// )

const SignUpPage = () => {
  const [emailSentModal, setEmailSentModal] = useState<boolean>(false)
  const [userRegistration, { isSuccess, error }] = useCreateUserMutation()

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
        <Modal
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
        </Modal>
      </div>
    </div>
  )
}

export default SignUpPage
