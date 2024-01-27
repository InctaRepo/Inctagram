import React, { useEffect, useState } from 'react'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Image } from '@/features/posts/createPost/CreateNewPost'
import { GetCroppedImg } from '@/features/posts/createPost/croppedImage/ui/Crop'
import s from '@/features/posts/createPost/croppedImage/ui/CropedImage.module.scss'
import { CropArg, EasyCrop } from '@/features/posts/createPost/croppedImage/ui/EasyCrop'
import { Add } from '@/features/posts/createPost/editPhoto/add/Add'
import { Cropping } from '@/features/posts/createPost/editPhoto/crop/Cropping'
import { Zoom } from '@/features/posts/createPost/editPhoto/zoom/Zoom'
import { useTranslate } from '@/shared/hooks'
import { SliderBtn } from '@/shared/ui/sliderBtn'

type Props = {
  image?: string
  setImage: (image: string | undefined) => void
  addedImages: Image[]
  setAddedImages: (addedImages: Image[]) => void
}

const CroppedImage = ({ image, addedImages, setAddedImages }: Props) => {
  const [index, setIndex] = useState<number>(0)
  const [zoomValue, setZoomValue] = useState(1)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [aspectRatio, setAspectRatio] = useState(3 / 4)
  const [croppedImage, setCroppedImage] = useState<string | undefined>(undefined)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArg | null>(null)
  const { t } = useTranslate()
  const settings = {
    dots: true,
    swipe: false,
    arrows: true,
    dotsClass: `slick-dots ${s.dots}`,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SliderBtn direction="right" />,
    prevArrow: <SliderBtn direction="left" />,
  }

  useEffect(() => {
    setAddedImages(addedImages)
  }, [addedImages])

  const showCroppedImg = async (image: string | undefined, croppedAreaPixels: CropArg | null) => {
    if (croppedAreaPixels && image) {
      try {
        {
          const croppedImage = await GetCroppedImg(image, croppedAreaPixels)

          if (!croppedImage) {
            return null
          }
          setCroppedImage(croppedImage)
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
                      <Cropping
                        className={s.expand}
                        setAspectRatio={setAspectRatio}
                        aspectRatio={aspectRatio}
                      />
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
                  {/* <button
                    onClick={() => showCroppedImg(el.image, croppedAreaPixels)}
                    color="primary"
                    className={s.button}
                  >
                    {t.posts.createPost.showResult}
                  </button> */}
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
