// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Logout } from '@/features/auth/logout'
import { FavoritesIcon } from '@/shared/assets/icons/FavoritesIcon'
import { StatisticsIcon } from '@/shared/assets/icons/StatisticsIcon'
import { RouteNames, variantIconLink } from '@/shared/const'
import { useAppDispatch, useAppSelector, useTranslate } from '@/shared/hooks'
import { profileFoundSelector, setVariantIcon, sidebarVariantIconSelector } from '@/shared/sidebar'
import { BaseMenu } from '@/shared/sidebar/ui/baseMenu'
import s from '@/shared/sidebar/ui/sidebar.module.scss'
import { LinkMenu } from '@/ui/linkMenu'

export const Sidebar = () => {
  const profileFound = useAppSelector(profileFoundSelector)
  const dispatch = useAppDispatch()
  const variantIcon = useAppSelector(sidebarVariantIconSelector)
  const { t } = useTranslate()

  const handleClick = (variant: variantIconLink) => {
    dispatch(setVariantIcon(variant))
  }

  return (
    <menu className={s.menu}>
      {profileFound && <BaseMenu />}
      <ul className={s.containerLinks}>
        {profileFound && (
          <li style={{ listStyleType: 'none' }} className={s.container}>
            <li className={s.linkMenu}>
              <LinkMenu
                nameLink={t.sidebar.favorites}
                link={RouteNames.FAVORITES}
                handleClick={() =>
                  handleClick(`${RouteNames.FAVORITES}`.slice(1) as variantIconLink)
                }
                variantIcon={variantIcon}
              >
                <FavoritesIcon
                  fill={variantIcon === `${RouteNames.FAVORITES}`.slice(1) ? '#397df6' : 'current'}
                  className={s.logo}
                />
              </LinkMenu>
            </li>
            <li className={s.linkMenu}>
              <LinkMenu
                nameLink={t.sidebar.statistics}
                link={RouteNames.STATISTICS}
                handleClick={() =>
                  handleClick(`${RouteNames.STATISTICS}`.slice(1) as variantIconLink)
                }
                variantIcon={variantIcon}
              >
                <StatisticsIcon
                  fill={variantIcon === `${RouteNames.STATISTICS}`.slice(1) ? '#397df6' : 'current'}
                  className={s.logo}
                />
              </LinkMenu>
            </li>
          </li>
        )}

        <li style={{ listStyleType: 'none' }}>
          <Logout />
        </li>
      </ul>
    </menu>
  )
}
