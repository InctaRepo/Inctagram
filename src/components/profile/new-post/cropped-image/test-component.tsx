import React, { ChangeEvent, useState } from 'react'

import { Slider } from '@mui/base'
import ReactDOM from 'react-dom'
import Cropper from 'react-easy-crop'
// eslint-disable-next-line import/default

import s from './test.module.scss'

import getCroppedImg from '@/src/components/profile/new-post/cropped-image/Crop'

const dogImg =
  'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000'

export const Demo = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
    console.log(croppedAreaPixels)
  }

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(dogImg, croppedAreaPixels, rotation)

      console.log('donee', { croppedImage, croppedAreaPixels })
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }

  const onZoomChange = (event: ChangeEvent<HTMLInputElement>) => {
    const scale = parseFloat(event.target.value)

    setZoom(scale)
  }

  return (
    <div>
      <div className={s.cropContainer}>
        <Cropper
          image={dogImg}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className={s.controls}>
        <div className={s.sliderContainer}>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e, zoom) => setZoom(zoom)}
          />

          <input
            type={'range'}
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            className={s.slider}
            onChange={onZoomChange}
          />
        </div>
        <button onClick={showCroppedImage} className={s.cropButton}>
          Show Result
        </button>
        <img alt={'img'} src={croppedImage ? croppedImage : ''} className={s.cropImg} />
      </div>
    </div>
  )
}
