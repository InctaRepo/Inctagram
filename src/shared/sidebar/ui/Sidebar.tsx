// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Logout } from '@/src/features/auth/logout'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetProfileQuery } from '@/src/features/profile/service/profileApi'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { getAuthUser } from 'src/features/auth/authService'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { LinkMenu } from 'src/features/profile/linkMenu'
import { FavoritesIcon } from '../../assets/icons/FavoritesIcon'
import { StatisticsIcon } from '../../assets/icons/StatisticsIcon'
import { RouteNames } from '../../const/routeNames'
import { useAppDispatch, useAppSelector, useTranslate } from '../../hooks'
import { sidebarVariantIconSelector } from '../model/selectors/sidebarVariantIconSelector'
import { menuActions } from '../model/slice/menuSlice'
import { BaseMenu } from './baseMenu'
import s from './sidebar.module.scss'

export const Sidebar = () => {
  const user = useAppSelector(getAuthUser)
  const dispatch = useAppDispatch()
  const variantIcon = useAppSelector(sidebarVariantIconSelector)
  const { data: profile } = useGetProfileQuery(user?.userId)
  const { t } = useTranslate()

  const handleItemClick = (variant: string) => {
    dispatch(menuActions.setVariantIcon(variant))
  }

  return (
    <div className={s.container}>
      {profile?.data && <BaseMenu variantIcon={variantIcon} handleClick={handleItemClick} />}
      <div className={s.containerLinks}>
        {profile?.data && (
          <div className={s.favStat}>
            <div className={s.favorites}>
              <LinkMenu
                nameLink={t.profile.favorites}
                link={`${RouteNames.FAVORITES}`}
                handleClick={() => handleItemClick(`${RouteNames.FAVORITES}`.slice(1))}
                variantIcon={variantIcon}
              >
                <FavoritesIcon
                  fill={variantIcon === `${RouteNames.FAVORITES}`.slice(1) ? '#397df6' : 'current'}
                  className={s.logo}
                />
              </LinkMenu>
            </div>
            <div className={s.favorites}>
              <LinkMenu
                nameLink={t.profile.statistics}
                link={`${RouteNames.STATISTICS}`}
                handleClick={() => handleItemClick(`${RouteNames.STATISTICS}`.slice(1))}
                variantIcon={variantIcon}
              >
                <StatisticsIcon
                  fill={variantIcon === `${RouteNames.STATISTICS}`.slice(1) ? '#397df6' : 'current'}
                  className={s.logo}
                />
              </LinkMenu>
            </div>
          </div>
        )}

        <div className={s.logout}>
          <Logout />
        </div>
      </div>
    </div>
  )
}
