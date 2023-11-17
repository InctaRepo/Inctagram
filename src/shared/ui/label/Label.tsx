import * as LabelRadixUI from '@radix-ui/react-label'
import { clsx } from 'clsx'
import { ComponentPropsWithoutRef, ReactNode } from 'react'
import s from './label.module.scss'

type Props = {
  label?: ReactNode
} & ComponentPropsWithoutRef<'label'>

export const Label = ({ label, children, className, ...rest }: Props) => {
  const classNames = {
    label: clsx(s.label, className),
  }

  return (
    <LabelRadixUI.Root {...rest}>
      {label && <div className={classNames.label}>{label}</div>}
      {children}
    </LabelRadixUI.Root>
  )
}
