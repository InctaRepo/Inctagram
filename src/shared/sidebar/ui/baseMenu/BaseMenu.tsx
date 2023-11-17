import React, { FC } from 'react'
import HomeIcon from '@/src/assets/icons/home-icon'
import MessageIcon from '@/src/assets/icons/message-icon'
import ProfileIcon from '@/src/assets/icons/profile-icon'
import SearchIcon from '@/src/assets/icons/search-icon'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { CreatePostModal } from '@/src/features/profile/newPost/createPost/CreateNewPost'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { LinkMenu } from 'src/features/profile/linkMenu'
import { useTranslate } from '../../../hooks'
import s from './baseMenu.module.scss'

type Props = {
  variantIcon?: 'home' | 'search' | 'my-profile' | 'create' | 'message' | 'logout' | 'favorites'
  handleClick: (
    variant: 'home' | 'search' | 'my-profile' | 'create' | 'message' | 'logout' | 'favorites'
  ) => void
}
export const BaseMenu: FC<Props> = ({ variantIcon, handleClick }) => {
  const { t } = useTranslate()

  return (
    <div className={s.container}>
      <div className={s.linkMenu}>
        <LinkMenu
          nameLink={t.profile.home}
          link={'home'}
          handleClick={() => handleClick('home')}
          variantIcon={variantIcon}
        >
          <HomeIcon fill={variantIcon === 'home' ? '#397df6' : 'current'} className={s.logo} />
        </LinkMenu>
      </div>
      <div>
        <CreatePostModal variantIcon={variantIcon} />
      </div>

      <div className={s.linkMenu}>
        <LinkMenu
          nameLink={t.profile.myProfile}
          link={'my-profile'}
          handleClick={() => handleClick('my-profile')}
          variantIcon={variantIcon}
        >
          <ProfileIcon
            fill={variantIcon === 'my-profile' ? '#397df6' : 'current'}
            className={s.logo}
          />
        </LinkMenu>
      </div>
      <div className={s.linkMenu}>
        <LinkMenu
          nameLink={t.profile.messenger}
          link={'message'}
          handleClick={() => handleClick('message')}
          variantIcon={variantIcon}
        >
          <MessageIcon
            fill={variantIcon === 'message' ? '#397df6' : 'current'}
            className={s.logo}
          />
        </LinkMenu>
      </div>
      <div className={s.linkMenu}>
        <LinkMenu
          nameLink={t.profile.search}
          link={'search'}
          handleClick={() => handleClick('search')}
          variantIcon={variantIcon}
        >
          <SearchIcon fill={variantIcon === 'search' ? '#397df6' : 'current'} className={s.logo} />
        </LinkMenu>
      </div>
    </div>
  )
}
