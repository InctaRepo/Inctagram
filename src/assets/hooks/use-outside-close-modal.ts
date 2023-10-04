import { Dispatch, MutableRefObject, useEffect } from 'react'

const useOutsideCloseModal = (
  setState: Dispatch<boolean>,
  ref: MutableRefObject<HTMLInputElement | null>
) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (setState && ref.current && !ref.current.contains(event.target)) {
        setState(true)
        event.stopPropagation()
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [ref])
}

export default useOutsideCloseModal
