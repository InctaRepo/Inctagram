import React, { FC, useCallback, useEffect, useState } from 'react'

import Cropper from 'react-easy-crop'

// eslint-disable-next-line import/namespace
import { ImageType } from '@/src/components/profile/new-post/create-new-post'
import getCroppedImg from '@/src/components/profile/new-post/cropped-image/Crop'
// eslint-disable-next-line import/namespace

type PropsType = {
  image: string
  crop: {
    x: number
    y: number
  }
  zoom: number
  aspectRatio: number
  objectFit: string
  setZoom: (zoom: number) => void
  setCrop: (crop: { x: number; y: number }) => void
  croppedAreaPixels: CropArgType | null
  setCroppedAreaPixels: (croppedAreaPixels: CropArgType | null) => void
}

export type CropArgType = {
  height: number
  width: number
  x: number
  y: number
}

const EasyCrop: FC<PropsType> = ({
  croppedAreaPixels,
  setCroppedAreaPixels,
  setZoom,
  setCrop,
  zoom,
  crop,
  image,
  aspectRatio,
  objectFit,
}) => {
  const onCropComplete = useCallback((croppedArea: CropArgType, croppedAreaPixels: CropArgType) => {
    setCroppedAreaPixels(croppedAreaPixels)
    console.log(croppedAreaPixels)
  }, [])

  return (
    <Cropper
      image={image}
      objectFit={'contain'}
      crop={crop}
      zoom={zoom}
      showGrid={false}
      aspect={aspectRatio}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    />
  )
}

export default EasyCrop
