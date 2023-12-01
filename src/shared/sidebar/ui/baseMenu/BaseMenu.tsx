import React, { FC } from 'react'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { CreatePostModal } from '@/src/features/posts/createPost/CreateNewPost'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { LinkMenu } from '@/src/features/profile/linkMenu'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { HomeIcon } from '../../../assets/icons/HomeIcon'
import { MessageIcon } from '../../../assets/icons/MessageIcon'
import { ProfileIcon } from '../../../assets/icons/ProfileIcon'
import { SearchIcon } from '../../../assets/icons/SearchIcon'
import { RouteNames } from '../../../const/routeNames'
import { variantIconLink } from '../../../const/variantIconLink'
import { getUserId } from '../../../hoc/model/selectors/getUserId/getUserId'
import { useAppSelector, useTranslate } from '../../../hooks'
import s from './baseMenu.module.scss'

type Props = {
  variantIcon: variantIconLink
  handleClick: (variant: string) => void
}
export const BaseMenu: FC<Props> = ({ variantIcon, handleClick }) => {
  const { t } = useTranslate()
  const userId = useAppSelector(getUserId)

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
        <CreatePostModal variantIcon={variantIcon} />
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
