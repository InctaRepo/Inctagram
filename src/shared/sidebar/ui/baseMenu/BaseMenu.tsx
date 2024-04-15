import React from 'react'

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

export const BaseMenu = () => {
  const { t } = useTranslate()
  const userId = useAppSelector(getUserId)
  const dispatch = useAppDispatch()
  const variantIcon = useAppSelector(sidebarVariantIconSelector)
  const handleClick = (variant: variantIconLink) => {
    dispatch(setVariantIcon(variant))
  }

  return (
    <ul className={s.container}>
      <li style={{ listStyleType: 'none' }}>
        <LinkMenu
          handleClick={() => handleClick(`${RouteNames.HOME}`.slice(1) as variantIconLink)}
          link={`${RouteNames.HOME}`}
          nameLink={t.sidebar.home}
          variantIcon={variantIcon}
        >
          <HomeIcon
            className={s.logo}
            fill={variantIcon === `${RouteNames.HOME}`.slice(1) ? '#397df6' : 'current'}
          />
        </LinkMenu>
      </li>
      <li style={{ listStyleType: 'none' }}>
        <CreatePostDynamic />
      </li>
      <li style={{ listStyleType: 'none' }}>
        <LinkMenu
          handleClick={() => handleClick(`${RouteNames.PROFILE}`.slice(1) as variantIconLink)}
          link={RouteNames.PROFILE + `/` + userId}
          nameLink={t.sidebar.myProfile}
          variantIcon={variantIcon}
        >
          <ProfileIcon
            className={s.logo}
            fill={variantIcon === `${RouteNames.PROFILE}`.slice(1) ? '#397df6' : 'current'}
          />
        </LinkMenu>
      </li>
      <li style={{ listStyleType: 'none' }}>
        <LinkMenu
          handleClick={() => handleClick(`${RouteNames.MESSAGE}`.slice(1) as variantIconLink)}
          link={`${RouteNames.MESSAGE}`}
          nameLink={t.sidebar.messenger}
          variantIcon={variantIcon}
        >
          <MessageIcon
            className={s.logo}
            fill={variantIcon === `${RouteNames.MESSAGE}`.slice(1) ? '#397df6' : 'current'}
          />
        </LinkMenu>
      </li>
      <li style={{ listStyleType: 'none' }}>
        <LinkMenu
          handleClick={() => handleClick(`${RouteNames.SEARCH}`.slice(1) as variantIconLink)}
          link={`${RouteNames.SEARCH}`}
          nameLink={t.sidebar.search}
          variantIcon={variantIcon}
        >
          <SearchIcon
            className={s.logo}
            fill={variantIcon === `${RouteNames.SEARCH}`.slice(1) ? '#397df6' : 'current'}
          />
        </LinkMenu>
      </li>
    </ul>
  )
}
