import { useState } from 'react'

import { clsx } from 'clsx'
import { useRouter } from 'next/router'

import { setLogout } from '@/src/features/auth/authService'
import { useLogoutMutation } from '@/src/features/auth/logout/service/logout'
import s from '@/src/features/auth/logout/ui/logout.module.scss'
import { LogoutIcon } from '@/src/shared/assets/icons/LogoutIcon'
import { RouteNames, variantIconLink } from '@/src/shared/const'
import { getUserEmail, setAuthMeData } from '@/src/shared/hoc'
import { useAppDispatch, useAppSelector, useTranslate } from '@/src/shared/hooks'
import { setVariantIcon, sidebarVariantIconSelector } from '@/src/shared/sidebar'
import { Button } from '@/src/shared/ui/button'
import { Modal } from '@/src/shared/ui/modal'
import { Typography } from '@/src/shared/ui/typography'

export const Logout = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const variantIcon = useAppSelector(sidebarVariantIconSelector)
  const email = useAppSelector(getUserEmail)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [logoutUser] = useLogoutMutation()

  const { t } = useTranslate()
  const logoutHandler = async () => {
    logoutUser()
    dispatch(setLogout())
    dispatch(setAuthMeData({ authMeData: { userId: '', username: '', email: '' } }))
    router.push(RouteNames.SIGN_IN)
    setOpenModal(false)
  }
  const onModalClose = () => {
    setOpenModal(false)
    dispatch(setVariantIcon(null))
  }
  const onClickOpenModal = () => {
    setOpenModal(true)
    dispatch(setVariantIcon(`${RouteNames.LOGOUT}`.slice(1) as variantIconLink))
  }
  const styles = {
    check: clsx(s.linkMenu, `${RouteNames.LOGOUT}`.startsWith('/' + variantIcon) && s.active),
  }

  return (
    <div>
      <div className={styles.check}>
        <Button variant="link" onClick={onClickOpenModal} className={s.btn}>
          <LogoutIcon
            fill={variantIcon === `${RouteNames.LOGOUT}`.slice(1) ? '#397df6' : 'current'}
            className={s.logo}
          />
          <Typography variant="medium14" className={s.text + styles.check}>
            {t.profile.logout}
          </Typography>
        </Button>
      </div>
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
