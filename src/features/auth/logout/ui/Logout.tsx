import { clsx } from 'clsx'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { LogoutIcon } from '@/src/shared/assets/icons/LogoutIcon'
import { RouteNames } from '@/src/shared/const/routeNames'
import { variantIconLink } from '@/src/shared/const/variantIconLink'
import { getUserEmail } from '@/src/shared/hoc/model/selectors/getUserEmail/getUserEmail'
import { useAppDispatch, useAppSelector, useTranslate } from '@/src/shared/hooks'
import { setVariantIcon } from '@/src/shared/sidebar/model/slice/menuSlice'
import { Button } from '@/src/shared/ui/button'
import { Modal } from '@/src/shared/ui/Modal'
import { Typography } from '@/src/shared/ui/typography'
import { setLogout } from '../../../auth/authService'
import { useLogoutMutation } from '../service/logout'
import s from './logout.module.scss'

type Props = {
  variantIcon: variantIconLink
  handleClick: (variant: string) => void
}
export const Logout = ({ variantIcon, handleClick }: Props) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
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
