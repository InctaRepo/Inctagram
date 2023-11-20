import { Size } from 'react-easy-crop'

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()

    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = url
  })

function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180
}

function rotateSize(width: number, height: number, rotation: number): Size {
  const rad = getRadianAngle(rotation)

  return {
    width: Math.abs(Math.cos(rad) * width) + Math.abs(Math.sin(rad) * height),
    height: Math.abs(Math.sin(rad) * width) + Math.abs(Math.cos(rad) * height),
  }
}

export default async function getFilteredImg(
  imageSrc: string | undefined,
  filter: string = 'none',
  rotation = 0,
  flip = { horizontal: false, vertical: false }
): Promise<BlobPart | null> {
  const image = await createImage(String(imageSrc))
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return null
  }

  const rot = getRadianAngle(rotation)

  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation)

  canvas.width = bBoxWidth
  canvas.height = bBoxHeight

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
  ctx.rotate(rot)
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
  ctx.translate(-image.width / 2, -image.height / 2)

  ctx.filter = filter || 'none'
  ctx.drawImage(image, 0, 0)

  //return canvas.toDataURL('image/jpeg')
  // As a blob
  return new Promise(resolve => {
    canvas.toBlob(blob => {
      if (!blob) {
        return null
      }

      return resolve(blob)
    })
  })
}
