export type ImageFilter =
  | 'contrast(110%) brightness(110%) saturate(130%)'
  | 'contrast(160%)'
  | 'grayscale(100%)'
  | 'hue-rotate(150deg)'
  | 'invert(80%)'
  | 'none'
  | 'opacity(70%)'
  | 'saturate(2)'
  | 'sepia(80%)'

export type Image = {
  activeFilter: ImageFilter
  croppedImage?: string
  fileName?: string
  id?: string
  image?: string
}
