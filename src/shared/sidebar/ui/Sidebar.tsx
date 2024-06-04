import { memo, useCallback, useMemo } from 'react'

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

export const Sidebar = memo(function Sidebar() {
  const profileFound = useAppSelector(profileFoundSelector)
  const dispatch = useAppDispatch()
  const variantIcon = useAppSelector(sidebarVariantIconSelector)
  const { t } = useTranslate()

  const handleClick = useCallback(
    (variant: variantIconLink) => {
      dispatch(setVariantIcon(variant))
    },
    [dispatch]
  )
  const favoritesIconFill = useMemo(() => {
    return variantIcon === `${RouteNames.FAVORITES}`.slice(1) ? '#397df6' : 'current'
  }, [variantIcon])
  const statisticsIconFill = useMemo(() => {
    return variantIcon === `${RouteNames.STATISTICS}`.slice(1) ? '#397df6' : 'current'
  }, [variantIcon])

  return (
    <nav className={s.nav}>
      {profileFound && <BaseMenu />}
      <ul className={s.containerLinks}>
        {profileFound && (
          <div className={s.container} style={{ listStyleType: 'none' }}>
            <li className={s.linkMenu}>
              <LinkMenu
                handleClick={handleClick}
                link={RouteNames.FAVORITES}
                nameLink={t.sidebar.favorites}
                variantIcon={variantIcon}
              >
                <FavoritesIcon className={s.logo} fill={favoritesIconFill} />
              </LinkMenu>
            </li>
            <li className={s.linkMenu}>
              <LinkMenu
                handleClick={handleClick}
                link={RouteNames.STATISTICS}
                nameLink={t.sidebar.statistics}
                variantIcon={variantIcon}
              >
                <StatisticsIcon className={s.logo} fill={statisticsIconFill} />
              </LinkMenu>
            </li>
          </div>
        )}

        <li style={{ listStyleType: 'none' }}>
          <Logout />
        </li>
      </ul>
    </nav>
  )
})
