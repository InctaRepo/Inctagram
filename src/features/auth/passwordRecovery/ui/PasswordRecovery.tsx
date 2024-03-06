import React, { useRef, useState, PropsWithChildren, FC } from 'react'

import ReCAPTCHA from 'react-google-recaptcha'
import { SubmitHandler, useForm } from 'react-hook-form'

import { PrintModalType } from '../../signUp/service/types/signUpParams'

import { IFormInput, ServerErrorResponse } from './PasswordForgotTypes'

import { usePasswordRecoveryMutation } from '@/features/auth/passwordRecovery/service/passwordRecovery'
import { PasswordRecoveryParams } from '@/features/auth/passwordRecovery/service/types/passwordRecoveryParams'
import { PasswordRecoveryForm } from '@/features/auth/passwordRecovery/ui/passwordRecoveryForm'
import s from '@/features/auth/passwordRecovery/ui/passwordRecoveryForm/passwordRecoveryForm.module.scss'
import { useTranslate } from '@/shared/hooks'
import { Button } from '@/ui/button/Button'
import { Modal } from '@/ui/modal'
import { Typography } from '@/ui/typography'

export const PasswordRecoveryFC: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [PasswordRecoveryMutation, { isLoading }] = usePasswordRecoveryMutation()
  const [serverError, setServerError] = useState('')
  const [recaptchaCode, setRecaptchaCode] = useState('')
  const [isSucceed, setIsSucceed] = useState(false)
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY!
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IFormInput>({ mode: 'onSubmit' })
  const onChange = (value: string) => {
    setRecaptchaCode(value)
    setServerError('')
    clearErrors()
  }
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const { t } = useTranslate()
  const [email, setEmail] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const modalHandler = () => {
    setOpenModal(!openModal)
  }
  const [printModal, setPrintModal] = useState<PrintModalType>({ title: 'null', content: 'null' })

  const submit = (data: PasswordRecoveryParams) => {
    setEmail(data.email.length > 30 ? data.email.slice(0, 30) + '...' : data.email)
  }

  console.log(siteKey)

  return (
    <>
      <PasswordRecoveryForm
        siteKey={siteKey}
        isLoading={isLoading}
        isSucceed={isSucceed}
        errors={errors}
        serverError={serverError}
        recaptchaRef={recaptchaRef}
        handleSubmit={handleSubmit}
        register={register}
        onSubmitHandler={submit}
        onChange={onChange}
        modalHandler={modalHandler}
      />
      <Modal
        className={s.modal}
        modalWidth={'sm'}
        open={openModal}
        title={t.auth.emailSent}
        onAction={modalHandler}
        onCancel={modalHandler}
        onClose={modalHandler}
      >
        <Typography variant="regular16">{t.auth.emailConfirm(email)}</Typography>
        <div className={s.buttonOkWrapper}>
          <Button className={s.buttonOk} onClick={modalHandler} type="button">
            {t.auth.ok}
          </Button>
        </div>
      </Modal>
    </>
  )
}
