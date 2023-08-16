import { useState } from 'react'

import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import s from './forgotPassword.module.scss'

import { alertToast } from '@/src/components/ui/alert'
import { Button } from '@/src/components/ui/button/button'
import { Card } from '@/src/components/ui/card-temporary'
import { ControlledTextField } from '@/src/components/ui/controlled'
import { Recaptcha } from '@/src/components/ui/recaptcha/Recaptcha'
import { Typography } from '@/src/components/ui/typography/typography'

interface Props {
  primary?: boolean | undefined
}

interface FormDataType {
  email?: string
}

export const ForgotPassword: React.FC<Props> = () => {
  const [mode, setMode] = useState('mode--primary')
  const router = useRouter()

  const { control, handleSubmit } = useForm<FormDataType>({
    mode: 'onTouched',
    defaultValues: {
      email: '',
    },
  })

  const submitData = (data: FormDataType) => {
    alertToast(false, JSON.stringify(data))
    setMode('mode--secondary')
  }

  return (
    <div className={s[mode]}>
      <Card className={s.main}>
        <Typography variant="h1" className={s.title}>
          Forgot Password
        </Typography>
        <form onSubmit={handleSubmit(submitData)} className={s.form}>
          <ControlledTextField
            control={control}
            name="email"
            label="Email"
            placeholder="Epam@epam.com"
            className={s.input}
          />
          <Typography variant="regular14" className={s.hint}>
            Enter your email address and we will send you further instructions
          </Typography>
          <Button variant="primary" className={s.submit}>
            <Typography variant="h3">Send Link</Typography>
          </Button>
          <Typography variant="regular14" className={s.answer}>
            The link has been sent by email.
            <br />
            If you don’t receive an email send link again
          </Typography>
          <Button variant="primary" className={s.repeat}>
            <Typography variant="h3">Send Link Again</Typography>
          </Button>
          <Button
            variant="text"
            className={`${s.back} ${s.cancel}`}
            onClick={() => router.push('/')}
          >
            <Typography variant="h3">Back to Sign In</Typography>
          </Button>
          <Recaptcha primary className={s.recaptcha} />
        </form>
      </Card>
    </div>
  )
}
