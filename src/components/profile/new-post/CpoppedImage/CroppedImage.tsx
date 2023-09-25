import React, { FC, useCallback, useEffect, useState } from 'react'

import Cropper from 'react-easy-crop'
import Slider from 'react-slick'

import getCroppedImg from './Crop'
import s from './croped-image.module.scss'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { Add } from '@/src/components/profile/new-post/edit-photo/add/add'
import { Crop } from '@/src/components/profile/new-post/edit-photo/crop/crop'
import { Zoom } from '@/src/components/profile/new-post/edit-photo/zoom/zoom'

// eslint-disable-next-line import/order
import Image from 'next/image'
import { ImageType } from '@/src/components/profile/new-post/upload-new-post'

type PropsType = {
  image: string | null
  addedImages: ImageType[]
  setAddedImages: (addedImages: ImageType[]) => void
}

const CroppedImage: FC<PropsType> = ({ image, addedImages, setAddedImages }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [aspectRatio, setAspectRatio] = useState(4 / 3)
  const [zoomValue, setZoomValue] = useState(1)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)

  const settings = {
    dots: true,
    swipe: false,
    arrows: true,
    dotsClass: 'slick-dots slick-thumb',
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
  const onAspectRatioChange = number => {
    setAspectRatio(number)
  }

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage: string = await getCroppedImg(image, croppedAreaPixels, aspectRatio)

      console.log('donee', { croppedImage }, aspectRatio)
      setCroppedImage(croppedImage)
      setAddedImages([
        ...addedImages,
        { id: (addedImages.length + 1).toString(), image: croppedImage },
      ])
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, aspectRatio])

  useEffect(() => {
    setAddedImages(addedImages)
  }, [addedImages])

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
    console.log(croppedAreaPixels)
  }

  const onZoomImage = (value: any) => {
    setZoomValue(value)
  }

  return (
    <>
      <div className={s.container}>
        <div className={s.cropContainer}>
          <Slider {...settings}>
            {addedImages.map((el, idx) => {
              return (
                <div key={idx} className={s.carousel}>
                  <Cropper
                    image={el.image}
                    //objectFit={'cover'}
                    crop={crop}
                    zoom={zoomValue}
                    showGrid={false}
                    aspect={aspectRatio}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoomValue}
                  />
                </div>
              )
            })}
          </Slider>
        </div>
        <div className={s.editAndAdd}>
          <div className={s.edit}>
            <Crop className={s.expand} setAspectRatio={onAspectRatioChange} />
            <Zoom
              className={s.maximize}
              zoom={zoomValue}
              setZoom={setZoomValue}
              onZoomImage={onZoomImage}
              zoomImage={zoomValue}
            />
          </div>
          <div>
            <Add
              image={croppedImage ? croppedImage : image}
              addedImages={addedImages}
              setAddedImages={setAddedImages}
            />
          </div>
        </div>
      </div>

      <button onClick={showCroppedImage} color="primary">
        Show Result
      </button>
    </>
  )
}

export default CroppedImage
