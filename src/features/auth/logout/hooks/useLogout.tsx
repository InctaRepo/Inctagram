import { useCallback, useState } from 'react'

import { useLogoutMutation } from '@/features/auth/logout/service/logout'
import { clearId, clearToken } from '@/features/auth/signIn'
import { RouteNames, variantIconLink } from '@/shared/const'
import { getUserEmail, setAuthMeData } from '@/shared/hoc'
import { useAppDispatch, useAppSelector, useTranslate } from '@/shared/hooks'
import { setVariantIcon, sidebarVariantIconSelector } from '@/shared/sidebar'
import { clsx } from 'clsx'
import { useRouter } from 'next/router'

import s from '@/features/auth/logout/ui/logout.module.scss'

export const useLogout = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const variantIcon = useAppSelector(sidebarVariantIconSelector)
  const email = useAppSelector(getUserEmail)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [logoutUser] = useLogoutMutation()

  const { t } = useTranslate()
  const logoutHandler = useCallback(() => {
    logoutUser()
    dispatch(setAuthMeData({ authMeData: { email: '', userId: '', username: '' } }))
    dispatch(clearToken())
    dispatch(clearId())
    dispatch(setVariantIcon(null))
    router.push(RouteNames.SIGN_IN)
    setOpenModal(false)
  }, [])
  const onModalClose = useCallback(() => {
    setOpenModal(false)
    dispatch(setVariantIcon(null))
  }, [])
  const onClickOpenModal = () => {
    setOpenModal(true)
    dispatch(setVariantIcon(`${RouteNames.LOGOUT}`.slice(1) as variantIconLink))
  }
  const styles = {
    check: clsx(s.linkMenu, `${RouteNames.LOGOUT}`.startsWith('/' + variantIcon) && s.active),
  }

  return { email, logoutHandler, onClickOpenModal, onModalClose, openModal, styles, t, variantIcon }
}
