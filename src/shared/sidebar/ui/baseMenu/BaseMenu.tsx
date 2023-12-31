import React from 'react'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { CreatePostDynamic } from '@/src/features/posts/createPost'
import { HomeIcon } from '@/src/shared/assets/icons/HomeIcon'
import { MessageIcon } from '@/src/shared/assets/icons/MessageIcon'
import { ProfileIcon } from '@/src/shared/assets/icons/ProfileIcon'
import { SearchIcon } from '@/src/shared/assets/icons/SearchIcon'
import { RouteNames, variantIconLink } from '@/src/shared/const'
import { getUserId } from '@/src/shared/hoc'
import { useAppDispatch, useAppSelector, useTranslate } from '@/src/shared/hooks'
import { setVariantIcon, sidebarVariantIconSelector } from '@/src/shared/sidebar'
import s from '@/src/shared/sidebar/ui/baseMenu/baseMenu.module.scss'
import { LinkMenu } from '@/src/shared/ui/linkMenu'

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
          nameLink={t.profile.home}
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
          nameLink={t.profile.myProfile}
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
          nameLink={t.profile.messenger}
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
          nameLink={t.profile.search}
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
