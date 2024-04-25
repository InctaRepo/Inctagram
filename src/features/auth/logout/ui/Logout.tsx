import { useMemo } from 'react'

import { useLogout } from '@/features/auth/logout/hooks'
import { LogoutIcon } from '@/shared/assets/icons/LogoutIcon'
import { RouteNames } from '@/shared/const'
import { Button } from '@/ui/button'
import { Modal } from '@/ui/modal'
import { Typography } from '@/ui/typography'

import s from '@/features/auth/logout/ui/logout.module.scss'

export const Logout = () => {
  const {
    email,
    logoutHandler,
    onClickOpenModal,
    onModalClose,
    openModal,
    styles,
    t,
    variantIcon,
  } = useLogout()
  const logoutIconFill = useMemo(() => {
    return variantIcon === `${RouteNames.LOGOUT}`.slice(1) ? '#397df6' : 'current'
  }, [variantIcon])

  return (
    <>
      <div className={styles.check}>
        <Button className={s.btn} onClick={onClickOpenModal} variant={'link'}>
          <LogoutIcon className={s.logo} fill={logoutIconFill} />
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
