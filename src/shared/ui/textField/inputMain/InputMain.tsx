import React, { ChangeEvent, ComponentProps, useState } from 'react'

import s from '@/src/shared/ui/textField/inputMain/inputMain.module.scss'
import { Typography } from '@/src/shared/ui/typography'
import EyeIcon from 'public/icon/eyeIcon.svg'
import EyeOffIcon from 'public/icon/eyeOffIcon.svg'
import SearchIcon from 'public/icon/searchIcon.svg'

type Props = {
  value?: string
  label?: string
  errorMessage?: string
  onChangeText?: (value: string) => void
  isRequired?: boolean
} & ComponentProps<'input'>

export const InputMain = ({
  type = 'text',
  disabled,
  onChangeText,
  errorMessage,
  label,
  placeholder,
  value,
  isRequired,
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
      <label className={`${s.label} ${disabled && s.disabledLabel}`}>
        {label}
        {isRequired && <span className={s.star}>*</span>}
      </label>
      <input
        type={showPassword ? 'text' : type}
        value={value}
        onChange={onchangeHandler}
        placeholder={placeholder && placeholder}
        disabled={disabled}
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
        <Typography variant={'regular14'} className={s.errorWrap}>
          {errorMessage}
        </Typography>
      )}
    </div>
  )
}
