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
import { useAddPostMutation } from '@/src/services/posts/post-api'

type DescriptionFormTypeProps = {
  onSubmitHandler?: (data: DescriptionFormType) => void
  defaultValue?: string | number
  isEditModalOpen?: boolean
  setIsEditModalOpen?: (isEditModalOpen: boolean) => void
  value?: string
  setValue?: (value: string) => void
  addedImages?: ImageType[]
}

export const PostDescription = ({ value, setValue }: DescriptionFormTypeProps) => {
  const { t } = useTranslate()
  const [addPost] = useAddPostMutation()

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
            <AvatarImage className={s.ava} />
          </div>
          <div className={s.userName}>
            <Typography variant={'h3'} color="primary">
              User Name
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
