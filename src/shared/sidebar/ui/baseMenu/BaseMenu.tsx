import React from 'react'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { CreatePostModal } from '@/src/features/posts/createPost/CreateNewPost'
import { HomeIcon } from '../../../assets/icons/HomeIcon'
import { MessageIcon } from '../../../assets/icons/MessageIcon'
import { ProfileIcon } from '../../../assets/icons/ProfileIcon'
import { SearchIcon } from '../../../assets/icons/SearchIcon'
import { RouteNames } from '../../../const/routeNames'
import { getUserId } from '../../../hoc/model/selectors/getUserId/getUserId'
import { useAppDispatch, useAppSelector, useTranslate } from '../../../hooks'
import { LinkMenu } from '../../../ui/linkMenu'
import { sidebarVariantIconSelector } from '../../model/selectors/sidebarVariantIconSelector'
import { setVariantIcon } from '../../model/slice/menuSlice'
import s from './baseMenu.module.scss'

export const BaseMenu = () => {
  const { t } = useTranslate()
  const userId = useAppSelector(getUserId)
  const dispatch = useAppDispatch()
  const variantIcon = useAppSelector(sidebarVariantIconSelector)
  const handleClick = (variant: string) => {
    dispatch(setVariantIcon(variant))
  }

  return (
    <div className={s.container}>
      <div className={s.linkMenu}>
        <LinkMenu
          nameLink={t.profile.home}
          link={`${RouteNames.HOME}`}
          handleClick={() => handleClick(`${RouteNames.HOME}`.slice(1))}
          variantIcon={variantIcon}
        >
          <HomeIcon
            fill={variantIcon === `${RouteNames.HOME}`.slice(1) ? '#397df6' : 'current'}
            className={s.logo}
          />
        </LinkMenu>
      </div>
      <div>
        <CreatePostModal />
      </div>
      <div className={s.linkMenu}>
        <LinkMenu
          nameLink={t.profile.myProfile}
          link={RouteNames.PROFILE + `/` + userId}
          handleClick={() => handleClick(`${RouteNames.PROFILE}`.slice(1))}
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
          handleClick={() => handleClick(`${RouteNames.MESSAGE}`.slice(1))}
          variantIcon={variantIcon}
        >
          <MessageIcon
            fill={variantIcon === `${RouteNames.MESSAGE}`.slice(1) ? '#397df6' : 'current'}
            className={s.logo}
          />
        </LinkMenu>
      </div>
      <div className={s.linkMenu}>
        <LinkMenu
          nameLink={t.profile.search}
          link={`${RouteNames.SEARCH}`}
          handleClick={() => handleClick(`${RouteNames.SEARCH}`.slice(1))}
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
