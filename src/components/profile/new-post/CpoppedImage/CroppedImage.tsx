import { useCallback, useState } from 'react'

import Slider from '@mui/material/Slider'
import Cropper from 'react-easy-crop'

import { cropImage } from './Crop'
import s from './croped-image.module.scss'

import { Add } from '@/src/components/profile/new-post/edit-photo/add/add'
import { Crop } from '@/src/components/profile/new-post/edit-photo/crop/crop'
import { Zoom } from '@/src/components/profile/new-post/edit-photo/zoom/zoom'

const CroppedImage = ({ image, onComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [aspectRatio, setAspectRatio] = useState(4 / 3)

  const onAspectRatioChange = event => {
    setAspectRatio(event.target.value)
  }

  return (
    <>
      <div className={s.container}>
        <div className={s.cropContainer}>
          <Cropper
            image={image}
            aspect={aspectRatio}
            crop={crop}
            zoom={zoom}
            zoomSpeed={4}
            maxZoom={3}
            showGrid={false}
            onZoomChange={setZoom}
            onCropChange={setCrop}
            objectFit="vertical-cover"
            cropShape={'rect'}
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
            <Add />
          </div>
        </div>
      </div>

      <div className="controls">
        <label>
          Zoom
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="zoom"
            onChange={(e: any, zoom: any) => setZoom(zoom)}
            className="range"
          />
        </label>
      </div>
      <div className="action-btns">
        <div className="aspect-ratios" onChange={onAspectRatioChange}>
          <input type="radio" value={1} name="ratio" /> 1:1
          <input type="radio" value={4 / 5} name="ratio" /> 4:5
          <input type="radio" value={16 / 9} name="ratio" /> 16:9
        </div>
        <button
          className="btn"
          onClick={() => onComplete(cropImage(image, croppedAreaPixels, console.log))}
        >
          Done
        </button>
      </div>
    </>
  )
}

export default CroppedImage
