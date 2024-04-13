import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { FormFields, triggerZodFieldError } from '@/shared/helpers/updateZodError'
import { useTranslate } from '@/shared/hooks'
import { LoginFormType, createLoginSchema } from '@/shared/schemas/createLoginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

type Props = {
  errorServer?: string
  onSubmitHandler?: (data: LoginFormType) => void
}
export const useLoginForm = ({ errorServer, onSubmitHandler }: Props) => {
  const { t } = useTranslate()
  const router = useRouter()

  const {
    control,
    formState: { errors, touchedFields },
    handleSubmit,
    setError,
    trigger,
  } = useForm<LoginFormType>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(createLoginSchema(t)),
  })

  useEffect(() => {
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  useEffect(() => {
    setError('password', { message: errorServer, type: 'custom' })
    setError('email', { message: errorServer, type: 'custom' })
  }, [errorServer, onSubmitHandler, setError])

  const submitData = (data: LoginFormType) => {
    onSubmitHandler?.(data)
  }

  return { control, errors, handleSubmit, router, submitData, t }
}
