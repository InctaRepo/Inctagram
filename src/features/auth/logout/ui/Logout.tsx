import { useState } from 'react'

import { useLogoutMutation } from '@/features/auth/logout/service/logout'
import { clearId, clearToken } from '@/features/auth/signIn'
import { LogoutIcon } from '@/shared/assets/icons/LogoutIcon'
import { RouteNames, variantIconLink } from '@/shared/const'
import { getUserEmail, setAuthMeData } from '@/shared/hoc'
import { useAppDispatch, useAppSelector, useTranslate } from '@/shared/hooks'
import { setVariantIcon, sidebarVariantIconSelector } from '@/shared/sidebar'
import { Button } from '@/ui/button'
import { Modal } from '@/ui/modal'
import { Typography } from '@/ui/typography'
import { clsx } from 'clsx'
import { useRouter } from 'next/router'

import s from '@/features/auth/logout/ui/logout.module.scss'

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
    dispatch(setAuthMeData({ authMeData: { email: '', userId: '', username: '' } }))
    dispatch(clearToken())
    dispatch(clearId())
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
    <>
      <div className={styles.check}>
        <Button className={s.btn} onClick={onClickOpenModal} variant={'link'}>
          <LogoutIcon
            className={s.logo}
            fill={variantIcon === `${RouteNames.LOGOUT}`.slice(1) ? '#397df6' : 'current'}
          />
          <Typography className={s.text + styles.check} variant={'medium14'}>
            {t.sidebar.logout}
          </Typography>
        </Button>
      </div>
      <Modal
        actionButtonName={t.profile.yes}
        cancelButtonName={t.profile.no}
        modalWidth={'md'}
        onAction={logoutHandler}
        onCancel={onModalClose}
        onClose={onModalClose}
        open={openModal}
        title={t.sidebar.logout}
      >
        <Typography variant={'regular16'}>{t.profile.confirmLogout(email)}</Typography>
      </Modal>
    </>
  )
}
