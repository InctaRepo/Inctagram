import { useState } from 'react'

import { clsx } from 'clsx'
import { useRouter } from 'next/router'

import { setLogout } from '../../../auth/authService'
import { useLogoutMutation } from '../service/logout'

import s from './logout.module.scss'

import { LogoutIcon } from '@/src/shared/assets/icons/LogoutIcon'
import { RouteNames } from '@/src/shared/const/routeNames'
import { getUserEmail } from '@/src/shared/hoc/model/selectors/getUserEmail/getUserEmail'
import { useAppDispatch, useAppSelector, useTranslate } from '@/src/shared/hooks'
import { setVariantIcon, sidebarVariantIconSelector } from '@/src/shared/sidebar'
import { Button } from '@/src/shared/ui/button'
import { Typography } from '@/src/shared/ui/typography'
import { Modal } from 'src/shared/ui/modal'

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
    router.push(RouteNames.SIGN_IN)
    setOpenModal(false)
  }
  const onModalClose = () => {
    setOpenModal(false)
    dispatch(setVariantIcon(null))
  }
  const onClickOpenModal = () => {
    setOpenModal(true)
    dispatch(setVariantIcon(`${RouteNames.LOGOUT}`.slice(1)))
  }
  const styles = {
    check: clsx(`${RouteNames.LOGOUT}`.startsWith('/' + variantIcon) && s.active),
  }

  return (
    <div>
      <div className={s.linkMenu}>
        <Button variant="link" onClick={onClickOpenModal} className={s.btn}>
          <Typography variant="medium14" className={s.text}>
            <div>
              <LogoutIcon
                fill={variantIcon === `${RouteNames.LOGOUT}`.slice(1) ? '#397df6' : 'current'}
                className={s.logo}
              />
            </div>
            <div className={styles.check}>{t.profile.logout}</div>
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
