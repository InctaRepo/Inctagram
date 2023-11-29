import { zodResolver } from '@hookform/resolvers/zod'
import ImageAva from 'next/image'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import AvatarImage from '@/src/assets/images/avatar-image'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { useAddPostMutation, useUpdatePostMutation } from '@/src/features/posts'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative,@conarti/feature-sliced/layers-slices
import { useGetProfileQuery } from '@/src/features/profile/service/profileApi'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative,@conarti/feature-sliced/layers-slices
import { UserInfo } from '@/src/features/profile/service/profileApiTypes'
import { FormFields, triggerZodFieldError } from '@/src/shared/helpers/updateZodError'
import { getUserId } from '@/src/shared/hoc/model/selectors/getUserId/getUserId'
import { useAppSelector, useTranslate } from '@/src/shared/hooks'
import { DescriptionForm, descriptionSchema } from '@/src/shared/schemas/descriptionSchema'
import { Button } from '@/src/shared/ui/button'
import { ControlledTextArea } from '@/src/shared/ui/controlled/ControlledTextArea'
import { Typography } from '@/src/shared/ui/typography'
import { Image } from '../../../CreateNewPost'
import s from './postDescription.module.scss'

type Props = {
  id?: string
  onSubmitHandler?: (data: DescriptionForm) => void
  defaultValue?: string | number
  isEditModalOpen?: boolean
  setIsEditModalOpen?: (isEditModalOpen: boolean) => void
  setIsEditDescriptionModalOpen?: (isEditDescriptionModalOpen: boolean) => void
  value?: string
  setValue?: (value: string) => void
  addedImages?: Image[]
  userData?: UserInfo
  description?: string
  isDescription?: boolean
}

export const PostDescription = ({
  value,
  setValue,
  userData,
  description,
  isDescription,
  id,
  setIsEditDescriptionModalOpen,
  setIsEditModalOpen,
}: Props) => {
  const { t } = useTranslate()
  const [addPost] = useAddPostMutation()
  const [updatePost, { isSuccess: isSuccessUpdate }] = useUpdatePostMutation()
  const userId = useAppSelector(getUserId)
  const postId = id

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
      postId: id,
      description: value,
    }).then(() => {
      if (setIsEditDescriptionModalOpen) {
        setIsEditDescriptionModalOpen(false)
        if (setIsEditModalOpen) {
          setIsEditModalOpen(false)
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
