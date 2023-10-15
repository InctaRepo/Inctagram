import React, { FC, useEffect, useState } from 'react'

import Slider from 'react-slick'

import getCroppedImg from './Crop'
import s from './croped-image.module.scss'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { ImageType } from '@/src/components/profile/new-post/create-post/create-new-post'
import EasyCrop, {
  CropArgType,
} from '@/src/components/profile/new-post/create-post/cropped-image/easy-crop'
import { Add } from '@/src/components/profile/new-post/edit-photo/add/add'
import { Crop } from '@/src/components/profile/new-post/edit-photo/crop/crop'
import { Zoom } from '@/src/components/profile/new-post/edit-photo/zoom/zoom'

// eslint-disable-next-line import/order

type PropsType = {
  image: string | null
  setImage: (image: string | null) => void
  addedImages: ImageType[]
  setAddedImages: (addedImages: ImageType[]) => void
}

const CroppedImage: FC<PropsType> = ({ image, addedImages, setAddedImages }) => {
  const [index, setIndex] = useState<number>(0)
  const [zoomValue, setZoomValue] = useState(1)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [aspectRatio, setAspectRatio] = useState(4 / 3)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArgType | null>(null)

  const settings = {
    dots: true,
    swipe: false,
    arrows: true,
    dotsClass: `slick-dots ${s.dots}`,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }

  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props

    return (
      <div
        className={className}
        style={{ ...style, display: 'block', right: 15 }}
        onClick={onClick}
      />
    )
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props

    return (
      <div
        className={className}
        style={{ ...style, display: 'block', left: 15, zIndex: 1 }}
        onClick={onClick}
      />
    )
  }

  useEffect(() => {
    setAddedImages(addedImages)
  }, [addedImages])

  const showCroppedImg = async (image: string, croppedAreaPixels: CropArgType | null) => {
    if (croppedAreaPixels && image) {
      try {
        {
          const croppedImage = await getCroppedImg(image, croppedAreaPixels)

          setCroppedImage(croppedImage as string)

          // @ts-ignore
          addedImages[index] = { image: croppedImage }
        }
      } catch (e) {
        console.error(e)
      }
    }
  }

  return (
    <>
      <div className={s.container}>
        <div className={s.cropContainer}>
          <Slider {...settings}>
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
                      <Crop className={s.expand} setAspectRatio={setAspectRatio} />
                      <Zoom className={s.maximize} zoom={zoomValue} setZoom={setZoomValue} />
                    </div>
                    <div>
                      <Add
                        image={croppedImage ? croppedImage : image}
                        addedImages={addedImages}
                        setAddedImages={setAddedImages}
                        croppedImage={croppedImage}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => showCroppedImg(el.image, croppedAreaPixels)}
                    color="primary"
                    className={s.button}
                  >
                    Show Result
                  </button>
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
