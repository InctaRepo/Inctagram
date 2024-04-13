import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as LabelRadixUI from '@radix-ui/react-label'
import { clsx } from 'clsx'

import s from '@/ui/label/label.module.scss'

type Props = {
  label?: ReactNode
} & ComponentPropsWithoutRef<'label'>

export const Label = ({ children, className, label, ...rest }: Props) => {
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
