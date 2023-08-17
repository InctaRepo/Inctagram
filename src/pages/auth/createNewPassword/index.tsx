import { AuthLayout } from '@/src/components/Layout/AuthLayout'
import { useMutation } from 'react-query'
import { newPasswordAPI } from '@/src/assets/api'

// eslint-disable-next-line import/no-named-as-default
import CreateNewPassword, {
  CreateNewPasswordType,
} from '@/src/components/ui/createNewPassword/CreateNewPassword'
import { NextPageWithLayout } from '@/src/pages/_app'
import React, { useState } from 'react'
import { BaseModal } from '@/src/components/ui/BaseModal'
import { ClientOnlyModalWrapper } from '@/src/components/ui/BaseModal/ClientOnlyModalWrapper'
import { Typography } from '@/src/components/ui/typography'
import { Header } from '@/src/components/Header/Header'
import s from './new-password.module.scss'

const CreateNewPasswordPage: NextPageWithLayout = () => {
  const [passwordSentModal, setPasswordSentModal] = useState<boolean>(false)

  const {
    mutate: NewPasswordCreating,
    data,
    error,
    isSuccess,
    isLoading,
  } = useMutation({
    mutationFn: newPasswordAPI.createNewPassword,
  })

  //const router = useRouter()  - I will use it later

  if (isLoading) return <p>Loading...</p>

  const code = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

  const submit = (data: CreateNewPasswordType) => {
    setPasswordSentModal(true)
    NewPasswordCreating({ newPassword: data.password, recoveryCode: code })
  }

  if (isSuccess && data.status === 204) {
    setPasswordSentModal(true)
  }

  const onModalClose = () => {
    setPasswordSentModal(false)
  }
  const onSaveModalAction = () => {
    setPasswordSentModal(false)
  }

  return (
    <div className={s.container}>
      {!passwordSentModal && <Header />}
      <div className={s.main}>
        <CreateNewPassword onSubmitHandler={submit} />
        <ClientOnlyModalWrapper>
          <BaseModal
            modalWidth={'sm'}
            title={'New password was created'}
            open={passwordSentModal}
            actionButtonName={'OK'}
            onClose={onModalClose}
            onAction={onSaveModalAction}
          >
            <Typography variant={'regular16'}>Your password was successfully changed</Typography>
          </BaseModal>
        </ClientOnlyModalWrapper>
      </div>
    </div>
  )
}

export default CreateNewPasswordPage
