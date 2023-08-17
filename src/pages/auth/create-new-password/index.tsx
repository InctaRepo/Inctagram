import React, { useEffect, useState } from 'react'

import { useMutation } from 'react-query'

import { authAPI } from '@/src/assets/api/auth'
import { useErrorToastHandler } from '@/src/assets/hooks/useErrorToastHandler'
import { Header } from '@/src/components/Header/Header'
import {
  CreateNewPassword,
  CreateNewPasswordType,
} from '@/src/components/ui/createNewPassword/CreateNewPassword'
import { Modal } from '@/src/components/ui/modals/BaseModal'
import { Typography } from '@/src/components/ui/typography'
import { NextPageWithLayout } from '@/src/pages/_app'

const CreateNewPasswordPage: NextPageWithLayout = () => {
  const [passwordSentModal, setPasswordSentModal] = useState<boolean>(false)

  const {
    mutate: createNewPassword,
    error,
    isSuccess,
    isLoading,
  } = useMutation({
    mutationFn: authAPI.createNewPassword,
  })

  useErrorToastHandler(isSuccess, error)

  //const router = useRouter()  - I will use it later

  if (isLoading) return <p>Loading...</p>

  const code = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

  const submit = (data: CreateNewPasswordType) => {
    setPasswordSentModal(true)
    createNewPassword({ newPassword: data.password, recoveryCode: code })
  }

  useEffect(() => {
    if (isSuccess) {
      setPasswordSentModal(true)
    }
  }, [isSuccess])

  const onModalClose = () => {
    setPasswordSentModal(false)
  }
  const onSaveModalAction = () => {
    setPasswordSentModal(false)
  }

  return (
    <div
    // TODO styles
    // className={s.container}
    >
      {!passwordSentModal && <Header />}
      <div
      // className={s.main}
      >
        <CreateNewPassword onSubmitHandler={submit} />
        <Modal
          modalWidth={'sm'}
          title={'New password was created'}
          open={passwordSentModal}
          actionButtonName={'OK'}
          onClose={onModalClose}
          onAction={onSaveModalAction}
        >
          <Typography variant={'regular16'}>Your password was successfully changed</Typography>
        </Modal>
      </div>
    </div>
  )
}

export default CreateNewPasswordPage
