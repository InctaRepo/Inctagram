import { useContext, useEffect } from 'react'

import { useRouter } from 'next/router'

import { RouteNames } from '@/src/common/constants/route-names'
import { ProfileSettingFormType } from '@/src/common/schemas/profile-setting-schema'
import { MenuContainer } from '@/src/components/profile/menu-container'
import { ProfileSettings } from '@/src/components/profile/profile-settings/Profile-settings'
import s from '@/src/components/profile/profile.module.scss'
import { useAppSelector } from '@/src/services'
import { authIsAuthSelector } from '@/src/services/auth/auth-selectors'
import { useUpdateProfileMutation } from '@/src/services/profile/profile-api'
import { ProfileLayout } from 'src/components/layout/profile-layout'

const Index = () => {
  const isAuth = useAppSelector(authIsAuthSelector)

  const router = useRouter()
  const [updateProfile] = useUpdateProfileMutation()

  const submit = (data: ProfileSettingFormType) => {
    updateProfile({
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      country: data.country,
      city: data.city,
      dateOfBirth: data.dateOfBirthday,
      aboutMe: data.aboutMe,
      avatar: data.avatar,
    })
  }

  useEffect(() => {
    if (!isAuth) {
      router.push(RouteNames.SIGN_IN)
    }
  }, [isAuth, router])

  return (
    isAuth && (
      <ProfileLayout>
        <div className={s.container}>
          <MenuContainer />
          <div className={s.containerInfo}>
            <ProfileSettings onSubmitHandler={submit} />
          </div>
        </div>
      </ProfileLayout>
    )
  )
}

export default Index
