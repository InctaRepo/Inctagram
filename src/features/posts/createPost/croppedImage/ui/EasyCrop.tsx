import ReactCrop from 'react-easy-crop'

type Props = {
  image?: string
  crop: { x: number; y: number }
  zoom: number
  aspectRatio: number
  objectFit?: string
  setCrop: (crop: { x: number; y: number }) => void
  setZoom: (zoom: number) => void
  croppedAreaPixels: CropArg | null
  setCroppedAreaPixels: (croppedAreaPixels: CropArg | null) => void
}

export type CropArg = {
  height: number
  width: number
  x: number
  y: number
}

export const EasyCrop = ({
  zoom,
  aspectRatio,
  crop,
  image,
  setZoom,
  setCroppedAreaPixels,
  setCrop,
}: Props) => {
  const onCropComplete = (croppedArea: CropArg, croppedAreaPixels: CropArg) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  return (
    <ReactCrop
      image={image}
      objectFit={'cover'} //zoom and crop doesn't work correctly without it
      crop={crop}
      zoom={zoom}
      zoomWithScroll={true}
      showGrid={false}
      aspect={aspectRatio}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    />
  )
}
