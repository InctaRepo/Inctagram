import React, { ChangeEvent, FC, MutableRefObject, useEffect, useRef, useState } from 'react'

import { Slider } from '@mui/base/Slider'
import Box from '@mui/material/Box'
import Image from 'next/image'

import maximize from '@/src/assets/icons/maximize-outline.svg'
import s from '@/src/components/profile/new-post/edit-photo/zoom/zoom.module.scss'

type PropsType = {
  className?: string
  onZoomImage: (value: string) => void
  zoom: number
  setZoom: (zoom: number) => void
  zoomImage: number
}

export const Zoom: FC<PropsType> = ({ className, zoom, setZoom, onZoomImage, zoomImage }) => {
  const [isOpen, setIsOpen] = useState(false)
  const zoomRef = useRef() as MutableRefObject<HTMLDivElement>
  const [value, setValue] = useState(zoomImage ? zoomImage : '0')

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (zoomRef.current && !e.composedPath().includes(zoomRef.current)) {
        setIsOpen(false)
      }
    }

    document.body.addEventListener('click', handleClickOutside)

    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    /*setZoom(e.target.value)*/
    onZoomImage(e.currentTarget.value)
    setValue(e.currentTarget.value)
  }

  return (
    <div ref={zoomRef}>
      <div onClick={() => setIsOpen(true)} className={s.zoomBtn}>
        <Image src={maximize} alt={'zoom'} width={24} height={24} className={s.blue} />
      </div>

      {isOpen && (
        <div className={s.slider}>
          {/*  <Box sx={{ width: 300 }}>
            <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
          </Box>*/}
          <input
            className={s.range}
            type="range"
            min="1"
            max="10"
            /*step="0.1"*/
            value={value}
            /*onChange={e => {
              setZoom(e.target.value)
            }}*/
            onChange={onChangeHandler}
          />
        </div>
      )}
    </div>
  )
}
