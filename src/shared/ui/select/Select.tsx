import React, {
  ComponentPropsWithoutRef,
  ElementRef,
  ReactElement,
  ReactNode,
  forwardRef,
  memo,
} from 'react'

import ChevronDown from '@/public/icon/chevronDownIcon.svg'
import { Typography } from '@/ui/typography'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import * as SelectRadix from '@radix-ui/react-select'
import { clsx } from 'clsx'

import s from '@/ui/select/select.module.scss'

export type SelectProps = {
  className?: string
  defaultImage?: ReactElement
  error?: string
  id?: string
  label?: ReactNode | string
  options: Option[]
  placeholder?: string
} & ComponentPropsWithoutRef<typeof SelectRadix.Root>

export type Option = {
  children?: ReactNode
  id?: number | string
  image?: ReactElement
  name?: string
} & ComponentPropsWithoutRef<typeof SelectRadix.Item>

export const Select = memo(
  forwardRef<ElementRef<typeof SelectRadix.Root>, SelectProps>(function Select(
    { label, options, placeholder, value, ...rest },
    ref
  ) {
    return (
      <SelectRadix.Root {...rest}>
        {label && (
          <Typography className={s.label} color={'secondary'} variant={'regular14'}>
            {label}
          </Typography>
        )}
        <SelectRadix.Trigger
          aria-label={'languages'}
          asChild
          className={s.selectBox}
          ref={ref}
          tabIndex={0}
        >
          <div>
            <SelectRadix.Value aria-label={value} className={s.value} placeholder={placeholder} />
            <SelectRadix.Icon asChild className={s.selectIcon}>
              <ChevronDown />
            </SelectRadix.Icon>
          </div>
        </SelectRadix.Trigger>

        <SelectRadix.Portal>
          <SelectRadix.Content className={s.selectContent} position={'popper'}>
            <ScrollArea.Root className={s.scrollAreaRoot} type={'auto'}>
              <SelectRadix.Viewport asChild>
                <ScrollArea.Viewport
                  className={s.scrollAreaViewport}
                  style={{ overflowY: undefined }}
                >
                  {options?.map(el => {
                    return (
                      <SelectItem
                        className={s.line}
                        image={el.image}
                        key={el.id}
                        value={el.value}
                      />
                    )
                  })}
                </ScrollArea.Viewport>
              </SelectRadix.Viewport>
              <ScrollArea.Scrollbar className={s.scrollAreaScrollbar} orientation={'vertical'}>
                <ScrollArea.Thumb className={s.scrollAreaThumb} />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
    )
  })
)

const SelectItem = forwardRef<ElementRef<typeof SelectRadix.Item>, Option>(
  ({ children, className, ...props }, ref) => {
    return (
      <SelectRadix.Item className={clsx('SelectItem', className)} {...props} ref={ref}>
        {props.image}
        <SelectRadix.ItemText>{props.value}</SelectRadix.ItemText>
      </SelectRadix.Item>
    )
  }
)
