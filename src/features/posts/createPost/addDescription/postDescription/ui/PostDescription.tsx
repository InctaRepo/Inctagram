import React, { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import ImageAva from 'next/image'
import { useForm } from 'react-hook-form'

import s from '@/src/features/posts/createPost/addDescription/postDescription/ui/postDescription.module.scss'
import { useUpdatePostMutation } from '@/src/features/posts/service/postApi'
import { FormFields, triggerZodFieldError } from '@/src/shared/helpers/updateZodError'
import { getUserId } from '@/src/shared/hoc'
import { useAppSelector, useTranslate } from '@/src/shared/hooks'
import { DescriptionForm, descriptionSchema } from '@/src/shared/schemas/descriptionSchema'
import { Button } from '@/src/shared/ui/button'
import { ControlledTextArea } from '@/src/shared/ui/controlled'
import { Typography } from '@/src/shared/ui/typography'
import AvatarImage from 'public/icon/avatarIcon.svg'
import { useGetProfileQuery } from 'src/entities/profile/service'

type Props = {
  value?: string
  setValue?: (value: string) => void
  description?: string
  isDescription?: boolean
  setIsEditDescriptionModalOpen?: (isEditDescriptionModalOpen: boolean) => void
  setIsEditModalOpen?: (isEditModalOpen: boolean) => void
  postId?: string
}

export const PostDescription = ({
  value,
  setValue,
  description,
  isDescription,
  setIsEditDescriptionModalOpen,
  setIsEditModalOpen,
  postId,
}: Props) => {
  const { t } = useTranslate()
  const [updatePost] = useUpdatePostMutation()
  const userId = useAppSelector(getUserId)

  const { data } = useGetProfileQuery(userId)
  const {
    control,
    trigger,
    formState: { touchedFields },
  } = useForm<DescriptionForm>({
    resolver: zodResolver(descriptionSchema(t)),
    mode: 'onTouched',
    defaultValues: {
      description: description,
    },
  })

  useEffect(() => {
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
  }, [t])

  const saveHandler = () => {
    updatePost({
      postId: postId,
      description: value,
    }).then(() => {
      if (setIsEditDescriptionModalOpen) {
        setIsEditDescriptionModalOpen(false)
        if (setIsEditModalOpen) {
          setIsEditModalOpen(true)
        }
      }
    })
  }

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.description}>
          <div className={s.userInfo}>
            <div>
              {data?.data?.avatar && (
                <ImageAva
                  width={36}
                  height={36}
                  src={data?.data?.avatar}
                  className={s.ava}
                  alt={'avatar'}
                  priority={true}
                />
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

        {isDescription && (
          <Button variant={'primary'} className={s.btn} onClick={saveHandler}>
            <Typography variant={'h3'}>{t.profile.editPost.save}</Typography>
          </Button>
        )}
      </div>
    </>
  )
}
