import SaveIcon from '@/src/assets/icons/save-icon'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Logout } from '@/src/features/auth/logout/Logout'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetProfileQuery } from '@/src/features/profile/service/profileApi'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { authUserSelector } from 'src/features/auth/authService'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { LinkMenu } from 'src/features/profile/linkMenu'
import { useAppDispatch, useAppSelector, useTranslate } from '../../hooks'
import { sidebarVariantIconSelector } from '../model/selectors/sidebarVariantIconSelector'
import { menuActions } from '../model/slice/menuSlice'
import { BaseMenu } from './baseMenu'
import s from './sidebar.module.scss'

export const Sidebar = () => {
  const user = useAppSelector(authUserSelector)
  const dispatch = useAppDispatch()
  const variantIcon = useAppSelector(sidebarVariantIconSelector)
  const { data: profile } = useGetProfileQuery(user?.userId)
  const { t } = useTranslate()

  const handleItemClick = (
    variant: 'home' | 'search' | 'profile' | 'create' | 'message' | 'logout' | 'favorites'
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
              <SaveIcon
                fill={variantIcon === 'favorites' ? '#397df6' : 'current'}
                className={s.logo}
              />
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
