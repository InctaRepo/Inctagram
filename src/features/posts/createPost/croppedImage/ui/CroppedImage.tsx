import React, { useState } from 'react'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { SliderSettings } from '@/entities/post/sliderSettings'
import s from '@/features/posts/createPost/croppedImage/ui/CropedImage.module.scss'
import { CropArg, EasyCrop } from '@/features/posts/createPost/croppedImage/ui/EasyCrop'
import { Add } from '@/features/posts/createPost/editPhoto/add/Add'
import { Cropping } from '@/features/posts/createPost/editPhoto/crop/Cropping'
import { Zoom } from '@/features/posts/createPost/editPhoto/zoom/Zoom'
import { Image } from '@/shared/types'

type Props = {
  image?: string
  setImage: (image: string | undefined) => void
  addedImages: Image[]
  setAddedImages: (addedImages: Image[]) => void
  croppedAreaPixels: CropArg | null
  setCroppedAreaPixels: (croppedAreaPixels: CropArg | null) => void
}

const CroppedImage = ({
  addedImages,
  setAddedImages,
  croppedAreaPixels,
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
                <div key={idx} className={s.carousel} onClick={() => setIndex(idx)}>
                  <EasyCrop
                    image={el.image}
                    objectFit={'fill'}
                    crop={crop}
                    zoom={zoomValue}
                    setZoom={setZoomValue}
                    setCrop={setCrop}
                    aspectRatio={aspectRatio}
                    croppedAreaPixels={croppedAreaPixels}
                    setCroppedAreaPixels={setCroppedAreaPixels}
                  />
                  <div className={s.editAndAdd}>
                    <div className={s.edit}>
                      <Cropping
                        className={s.expand}
                        setAspectRatio={setAspectRatio}
                        aspectRatio={aspectRatio}
                      />
                      <Zoom className={s.maximize} zoom={zoomValue} setZoom={setZoomValue} />
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
