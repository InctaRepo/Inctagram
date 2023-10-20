import React, { useEffect, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import s from './description.module.scss'

import { useTranslate } from '@/src/assets/hooks'
import AvatarImage from '@/src/assets/images/avatar-image'
import { FormFields, triggerZodFieldError } from '@/src/common/helpers/updateZodError'
import { DescriptionFormType, descriptionSchema } from '@/src/common/schemas/description-schema'
import { ControlledTextArea } from '@/src/components/ui/controlled/controlled-text-area'
import { Typography } from '@/src/components/ui/typography'

type DescriptionFormTypeProps = {
  onSubmitHandler?: (data: DescriptionFormType) => void
  defaultValue?: string | number
  isEditModalOpen?: boolean
  setIsEditModalOpen?: (isEditModalOpen: boolean) => void
}

export const PostDescription = ({ onSubmitHandler, defaultValue }: DescriptionFormTypeProps) => {
  const { t } = useTranslate()
  const [value, setValue] = useState('')

  const {
    control,
    handleSubmit,
    formState,
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

  const onSubmit = handleSubmit((data: DescriptionFormType) => {
    onSubmitHandler?.(data)
  })

  return (
    <>
      <div className={s.wrapper} onSubmit={onSubmit}>
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
            {value.length}/500
          </Typography>
        </div>
      </div>
    </>
  )
}
