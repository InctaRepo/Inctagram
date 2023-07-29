import {FC} from 'react'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as LabelRadix from '@radix-ui/react-label'
import clsx from 'clsx'
import s from './checkbox.module.scss'
import CheckIcon from '@/src/assets/icons/check-icon';


export type CheckboxPropsType = {
  checked: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  label?: string
}

export const Checkbox: FC<CheckboxPropsType> = ({
                                                  checked,
                                                  onChange,
                                                  disabled,
                                                  label,
                                                }) => {
  const classNames = {
      container: s.container,
      buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled),
      checkbox: clsx(s.checkbox, checked && s.checked, disabled && s.disabled),
      indicator: clsx(s.indicator, disabled && s.disabled),
      label: clsx(s.label, disabled && s.disabled),
  }

  return (
      <LabelRadix.Root className={classNames.label}>
        <div className={classNames.buttonWrapper}>
          <CheckboxRadix.Root
              className={classNames.checkbox}
              checked={checked!}
              onCheckedChange={onChange!}
              disabled={disabled}
          >
            {checked && (
                <CheckboxRadix.Indicator className={classNames.indicator}>
                  <CheckIcon color={disabled ? '#D5DAE0' : 'black'} />
                </CheckboxRadix.Indicator>
            )}
          </CheckboxRadix.Root>
        </div>
        {label}
      </LabelRadix.Root>
  )
}
