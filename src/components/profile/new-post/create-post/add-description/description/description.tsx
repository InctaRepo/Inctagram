import React, { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import s from './description.module.scss'

import { useTranslate } from '@/src/assets/hooks'
import AvatarImage from '@/src/assets/images/avatar-image'
import { FormFields, triggerZodFieldError } from '@/src/common/helpers/updateZodError'
import { DescriptionFormType, descriptionSchema } from '@/src/common/schemas/description-schema'
import { ImageType } from '@/src/components/profile/new-post/create-post/create-new-post'
import { ControlledTextArea } from '@/src/components/ui/controlled/controlled-text-area'
import { Typography } from '@/src/components/ui/typography'
import { useAppSelector } from '@/src/services'
import { useAddPostMutation } from '@/src/services/posts/post-api'
import { useGetProfileQuery } from '@/src/services/profile/profile-api'
import { UserInfoType } from '@/src/services/profile/profile-api-types'

type DescriptionFormTypeProps = {
  onSubmitHandler?: (data: DescriptionFormType) => void
  defaultValue?: string | number
  isEditModalOpen?: boolean
  setIsEditModalOpen?: (isEditModalOpen: boolean) => void
  value?: string
  setValue?: (value: string) => void
  addedImages?: ImageType[]
  userData?: UserInfoType
}

export const PostDescription = ({ value, setValue, userData }: DescriptionFormTypeProps) => {
  const { t } = useTranslate()
  const [addPost] = useAddPostMutation()
  const { userId } = useAppSelector(state => state.auth.user!)

  const { data } = useGetProfileQuery(userId)
  const {
    control,
    trigger,
    formState: { touchedFields },
  } = useForm<DescriptionFormType>({
    resolver: zodResolver(descriptionSchema(t)),
    mode: 'onTouched',
    defaultValues: {
      description: '',
    },
  })

  useEffect(() => {
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
  }, [t])

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.userInfo}>
          <div>
            {data?.data?.avatar && (
              <img src={data?.data?.avatar} className={s.ava} alt={'avatar'} />
            )}
            {!data?.data?.avatar && <AvatarImage className={s.ava} />}
          </div>
          <div className={s.userName}>
            <Typography variant={'h3'} color="primary">
              {data?.data?.username}
            </Typography>
          </div>
        </div>

        <ControlledTextArea
          control={control}
          className={s.textArea}
          fullWidth={true}
          name={'description'}
          label={t.profile.addNewPost.addDescription}
          setValue={setValue}
        />
        <div className={s.counter}>
          <Typography variant={'small'} color="secondary">
            {value?.length}/500
          </Typography>
        </div>
      </div>
    </>
  )
}
