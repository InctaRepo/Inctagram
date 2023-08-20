import React, { FC } from 'react'

import CreateIcon from '@/src/assets/icons/create-icon'
import HomeIcon from '@/src/assets/icons/home-icon'
import MessageIcon from '@/src/assets/icons/message-icon'
import ProfileIcon from '@/src/assets/icons/profile-icon'
import SearchIcon from '@/src/assets/icons/search-icon'
import { LinkMenu } from '@/src/components/profile/links/link-menu'
import s from '@/src/components/profile/menu-container/base-menu/base-manu.module.scss'
type BaseMenuType = {
  variantIcon?: 'home' | 'search' | 'profile' | 'create' | 'message' | 'logout' | 'favorites'
  handleClick: (
    variant: 'home' | 'search' | 'profile' | 'create' | 'message' | 'logout' | 'favorites'
  ) => void
}
export const BaseMenu: FC<BaseMenuType> = ({ variantIcon, handleClick }) => {
  return (
    <div className={s.container}>
      <div>
        <LinkMenu
          nameLink={'Home'}
          link={'home'}
          handleClick={() => handleClick('home')}
          variantIcon={variantIcon}
        >
          <HomeIcon color={variantIcon === 'home' ? '#397df6' : 'white'} />
        </LinkMenu>
      </div>
      <div>
        <LinkMenu
          nameLink={'Create'}
          link={'create'}
          handleClick={() => handleClick('create')}
          variantIcon={variantIcon}
        >
          <CreateIcon color={variantIcon === 'create' ? '#397df6' : 'white'} />
        </LinkMenu>
      </div>

      <div>
        <LinkMenu
          nameLink={'Profile'}
          link={'profile'}
          handleClick={() => handleClick('profile')}
          variantIcon={variantIcon}
        >
          <ProfileIcon color={variantIcon === 'profile' ? '#397df6' : 'white'} />
        </LinkMenu>
      </div>
      <div>
        <LinkMenu
          nameLink={'Message'}
          link={'message'}
          handleClick={() => handleClick('message')}
          variantIcon={variantIcon}
        >
          <MessageIcon color={variantIcon === 'message' ? '#397df6' : 'white'} />
        </LinkMenu>
      </div>
      <div>
        <LinkMenu
          nameLink={'Search'}
          link={'search'}
          handleClick={() => handleClick('search')}
          variantIcon={variantIcon}
        >
          <SearchIcon color={variantIcon === 'search' ? '#397df6' : 'white'} />
        </LinkMenu>
      </div>
    </div>
  )
}
