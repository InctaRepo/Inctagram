import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { FormFields, triggerZodFieldError } from '@/shared/helpers/updateZodError'
import { useTranslate } from '@/shared/hooks'
import { PasswordsMatchForm, passwordsMatchSchema } from '@/shared/schemas/passwordsMatchSchema'
import { zodResolver } from '@hookform/resolvers/zod'

type Props = {
  onSubmitHandler: (data: PasswordsMatchForm) => void
}

export const useCreateNewPasswordForm = ({ onSubmitHandler }: Props) => {
  const { t } = useTranslate()

  const {
    control,
    formState: { errors, touchedFields },
    handleSubmit,
    trigger,
  } = useForm<PasswordsMatchForm>({
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(passwordsMatchSchema(t)),
  })

  useEffect(() => {
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
  }, [t, touchedFields, trigger])
  const submit = (data: PasswordsMatchForm) => {
    onSubmitHandler?.(data)
  }

  return { control, errors, handleSubmit, submit, t }
}
