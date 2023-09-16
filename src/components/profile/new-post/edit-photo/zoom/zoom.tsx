import React, { ChangeEvent, FC, MutableRefObject, useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import maximize from '@/src/assets/icons/maximize-outline.svg'
import s from '@/src/components/profile/new-post/edit-photo/zoom/zoom.module.scss'

type PropsType = {
  zoom?: number
  setZoom: (zoom: number) => void
  className: string
}

export const Zoom: FC<PropsType> = ({ zoom, setZoom }) => {
  const [isOpen, setIsOpen] = useState(false)
  const zoomRef = useRef() as MutableRefObject<HTMLDivElement>

  const onZoomChange = (event: ChangeEvent<HTMLInputElement>) => {
    const zoomValue = parseFloat(event.target.value)

    setZoom(zoomValue)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (zoomRef.current && !e.composedPath().includes(zoomRef.current)) {
        setIsOpen(false)
      }
    }

    document.body.addEventListener('click', handleClickOutside)

    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div ref={zoomRef}>
      <div onClick={() => setIsOpen(true)} className={s.zoomBtn}>
        <Image src={maximize} alt={'zoom'} width={24} height={24} className={s.blue} />
      </div>

      {isOpen && (
        <div className={s.slider}>
          <input
            className={s.range}
            type="range"
            min="1"
            max="3"
            step="0.01"
            value={zoom}
            onChange={onZoomChange}
          />
        </div>
      )}
    </div>
  )
}
