import { useCallback, useState } from 'react'

import Cropper from 'react-easy-crop'

import getCroppedImg from './Crop'
import s from './croped-image.module.scss'

import { Add } from '@/src/components/profile/new-post/edit-photo/add/add'
import { Crop } from '@/src/components/profile/new-post/edit-photo/crop/crop'
import { Zoom } from '@/src/components/profile/new-post/edit-photo/zoom/zoom'

const CroppedImage = ({ image }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [aspectRatio, setAspectRatio] = useState(3 / 4)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const onAspectRatioChange = number => {
    setAspectRatio(number)
  }
  const onZoomChange = zoom => {
    setZoom(zoom)
  }
  const onCropChange = crop => {
    setCrop(crop)
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
      const croppedImage = await getCroppedImg(image, croppedAreaPixels, aspectRatio)

      console.log('donee', { croppedImage }, aspectRatio)
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, aspectRatio])

  return (
    <>
      <div className={s.container}>
        <div className={s.cropContainer}>
          <Cropper
            image={croppedImage ? croppedImage : image}
            aspect={aspectRatio}
            crop={crop}
            zoom={zoom}
            maxZoom={3}
            showGrid={false}
            onZoomChange={onZoomChange}
            onCropChange={onCropChange}
            //objectFit="cover"
            cropShape={undefined}
            onCropComplete={(_, croppedAreaPixels) => {
              setCroppedAreaPixels(croppedAreaPixels)
            }}
            style={{
              containerStyle: {
                width: '100%',
                height: '100%',
                backgroundColor: '#4c4c4c',
              },
            }}
          />
        </div>
        <div className={s.editAndAdd}>
          <div className={s.edit}>
            <Crop className={s.expand} setAspectRatio={onAspectRatioChange} />
            <Zoom className={s.maximize} zoom={zoom} setZoom={zoom => setZoom(zoom)} />
          </div>
          <div>
            <Add image={croppedImage ? croppedImage : image} />
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
