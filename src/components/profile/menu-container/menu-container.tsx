import { useState } from 'react'

import LogoutIcon from '@/src/assets/icons/LogoutIcon'
import SaveIcon from '@/src/assets/icons/save-icon'
import { LinkMenu } from '@/src/components/profile/links/link-menu'
import { BaseMenu } from '@/src/components/profile/menu-container/base-menu/base-menu'
import s from '@/src/components/profile/menu-container/menu-container.module.scss'
export const MenuContainer = () => {
  const [variantIcon, setVariantIcon] = useState<
    'home' | 'search' | 'profile' | 'create' | 'message' | 'logout' | 'favorites'
  >()
  const handleItemClick = (
    variant: 'home' | 'search' | 'profile' | 'create' | 'message' | 'logout' | 'favorites'
  ) => {
    setVariantIcon(variant)
  }

  return (
    <div className={s.container}>
      <BaseMenu variantIcon={variantIcon} handleClick={handleItemClick} />
      <div className={s.containerLinks}>
        <div className={s.save}>
          <LinkMenu
            nameLink={'Favorites'}
            link={'favorites'}
            handleClick={() => handleItemClick('favorites')}
            variantIcon={variantIcon}
          >
            <SaveIcon color={variantIcon === 'favorites' ? '#397df6' : 'white'} />
          </LinkMenu>
        </div>

        <div className={s.logout}>
          <LinkMenu
            nameLink={'Logout'}
            link={'logout'}
            handleClick={() => handleItemClick('logout')}
            variantIcon={variantIcon}
          >
            <LogoutIcon color={variantIcon === 'logout' ? '#397df6' : 'white'} />
          </LinkMenu>
        </div>
      </div>
    </div>
  )
}
