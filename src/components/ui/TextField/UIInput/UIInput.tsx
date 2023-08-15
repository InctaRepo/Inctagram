import React, { ChangeEvent, ComponentProps, useState } from 'react'

import s from './UIInput.module.scss'

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

export const UIInput: React.FC<UIInputPropsType> = props => {
  const { type, disabled, onChangeText, errorMessage, label, placeholder, value, ...rest } = props

  const [showPass, setShowPass] = useState<'text' | 'password'>('password')

  const openClosePssHandler = () =>
    showPass === 'password' ? setShowPass('text') : setShowPass('password')

  const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeText && onChangeText(e.currentTarget.value)
  }

  const showErrorMess = errorMessage && errorMessage.length > 0

  const _type =
    type === 'text'
      ? 'text'
      : type === 'password'
      ? showPass
      : type === 'search'
      ? 'search'
      : 'text'

  return (
    <div className={s.textFieldWrap}>
      <div className={`${s.label} ${disabled && s.disabledLabel}`}>{label}</div>
      <input
        type={_type}
        value={value}
        onChange={onchangeHandler}
        placeholder={placeholder && placeholder}
        disabled={disabled}
        {...rest}
        className={`${s.textField} ${errorMessage && s.errorInput} ${disabled && s.disabledInput}`}
      />
      {type === 'password' &&
        (showPass === 'password' ? (
          <EyeIcon
            className={`${s.iconEye} ${disabled && s.disabledIconEye}`}
            onClick={openClosePssHandler}
          />
        ) : (
          <EyeOffIcon
            className={`${s.iconEye} ${disabled && s.disabledIconEye}`}
            onClick={openClosePssHandler}
          />
        ))}

      {type === 'search' && <SearchIcon className={s.searchIcon} />}
      {showErrorMess && (
        <Typography variant={'regular14'} className={s.errorWrap}>
          {errorMessage}
        </Typography>
      )}
    </div>
  )
}
