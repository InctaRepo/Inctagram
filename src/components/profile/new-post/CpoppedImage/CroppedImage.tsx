import React, { useCallback, useState } from 'react'

import ReactCrop, { Point } from 'react-easy-crop'

import getCroppedImg from './Crop'
import s from './croped-image.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { Add } from '@/src/components/profile/new-post/edit-photo/add/add'
import { Crop } from '@/src/components/profile/new-post/edit-photo/crop/crop'
import { Zoom } from '@/src/components/profile/new-post/edit-photo/zoom/zoom'
import Image from 'next/image'

const CroppedImage = ({ image, addedImages, setAddedImages }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [aspectRatio, setAspectRatio] = useState(3 / 4)

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

  function SampleNextArrow(props) {
    const { className, style, onClick } = props
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', right: 15 }}
        onClick={onClick}
      />
    )
  }

  function SamplePrevArrow(props) {
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

  const onCropDone = imgCroppedArea => {
    const canvasEle = document.createElement('canvas')

    canvasEle.width = imgCroppedArea.width
    canvasEle.height = imgCroppedArea.height

    const context = canvasEle.getContext('2d')

    let imageObj1 = new Image()

    imageObj1.src = image
    imageObj1.onload = function () {
      context.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height
      )

      const dataURL = canvasEle.toDataURL('image/jpeg')

      setCroppedImage(dataURL)
    }
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

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  return (
    <>
      <div className={s.container}>
        <div className={s.cropContainer}>
          <Slider {...settings}>
            {addedImages.map((el, idx) => {
              return (
                <div key={idx} className={s.carousel}>
                  <ReactCrop
                    image={el.image}
                    objectFit={'contain'}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspectRatio}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                  />
                  {/*<Image src={el.image} alt={'photos'} height={300} width={300} />*/}
                </div>
              )
            })}
          </Slider>
        </div>
        <div className={s.editAndAdd}>
          <div className={s.edit}>
            <Crop className={s.expand} setAspectRatio={onAspectRatioChange} />
            <Zoom className={s.maximize} zoom={zoom} setZoom={zoom => setZoom(zoom)} />
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
      <button
        className="btn"
        onClick={() => {
          onCropDone(croppedAreaPixels)
        }}
      >
        Done
      </button>
    </>
  )
}

export default CroppedImage
