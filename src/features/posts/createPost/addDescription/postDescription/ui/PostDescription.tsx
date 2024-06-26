import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useGetProfileQuery } from '@/entities/profile/service'
import { useUpdatePostMutation } from '@/features/posts/service/postApi'
import AvatarImage from '@/public/icon/avatarIcon.svg'
import DefaultAva from '@/public/images/avatarIcon.jpg'
import { FormFields, triggerZodFieldError } from '@/shared/helpers/updateZodError'
import { getUserId } from '@/shared/hoc'
import { useAppSelector, useTranslate } from '@/shared/hooks'
import { DescriptionForm, descriptionSchema } from '@/shared/schemas/descriptionSchema'
import { Button } from '@/ui/button'
import { ControlledTextArea } from '@/ui/controlled'
import { Typography } from '@/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import ImageAva from 'next/image'

import s from '@/features/posts/createPost/addDescription/postDescription/ui/postDescription.module.scss'

type Props = {
  description?: string
  disabledDescription?: boolean
  isDescription?: boolean
  postId?: string
  setIsEditDescriptionModalOpen?: (isEditDescriptionModalOpen: boolean) => void
  setIsEditModalOpen?: (isEditModalOpen: boolean) => void
  setValue?: (value: string) => void
  value?: string
}

export const PostDescription = ({
  description,
  disabledDescription,
  isDescription,
  postId,
  setIsEditDescriptionModalOpen,
  setIsEditModalOpen,
  setValue,
}: Props) => {
  const { t } = useTranslate()
  const [updatePost] = useUpdatePostMutation()
  const userId = useAppSelector(getUserId) as string
  const [isAvaBroken, setIsAvaBroken] = useState(false)
  const { data } = useGetProfileQuery(userId)
  const {
    control,
    formState: { touchedFields },
    getValues,
    trigger,
    watch,
  } = useForm<DescriptionForm>({
    defaultValues: {
      description: description,
    },
    mode: 'onChange',
    resolver: zodResolver(descriptionSchema(t)),
  })

  const watchDescription = watch('description')

  useEffect(() => {
    setValue?.(getValues('description'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchDescription])
  useEffect(() => {
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  const saveHandler = () => {
    if (!disabledDescription) {
      updatePost({
        description: getValues('description'),
        postId: postId,
      }).then(() => {
        if (setIsEditDescriptionModalOpen) {
          setIsEditDescriptionModalOpen(false)
          if (setIsEditModalOpen) {
            setIsEditModalOpen(true)
          }
        }
      })
    }
  }

  const errorHandler = () => {
    setIsAvaBroken(true)
  }
  const avaWithError = isAvaBroken ? DefaultAva : data?.data?.avatar!

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.description}>
          <div className={s.userInfo}>
            <div>
              {data?.data?.avatar && (
                <ImageAva
                  alt={'avatar'}
                  className={s.ava}
                  height={36}
                  onError={errorHandler}
                  priority
                  src={data?.data?.avatar ? data?.data?.avatar : avaWithError}
                  width={36}
                />
              )}
              {!data?.data?.avatar && <AvatarImage className={s.ava} />}
            </div>
            <div className={s.userName}>
              <Typography color={'primary'} variant={'h3'}>
                {data?.data?.username}
              </Typography>
            </div>
          </div>
          <ControlledTextArea
            className={s.textArea}
            control={control}
            fullWidth
            label={t.posts.createPost.addDescription}
            name={'description'}
          />

          <div className={s.counter}>
            <Typography color={'secondary'} variant={'small'}>
              {getValues('description')?.length ?? 0}/500
            </Typography>
          </div>
        </div>

        {isDescription && (
          <Button
            className={s.btn}
            disabled={disabledDescription}
            onClick={saveHandler}
            variant={'primary'}
          >
            <Typography variant={'h3'}>{t.posts.editPost.save}</Typography>
          </Button>
        )}
      </div>
    </>
  )
}
