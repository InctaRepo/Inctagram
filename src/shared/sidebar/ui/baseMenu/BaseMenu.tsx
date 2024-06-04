import React, { memo, useCallback, useMemo } from 'react'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { CreatePostDynamic } from '@/features/posts/createPost'
import { HomeIcon } from '@/shared/assets/icons/HomeIcon'
import { MessageIcon } from '@/shared/assets/icons/MessageIcon'
import { ProfileIcon } from '@/shared/assets/icons/ProfileIcon'
import { SearchIcon } from '@/shared/assets/icons/SearchIcon'
import { RouteNames, variantIconLink } from '@/shared/const'
import { getUserId } from '@/shared/hoc'
import { useAppDispatch, useAppSelector, useTranslate } from '@/shared/hooks'
import { setVariantIcon, sidebarVariantIconSelector } from '@/shared/sidebar'
import { LinkMenu } from '@/ui/linkMenu'

import s from '@/shared/sidebar/ui/baseMenu/baseMenu.module.scss'

export const BaseMenu = memo(function BaseMenu() {
  const { t } = useTranslate()
  const userId = useAppSelector(getUserId)
  const dispatch = useAppDispatch()
  const variantIcon = useAppSelector(sidebarVariantIconSelector)
  const handleClick = useCallback(
    (variant: variantIconLink) => {
      dispatch(setVariantIcon(variant))
    },
    [dispatch]
  )
  const searchIconFill = useMemo(() => {
    return variantIcon === `${RouteNames.SEARCH}`.slice(1) ? '#397df6' : 'current'
  }, [variantIcon])
  const homeIconFill = useMemo(() => {
    return variantIcon === `${RouteNames.HOME}`.slice(1) ? '#397df6' : 'current'
  }, [variantIcon])
  const profileIconFill = useMemo(() => {
    return variantIcon === `${RouteNames.PROFILE}`.slice(1) ? '#397df6' : 'current'
  }, [variantIcon])
  const messageIconFill = useMemo(() => {
    return variantIcon === `${RouteNames.MESSAGE}`.slice(1) ? '#397df6' : 'current'
  }, [variantIcon])
  const routeNamesHOME = useMemo(() => {
    return RouteNames.HOME
  }, [])
  const sidebarHome = useMemo(() => {
    return t.sidebar.home
  }, [t.sidebar.home])
  const linkMenuHome = useMemo(() => {
    return (
      <LinkMenu
        handleClick={handleClick}
        link={routeNamesHOME}
        nameLink={sidebarHome}
        variantIcon={variantIcon}
      >
        <HomeIcon className={s.logo} fill={homeIconFill} />
      </LinkMenu>
    )
  }, [homeIconFill, routeNamesHOME, handleClick, sidebarHome, variantIcon])

  return (
    <ul className={s.container}>
      <li style={{ listStyleType: 'none' }}>{linkMenuHome}</li>
      <li style={{ listStyleType: 'none' }}>
        <CreatePostDynamic />
      </li>
      <li style={{ listStyleType: 'none' }}>
        <LinkMenu
          handleClick={handleClick}
          link={RouteNames.PROFILE + `/` + userId}
          nameLink={t.sidebar.myProfile}
          variantIcon={variantIcon}
        >
          <ProfileIcon className={s.logo} fill={profileIconFill} />
        </LinkMenu>
      </li>
      <li style={{ listStyleType: 'none' }}>
        <LinkMenu
          handleClick={handleClick}
          link={RouteNames.MESSAGE}
          nameLink={t.sidebar.messenger}
          variantIcon={variantIcon}
        >
          <MessageIcon className={s.logo} fill={messageIconFill} />
        </LinkMenu>
      </li>
      <li style={{ listStyleType: 'none' }}>
        <LinkMenu
          handleClick={handleClick}
          link={RouteNames.SEARCH}
          nameLink={t.sidebar.search}
          variantIcon={variantIcon}
        >
          <SearchIcon className={s.logo} fill={searchIconFill} />
        </LinkMenu>
      </li>
    </ul>
  )
})
