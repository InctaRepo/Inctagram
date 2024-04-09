import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { FormFields, triggerZodFieldError } from '@/shared/helpers/updateZodError'
import { useTranslate } from '@/shared/hooks'
import { PasswordsMatchForm, passwordsMatchSchema } from '@/shared/schemas/passwordsMatchSchema'

type Props = {
  onSubmitHandler: (data: PasswordsMatchForm) => void
}

export const useCreateNewPasswordForm = ({ onSubmitHandler }: Props) => {
  const { t } = useTranslate()

  const {
    control,
    handleSubmit,
    trigger,
    formState: { touchedFields, errors },
  } = useForm<PasswordsMatchForm>({
    resolver: zodResolver(passwordsMatchSchema(t)),
    mode: 'onTouched',
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  })

  useEffect(() => {
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
  }, [t])
  const submit = (data: PasswordsMatchForm) => {
    onSubmitHandler?.(data)
  }

  return { submit, control, handleSubmit, t, errors }
}
