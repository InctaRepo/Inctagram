// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Logout } from '@/src/features/auth/logout'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetProfileQuery } from '@/src/features/profile/service/profileApi'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { FavoritesIcon } from '../../assets/icons/FavoritesIcon'
import { StatisticsIcon } from '../../assets/icons/StatisticsIcon'
import { RouteNames } from '../../const/routeNames'
import { getUserId } from '../../hoc/model/selectors/getUserId/getUserId'
import { useAppDispatch, useAppSelector, useTranslate } from '../../hooks'
import { LinkMenu } from '../../ui/linkMenu'
import { sidebarVariantIconSelector } from '../model/selectors/sidebarVariantIconSelector'
import { setVariantIcon } from '../model/slice/menuSlice'
import { BaseMenu } from './baseMenu'
import s from './sidebar.module.scss'

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
          <Logout variantIcon={variantIcon} handleClick={handleItemClick} />
        </div>
      </div>
    </div>
  )
}
