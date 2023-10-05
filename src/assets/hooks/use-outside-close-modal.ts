import { Dispatch, MutableRefObject, useEffect } from 'react'

const useOutsideCloseModal = (
  setState: Dispatch<boolean>,
  ref: MutableRefObject<HTMLInputElement | null>,
  areYouSureRef: MutableRefObject<HTMLDivElement | null>,
  openSureModal: boolean
) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      const modal = document.getElementById('areYouSureModal')
      const condition = !modal?.contains(event.target)

      console.log(modal, !condition)

      if (
        setState &&
        ref.current &&
        !ref.current.contains(event.target) &&
        condition
        //!areYouSureRef.current?.contains(event.target)
      ) {
        setState(true)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [ref, openSureModal])

  useEffect(() => {
    const wrap = document.getElementById('titleWrap')
    const modal = document.getElementById('areYouSureModal')

    console.log(modal)
    console.log(ref.current)
  }, [])
}

export default useOutsideCloseModal
