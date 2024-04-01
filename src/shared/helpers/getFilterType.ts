import { ImageFilter } from '@/shared/types/posts/postsTypes'

export const getFilterType = (filter: string): ImageFilter => {
  switch (filter) {
    case 'No filter':
      return 'none'
    case 'Kyoto':
      return 'saturate(2)'
    case 'Lark':
      return 'grayscale(100%)'
    case 'Gingham':
      return 'contrast(160%)'
    case 'Happy':
      return 'contrast(110%) brightness(110%) saturate(130%)'
    case 'Clarendon':
      return 'invert(80%)'
    case 'Shabby':
      return 'sepia(80%)'
    case 'Old school': {
      return 'opacity(70%)'
    }
    case 'Silent Hill': {
      return 'hue-rotate(150deg)'
    }
    default: {
      return 'none'
    }
  }
}
