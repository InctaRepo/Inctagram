import React, { useState } from 'react'
import Slider from 'react-slick'

import { SliderSettings } from '@/entities/post/sliderSettings'
import { CropArg, EasyCrop } from '@/features/posts/createPost/croppedImage/ui/EasyCrop'
import { Add } from '@/features/posts/createPost/editPhoto/add/Add'
import { Cropping } from '@/features/posts/createPost/editPhoto/crop/Cropping'
import { Zoom } from '@/features/posts/createPost/editPhoto/zoom/Zoom'
import { Image } from '@/shared/types'

import s from '@/features/posts/createPost/croppedImage/ui/CropedImage.module.scss'

type Props = {
  addedImages: Image[]
  croppedAreaPixels: CropArg | null
  image?: string
  setAddedImages: (addedImages: Image[]) => void
  setCroppedAreaPixels: (croppedAreaPixels: CropArg | null) => void
  setImage: (image: string | undefined) => void
}

const CroppedImage = ({
  addedImages,
  croppedAreaPixels,
  setAddedImages,
  setCroppedAreaPixels,
}: Props) => {
  const [index, setIndex] = useState<number>(0)
  const [zoomValue, setZoomValue] = useState(1)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [aspectRatio, setAspectRatio] = useState(3 / 4)

  return (
    <>
      <div className={s.container}>
        <div className={s.cropContainer}>
          <Slider {...SliderSettings}>
            {addedImages.map((el, idx) => {
              return (
                <div className={s.carousel} key={idx} onClick={() => setIndex(idx)}>
                  <EasyCrop
                    aspectRatio={aspectRatio}
                    crop={crop}
                    croppedAreaPixels={croppedAreaPixels}
                    image={el.image}
                    objectFit={'fill'}
                    setCrop={setCrop}
                    setCroppedAreaPixels={setCroppedAreaPixels}
                    setZoom={setZoomValue}
                    zoom={zoomValue}
                  />
                  <div className={s.editAndAdd}>
                    <div className={s.edit}>
                      <Cropping
                        aspectRatio={aspectRatio}
                        className={s.expand}
                        setAspectRatio={setAspectRatio}
                      />
                      <Zoom className={s.maximize} setZoom={setZoomValue} zoom={zoomValue} />
                    </div>
                    <Add addedImages={addedImages} setAddedImages={setAddedImages} />
                  </div>
                </div>
              )
            })}
          </Slider>
        </div>
      </div>
    </>
  )
}

export default CroppedImage
