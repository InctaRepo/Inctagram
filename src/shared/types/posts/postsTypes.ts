export type ImageFiltersType =
  | 'none'
  | 'saturate(2)'
  | 'grayscale(100%)'
  | 'contrast(160%)'
  | 'contrast(110%) brightness(110%) saturate(130%)'
  | 'invert(80%)'
  | 'sepia(80%)'
  | 'opacity(70%)'
  | 'hue-rotate(150deg)'

export type Image = {
  image?: string
  id?: string
  croppedImage?: string
  fileName?: string
  activeFilter: ImageFiltersType
}
