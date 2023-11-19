import { useState } from 'react'
import LogoutIcon from '@/src/assets/icons/logout-icon'
import { useAppDispatch, useAppSelector, useTranslate } from '@/src/shared/hooks'
import { Button } from '@/src/shared/ui/button'
import { Modal } from '@/src/shared/ui/Modal'
import { Typography } from '@/src/shared/ui/typography'
import { authActions, authUserSelector, useLogoutUserMutation } from '../authService'
import s from './logout.module.scss'

export const Logout = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(authUserSelector)
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
