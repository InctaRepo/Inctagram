import { forwardRef } from 'react'

import s from './swiperBtn.module.scss'

interface ArrowButtonProps extends React.RefAttributes<HTMLButtonElement> {
  onClick: () => void
  icon?: any
  direction?: 'left' | 'right'
}

export const SwiperBtn = forwardRef<HTMLButtonElement, ArrowButtonProps>(
  ({ onClick, icon: Icon, direction, ...props }, ref) => {
    return (
      <button ref={ref} onClick={onClick} className={s.btn} {...props}>
        {Icon && <Icon direction={direction} />}
      </button>
    )
  }
)
