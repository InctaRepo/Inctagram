import { useState } from 'react'
import { LogoutIcon } from '@/src/shared/assets/icons/LogoutIcon'
import { getUserEmail } from '@/src/shared/hoc/model/selectors/getUserEmail/getUserEmail'
import { useAppDispatch, useAppSelector, useTranslate } from '@/src/shared/hooks'
import { Button } from '@/src/shared/ui/button'
import { Modal } from '@/src/shared/ui/Modal'
import { Typography } from '@/src/shared/ui/typography'
import { setLogout } from '../../../auth/authService'
import { useLogoutMutation } from '../service/logout'
import s from './logout.module.scss'

export const Logout = () => {
  const dispatch = useAppDispatch()
  const email = useAppSelector(getUserEmail)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [logoutUser] = useLogoutMutation()

  const { t } = useTranslate()
  const logoutHandler = async () => {
    logoutUser()
    dispatch(setLogout())
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
        <LogoutIcon fill={'current'} className={s.logo} />
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
        <Typography variant={'regular16'}>{t.profile.confirmLogout(email)}</Typography>
      </Modal>
    </div>
  )
}
