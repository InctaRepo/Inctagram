import React, { ChangeEvent, MutableRefObject, useEffect, useRef, useState } from 'react'

import ZoomIcon from '@/public/icon/zoomIcon.svg'

import s from '@/features/posts/createPost/editPhoto/zoom/Zoom.module.scss'

type Props = {
  className?: string
  setZoom: (zoom: number) => void
  zoom: number
}

export const Zoom = ({ setZoom, zoom }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const zoomRef = useRef() as MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (zoomRef.current && !e.composedPath().includes(zoomRef.current)) {
        setIsOpen(false)
      }
    }

    document.body.addEventListener('click', handleClickOutside)

    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])

  const onZoomChange = (event: ChangeEvent<HTMLInputElement>) => {
    const scale = parseFloat(event.target.value)

    setZoom(scale)
  }

  return (
    <div ref={zoomRef}>
      <div className={s.zoomBtn} onClick={() => setIsOpen(current => !current)}>
        <ZoomIcon alt={'zoom'} className={isOpen ? s.blueActive : s.blue} height={24} width={24} />
      </div>

      {isOpen && (
        <div className={s.slider}>
          <input
            className={s.range}
            max={'3'}
            min={'1'}
            onChange={onZoomChange}
            step={'0.1'}
            type={'range'}
            value={zoom}
          />
        </div>
      )}
    </div>
  )
}
