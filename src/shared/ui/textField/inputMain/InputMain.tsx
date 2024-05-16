import React, {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useState,
} from 'react'

import EyeIcon from '@/public/icon/eyeIcon.svg'
import EyeOffIcon from '@/public/icon/eyeOffIcon.svg'
import SearchIcon from '@/public/icon/searchIcon.svg'
import { Typography } from '@/ui/typography'

import s from '@/ui/textField/inputMain/inputMain.module.scss'

type Props = {
  error?: string
  id?: string
  isRequired?: boolean
  label?: string
  onChangeText?: (value: string) => void
} & ComponentPropsWithoutRef<'input'>

export const InputMain = forwardRef<ElementRef<'input'>, Props>(
  ({ disabled, error, id, isRequired, label, name, onChangeText, type = 'text', ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    const onClickShowValue = () => {
      if (!disabled) {
        setShowPassword(!showPassword)
      }
    }

    const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChangeText?.(e.currentTarget.value)
    }

    const showErrorMess = error && error.length > 0

    return (
      <div className={s.textFieldWrap}>
        <label
          className={`${s.label} ${disabled && s.disabledLabel}`}
          data-testid={name}
          htmlFor={id}
        >
          {label}
          {isRequired && <span className={s.star}>*</span>}
        </label>
        <input
          id={id}
          onChange={onchangeHandler}
          ref={ref}
          role={name}
          type={showPassword ? 'text' : type}
          {...rest}
          className={`${s.textField} ${error && s.errorInput} ${disabled && s.disabledInput}`}
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
            {error}
          </Typography>
        )}
      </div>
    )
  }
)
