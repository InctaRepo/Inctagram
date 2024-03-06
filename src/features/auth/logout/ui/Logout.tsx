import { useState } from 'react'

import { clsx } from 'clsx'
import { useRouter } from 'next/router'

import { useLogoutMutation } from '@/features/auth/logout/service/logout'
import s from '@/features/auth/logout/ui/logout.module.scss'
import { clearId, clearToken } from '@/features/auth/signIn'
import { LogoutIcon } from '@/shared/assets/icons/LogoutIcon'
import { RouteNames, variantIconLink } from '@/shared/const'
import { getUserEmail, setAuthMeData } from '@/shared/hoc'
import { useAppDispatch, useAppSelector, useTranslate } from '@/shared/hooks'
import { setVariantIcon, sidebarVariantIconSelector } from '@/shared/sidebar'
import { Button } from '@/ui/button'
import { Modal } from '@/ui/modal'
import { Typography } from '@/ui/typography'

export const Logout = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const variantIcon = useAppSelector(sidebarVariantIconSelector)
  const email = useAppSelector(getUserEmail)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [logoutUser] = useLogoutMutation()

  const { t } = useTranslate()
  const logoutHandler = async () => {
    await logoutUser()
    dispatch(setAuthMeData({ authMeData: { userId: '', username: '', email: '' } }))
    dispatch(clearToken)
    dispatch(clearId)
    dispatch(setVariantIcon(null))
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
            {t.sidebar.logout}
          </Typography>
        </Button>
      </div>
      <Modal
        modalWidth={'md'}
        title={t.sidebar.logout}
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
