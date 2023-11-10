import { useState } from 'react'

import { useTranslate } from '@/src/assets/hooks'
import LogoutIcon from '@/src/assets/icons/logout-icon'
import s from '@/src/components/auth/logout/logout.module.scss'
import { Button } from '@/src/components/ui/button'
import { Modal } from '@/src/components/ui/modals/BaseModal'
import { Typography } from '@/src/components/ui/typography'
import { useAppDispatch, useAppSelector } from '@/src/services'
import { authActions, useLogoutUserMutation } from '@/src/services/auth'

export const Logout = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.auth)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [logoutUser] = useLogoutUserMutation()

  const { t } = useTranslate()
  const logoutHandler = async () => {
    logoutUser()
    // TODO when CORS will be fixed ( query for logout + use useAppDispatch)
    dispatch(authActions.logout())
    setOpenModal(false)
  }
  const onModalClose = () => {
    setOpenModal(false)
  }
  const onClickOpenModal = () => {
    setOpenModal(true)
  }

  return (
    <div>
      <Button variant="link" fullWidth onClick={onClickOpenModal}>
        <LogoutIcon fill={'white'} className={s.logo} />
        <Typography variant="medium14">{t.profile.logout}</Typography>
      </Button>
      <Modal
        modalWidth={'md'}
        title={t.profile.logout}
        open={openModal}
        actionButtonName={t.profile.yes}
        cancelButtonName={t.profile.no}
        onClose={onModalClose}
        onCancel={onModalClose}
        onAction={logoutHandler}
      >
        <Typography variant={'regular16'}>{t.profile.confirmLogout(user?.email!)}</Typography>
      </Modal>
    </div>
  )
}
