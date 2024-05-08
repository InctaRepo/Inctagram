import React, { ChangeEvent, ComponentProps, useState } from 'react'

import EyeIcon from '@/public/icon/eyeIcon.svg'
import EyeOffIcon from '@/public/icon/eyeOffIcon.svg'
import SearchIcon from '@/public/icon/searchIcon.svg'
import { Typography } from '@/ui/typography'

import s from '@/ui/textField/inputMain/inputMain.module.scss'

type Props = {
  errorMessage?: string
  isRequired?: boolean
  label?: string
  onChangeText?: (value: string) => void
  value?: string
} & ComponentProps<'input'>

export const InputMain = ({
  disabled,
  errorMessage,
  isRequired,
  label,
  name,
  onChangeText,
  placeholder,
  type = 'text',
  value,
  ...rest
}: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const onClickShowValue = () => {
    if (!disabled) {
      setShowPassword(!showPassword)
    }
  }

  const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeText && onChangeText(e.currentTarget.value)
  }

  const showErrorMess = errorMessage && errorMessage.length > 0

  return (
    <div className={s.textFieldWrap}>
      <label
        className={`${s.label} ${disabled && s.disabledLabel}`}
        data-testid={name}
        htmlFor={name}
      >
        {label}
        {isRequired && <span className={s.star}>*</span>}
      </label>
      <input
        id={name}
        onChange={onchangeHandler}
        role={name}
        type={showPassword ? 'text' : type}
        {...rest}
        className={`${s.textField} ${errorMessage && s.errorInput} ${disabled && s.disabledInput}`}
      />

      {type === 'password' && !showPassword && (
        <EyeIcon
          className={`${s.iconEye} ${disabled && s.disabledIconEye}`}
          onClick={onClickShowValue}
        />
      )}
      {type === 'password' && showPassword && (
        <EyeOffIcon
          className={`${s.iconEye} ${disabled && s.disabledIconEye}`}
          onClick={onClickShowValue}
        />
      )}

      {type === 'search' && <SearchIcon className={s.searchIcon} />}
      {showErrorMess && (
        <Typography className={s.errorWrap} variant={'regular14'}>
          {errorMessage}
        </Typography>
      )}
    </div>
  )
}
