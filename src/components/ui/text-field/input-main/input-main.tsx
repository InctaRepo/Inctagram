import React, { ChangeEvent, ComponentProps, useState } from 'react'

import s from './input-main.module.scss'

import EyeIcon from '@/src/assets/icons/eye-icon'
import EyeOffIcon from '@/src/assets/icons/eye-off-icon'
import SearchIcon from '@/src/assets/icons/search-icon'
import { Typography } from '@/src/components/ui/typography'

type UIInputPropsType = {
  value?: string
  label?: string
  errorMessage?: string
  onChangeText?: (value: string) => void
} & ComponentProps<'input'>

export const InputMain: React.FC<UIInputPropsType> = props => {
  const {
    type = 'text',
    disabled,
    onChangeText,
    errorMessage,
    label,
    placeholder,
    value,
    ...rest
  } = props

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
      <div className={`${s.label} ${disabled && s.disabledLabel}`}>{label}</div>
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
