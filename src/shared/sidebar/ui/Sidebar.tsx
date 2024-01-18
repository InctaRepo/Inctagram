// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Logout } from '@/src/features/auth/logout'
import { FavoritesIcon } from '@/src/shared/assets/icons/FavoritesIcon'
import { StatisticsIcon } from '@/src/shared/assets/icons/StatisticsIcon'
import { RouteNames, variantIconLink } from '@/src/shared/const'
import { useAppDispatch, useAppSelector, useTranslate } from '@/src/shared/hooks'
import {
  profileFoundSelector,
  setVariantIcon,
  sidebarVariantIconSelector,
} from '@/src/shared/sidebar'
import { BaseMenu } from '@/src/shared/sidebar/ui/baseMenu'
import s from '@/src/shared/sidebar/ui/sidebar.module.scss'
import { LinkMenu } from '@/src/shared/ui/linkMenu'

export const Sidebar = () => {
  const profileFound = useAppSelector(profileFoundSelector)
  const dispatch = useAppDispatch()
  const variantIcon = useAppSelector(sidebarVariantIconSelector)
  const { t } = useTranslate()

  const handleItemClick = (variant: variantIconLink) => {
    dispatch(setVariantIcon(variant))
  }

  return (
    <div className={s.container}>
      {profileFound && <BaseMenu />}
      <div className={s.containerLinks}>
        {profileFound && (
          <div>
            <div className={s.favorites}>
              <LinkMenu
                nameLink={t.profile.favorites}
                link={`${RouteNames.FAVORITES}`}
                handleClick={() =>
                  handleItemClick(`${RouteNames.FAVORITES}`.slice(1) as variantIconLink)
                }
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
                handleClick={() =>
                  handleItemClick(`${RouteNames.STATISTICS}`.slice(1) as variantIconLink)
                }
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
