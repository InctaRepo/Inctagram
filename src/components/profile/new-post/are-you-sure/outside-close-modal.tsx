import { Dispatch, FC, ReactNode, useRef } from 'react'

import useOutsideCloseModal from '@/src/assets/hooks/use-outside-close-modal'

interface IOutsideCloseModalProps {
  setState: Dispatch<boolean>
  addClass?: string
  children: ReactNode
}

const OutsideCloseModal: FC<IOutsideCloseModalProps> = ({ setState, children, addClass }) => {
  const wrapperRef = useRef(null)

  useOutsideCloseModal(setState, wrapperRef)
  console.log('1')

  return (
    <div className={addClass} ref={wrapperRef}>
      {children ? children : null}
    </div>
  )
}

export default OutsideCloseModal
