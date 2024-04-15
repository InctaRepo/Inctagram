// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Logout } from '@/features/auth/logout'
import { FavoritesIcon } from '@/shared/assets/icons/FavoritesIcon'
import { StatisticsIcon } from '@/shared/assets/icons/StatisticsIcon'
import { RouteNames, variantIconLink } from '@/shared/const'
import { useAppDispatch, useAppSelector, useTranslate } from '@/shared/hooks'
import { profileFoundSelector, setVariantIcon, sidebarVariantIconSelector } from '@/shared/sidebar'
import { BaseMenu } from '@/shared/sidebar/ui/baseMenu'
import { LinkMenu } from '@/ui/linkMenu'

import s from '@/shared/sidebar/ui/sidebar.module.scss'

export const Sidebar = () => {
  const profileFound = useAppSelector(profileFoundSelector)
  const dispatch = useAppDispatch()
  const variantIcon = useAppSelector(sidebarVariantIconSelector)
  const { t } = useTranslate()

  const handleClick = (variant: variantIconLink) => {
    dispatch(setVariantIcon(variant))
  }

  return (
    <nav className={s.nav}>
      {profileFound && <BaseMenu />}
      <ul className={s.containerLinks}>
        {profileFound && (
          <li className={s.container} style={{ listStyleType: 'none' }}>
            <li className={s.linkMenu}>
              <LinkMenu
                handleClick={() =>
                  handleClick(`${RouteNames.FAVORITES}`.slice(1) as variantIconLink)
                }
                link={RouteNames.FAVORITES}
                nameLink={t.sidebar.favorites}
                variantIcon={variantIcon}
              >
                <FavoritesIcon
                  className={s.logo}
                  fill={variantIcon === `${RouteNames.FAVORITES}`.slice(1) ? '#397df6' : 'current'}
                />
              </LinkMenu>
            </li>
            <li className={s.linkMenu}>
              <LinkMenu
                handleClick={() =>
                  handleClick(`${RouteNames.STATISTICS}`.slice(1) as variantIconLink)
                }
                link={RouteNames.STATISTICS}
                nameLink={t.sidebar.statistics}
                variantIcon={variantIcon}
              >
                <StatisticsIcon
                  className={s.logo}
                  fill={variantIcon === `${RouteNames.STATISTICS}`.slice(1) ? '#397df6' : 'current'}
                />
              </LinkMenu>
            </li>
          </li>
        )}

        <li style={{ listStyleType: 'none' }}>
          <Logout />
        </li>
      </ul>
    </nav>
  )
}
