import { Dispatch, FC, MutableRefObject, ReactNode, useRef } from 'react'

import useOutsideCloseModal from '@/src/assets/hooks/use-outside-close-modal'

interface IOutsideCloseModalProps {
  setState: Dispatch<boolean>
  addClass?: string
  children: ReactNode
  areYouSureRef: MutableRefObject<HTMLDivElement | null>
  openSureModal: boolean
}

const OutsideCloseModal = ({
  openSureModal,
  setState,
  children,
  areYouSureRef,
  addClass,
}: IOutsideCloseModalProps) => {
  const wrapperRef = useRef(null)

  useOutsideCloseModal(setState, wrapperRef, areYouSureRef, openSureModal)

  return (
    <div className={addClass} ref={wrapperRef}>
      {children}
    </div>
  )
}

export default OutsideCloseModal