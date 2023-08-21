import { useState } from 'react'

import { useTranslation } from '@/src/assets/hooks/useTranslation'
import LogoutIcon from '@/src/assets/icons/LogoutIcon'
import SaveIcon from '@/src/assets/icons/save-icon'
import { LinkMenu } from '@/src/components/profile/links'
import { BaseMenu } from '@/src/components/profile/menu-container/base-menu'
import s from '@/src/components/profile/menu-container/menu-container.module.scss'
export const MenuContainer = () => {
  const [variantIcon, setVariantIcon] = useState<
    'home' | 'search' | 'profile' | 'create' | 'message' | 'logout' | 'favorites'
  >()
  const { t } = useTranslation()

  const handleItemClick = (
    variant: 'home' | 'search' | 'profile' | 'create' | 'message' | 'logout' | 'favorites'
  ) => {
    setVariantIcon(variant)
  }

  return (
    <div className={s.container}>
      <BaseMenu variantIcon={variantIcon} handleClick={handleItemClick} />
      <div className={s.containerLinks}>
        <div>
          <LinkMenu
            nameLink={t.profile.favorites}
            link={'favorites'}
            handleClick={() => handleItemClick('favorites')}
            variantIcon={variantIcon}
          >
            <SaveIcon color={variantIcon === 'favorites' ? '#397df6' : 'white'} />
          </LinkMenu>
        </div>

        <div className={s.logout}>
          <LinkMenu
            nameLink={t.profile.logout}
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
