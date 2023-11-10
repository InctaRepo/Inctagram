import s from './menu-container.module.scss'

import { useTranslate } from '@/src/assets/hooks/use-translate'
import SaveIcon from '@/src/assets/icons/save-icon'
import { Logout } from '@/src/components/auth/logout/logout'
import { LinkMenu } from '@/src/components/profile/links'
import { BaseMenu } from '@/src/components/profile/menu-container/base-menu'
import { useAppDispatch, useAppSelector } from '@/src/services'
import { menuSelector } from '@/src/services/menu/menu-selectors'
import { menuActions } from '@/src/services/menu/menu-slice'
import { useGetProfileQuery } from '@/src/services/profile/profile-api'

export const MenuContainer = () => {
  const { userId } = useAppSelector(state => state.auth.user!)
  const dispatch = useAppDispatch()
  const variantIcon = useAppSelector(menuSelector)
  const { data: profile } = useGetProfileQuery(userId)
  // const [variantIcon, setVariantIcon] = useState<
  //   'home' | 'search' | 'my-profile' | 'create' | 'message' | 'logout' | 'favorites'
  // >()
  const { t } = useTranslate()

  const handleItemClick = (
    variant: 'home' | 'search' | 'my-profile' | 'create' | 'message' | 'logout' | 'favorites'
  ) => {
    dispatch(menuActions.setVariantIcon(variant))
  }

  return (
    <div className={s.container}>
      {profile?.data && <BaseMenu variantIcon={variantIcon} handleClick={handleItemClick} />}
      <div className={s.containerLinks}>
        {profile?.data && (
          <div className={s.favorites}>
            <LinkMenu
              nameLink={t.profile.favorites}
              link={'favorites'}
              handleClick={() => handleItemClick('favorites')}
              variantIcon={variantIcon}
            >
              <SaveIcon color={variantIcon === 'favorites' ? '#397df6' : 'white'} />
            </LinkMenu>
          </div>
        )}

        <div className={s.logout}>
          <Logout />
        </div>
      </div>
    </div>
  )
}
