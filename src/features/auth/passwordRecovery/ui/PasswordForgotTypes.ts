import { RefObject } from 'react'

import ReCAPTCHA from 'react-google-recaptcha'
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'

import { PasswordRecoveryParams } from '../service/types/passwordRecoveryParams'

export interface IFormInput {
  email: string
  recaptcha: string
}

export interface IForgotPasswordProps {
  siteKey: string
  isLoading: boolean
  isSucceed: boolean
  errors: FieldErrors<IFormInput>
  serverError: string
  recaptchaRef: RefObject<ReCAPTCHA>
  handleSubmit: UseFormHandleSubmit<IFormInput, undefined>
  register: UseFormRegister<IFormInput>
  onSubmitHandler: (data: PasswordRecoveryParams) => void
  modalHandler: () => void
  onChange: (value: any) => void
}

export interface IForgotPasswordInputProps {
  errors: FieldErrors<IFormInput>
  serverError: string
  register: UseFormRegister<IFormInput>
}
export type ServerErrorResponse = {
  data: {
    statusCode: StatusType
    messages: ResponseMessage[]
    error: string
  }
  status: number
}
export type ResponseMessage = {
  message: string
  field: string
}
export type recoveryResponse = {
  email: string
}

const status: StatusType = {
  badReqest: 400,
  unauthorized: 401,
  manyRequests: 429,
}

type StatusType = {
  badReqest: number
  unauthorized: number
  manyRequests: number
}
