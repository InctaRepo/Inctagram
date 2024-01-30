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
import s from '@/shared/sidebar/ui/baseMenu/baseMenu.module.scss'
import { LinkMenu } from '@/ui/linkMenu'

export const BaseMenu = () => {
  const { t } = useTranslate()
  const userId = useAppSelector(getUserId)
  const dispatch = useAppDispatch()
  const variantIcon = useAppSelector(sidebarVariantIconSelector)
  const handleClick = (variant: variantIconLink) => {
    dispatch(setVariantIcon(variant))
  }

  return (
    <div className={s.container}>
      <div className={s.linkMenu}>
        <LinkMenu
          nameLink={t.sidebar.home}
          link={`${RouteNames.HOME}`}
          handleClick={() => handleClick(`${RouteNames.HOME}`.slice(1) as variantIconLink)}
          variantIcon={variantIcon}
        >
          <HomeIcon
            fill={variantIcon === `${RouteNames.HOME}`.slice(1) ? '#397df6' : 'current'}
            className={s.logo}
          />
        </LinkMenu>
      </div>
      <div>
        <CreatePostDynamic />
      </div>
      <div className={s.linkMenu}>
        <LinkMenu
          nameLink={t.sidebar.myProfile}
          link={RouteNames.PROFILE + `/` + userId}
          handleClick={() => handleClick(`${RouteNames.PROFILE}`.slice(1) as variantIconLink)}
          variantIcon={variantIcon}
        >
          <ProfileIcon
            fill={variantIcon === `${RouteNames.PROFILE}`.slice(1) ? '#397df6' : 'current'}
            className={s.logo}
          />
        </LinkMenu>
      </div>
      <div className={s.linkMenu}>
        <LinkMenu
          nameLink={t.sidebar.messenger}
          link={`${RouteNames.MESSAGE}`}
          handleClick={() => handleClick(`${RouteNames.MESSAGE}`.slice(1) as variantIconLink)}
          variantIcon={variantIcon}
        >
          <MessageIcon
            fill={variantIcon === `${RouteNames.MESSAGE}`.slice(1) ? '#397df6' : 'current'}
            className={s.logo}
          />
        </LinkMenu>
      </div>
      <div>
        <LinkMenu
          nameLink={t.sidebar.search}
          link={`${RouteNames.SEARCH}`}
          handleClick={() => handleClick(`${RouteNames.SEARCH}`.slice(1) as variantIconLink)}
          variantIcon={variantIcon}
        >
          <SearchIcon
            fill={variantIcon === `${RouteNames.SEARCH}`.slice(1) ? '#397df6' : 'current'}
            className={s.logo}
          />
        </LinkMenu>
      </div>
    </div>
  )
}
