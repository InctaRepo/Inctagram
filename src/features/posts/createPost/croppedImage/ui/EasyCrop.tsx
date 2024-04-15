import ReactCrop from 'react-easy-crop'

type Props = {
  aspectRatio: number
  crop: { x: number; y: number }
  croppedAreaPixels: CropArg | null
  image?: string
  objectFit?: string
  setCrop: (crop: { x: number; y: number }) => void
  setCroppedAreaPixels: (croppedAreaPixels: CropArg | null) => void
  setZoom: (zoom: number) => void
  zoom: number
}

export type CropArg = {
  height: number
  width: number
  x: number
  y: number
}

export const EasyCrop = ({
  aspectRatio,
  crop,
  image,
  setCrop,
  setCroppedAreaPixels,
  setZoom,
  zoom,
}: Props) => {
  const onCropComplete = (croppedArea: CropArg, croppedAreaPixels: CropArg) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  return (
    <ReactCrop
      aspect={aspectRatio}
      crop={crop}
      image={image}
      objectFit={'cover'} //zoom and crop doesn't work correctly without it
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
      showGrid={false}
      zoom={zoom}
      zoomWithScroll
    />
  )
}
