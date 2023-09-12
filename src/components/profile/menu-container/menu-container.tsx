import { useState } from 'react'

import { useTranslate } from '@/src/assets/hooks/use-translate'
import LogoutIcon from '@/src/assets/icons/logout-icon'
import SaveIcon from '@/src/assets/icons/save-icon'
import { LinkMenu } from '@/src/components/profile/links'
import { BaseMenu } from '@/src/components/profile/menu-container/base-menu'
import s from '@/src/components/profile/menu-container/menu-container.module.scss'
import { useAppDispatch } from '@/src/services'
import { useLogoutUserMutation } from '@/src/services/auth/auth-api'
import { authActions } from '@/src/services/auth/auth-slice'

export const MenuContainer = () => {
  const dispatch = useAppDispatch()
  const [logoutUser] = useLogoutUserMutation()
  const logoutHandler = () => {
    // logoutUser()
    // TODO when CORS will be fixed ( query for logout + use useAppDispatch)
    dispatch(authActions.logout())
  }
  const [variantIcon, setVariantIcon] = useState<
    'home' | 'search' | 'profile' | 'create' | 'message' | 'logout' | 'favorites'
  >()
  const { t } = useTranslate()

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
            {/*TODO modal, styles*/}
            <button onClick={logoutHandler}>logout test</button>
            <LogoutIcon color={variantIcon === 'logout' ? '#397df6' : 'white'} />
          </LinkMenu>
        </div>
      </div>
    </div>
  )
}
