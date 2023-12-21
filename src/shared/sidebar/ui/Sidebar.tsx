import s from './sidebar.module.scss'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Logout } from '@/src/features/auth/logout'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetProfileQuery } from '@/src/features/profile/service'
import { FavoritesIcon } from '@/src/shared/assets/icons/FavoritesIcon'
import { StatisticsIcon } from '@/src/shared/assets/icons/StatisticsIcon'
import { RouteNames } from '@/src/shared/const/routeNames'
import { getUserId } from '@/src/shared/hoc'
import { useAppDispatch, useAppSelector, useTranslate } from '@/src/shared/hooks'
import { setVariantIcon, sidebarVariantIconSelector } from '@/src/shared/sidebar'
import { BaseMenu } from '@/src/shared/sidebar/ui/baseMenu'
import { LinkMenu } from '@/src/shared/ui/linkMenu'

export const Sidebar = () => {
  const userId = useAppSelector(getUserId)
  const dispatch = useAppDispatch()
  const variantIcon = useAppSelector(sidebarVariantIconSelector)
  const { data: profile } = useGetProfileQuery(userId)
  const { t } = useTranslate()

  const handleItemClick = (variant: string) => {
    dispatch(setVariantIcon(variant))
  }

  return (
    <div className={s.container}>
      {profile?.data && <BaseMenu />}
      <div className={s.containerLinks}>
        {profile?.data && (
          <div>
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

        <div>
          <Logout />
        </div>
      </div>
    </div>
  )
}
