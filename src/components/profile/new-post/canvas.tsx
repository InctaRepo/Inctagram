import React, { useRef, useEffect } from 'react'

//I will use this file when back will be ready for upload posts info

const Canvas = ({
  photo,
  filter,
  width,
  height,
  setImageUrl,
}: {
  filter: string
  height: string
  photo: string
  setImageUrl: (canvasUrl: string) => void
  width: string
}) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement | null
    const context = canvas?.getContext('2d') as CanvasRenderingContext2D

    const img = new Image()

    img.onload = function () {
      let newWidth = 0
      let newHeight = 0
      let xOffset = 0
      let yOffset = 0

      if (canvas) {
        const ratio = img.width / img.height

        newWidth = canvas.width
        newHeight = newWidth / ratio
        if (newHeight > canvas.height) {
          newHeight = canvas.height
          newWidth = newHeight * ratio
        }
        xOffset = newWidth < canvas.width ? (canvas.width - newWidth) / 2 : 0
        yOffset = newHeight < canvas.height ? (canvas.height - newHeight) / 2 : 0

        context.filter = filter
        console.log('canvas')
        setTimeout(function () {
          const canvasUrl = canvas.toDataURL('image/jpeg')

          setImageUrl(canvasUrl)
          console.log('photo URLLLL', canvasUrl)
        }, 2000)
      }

      context.drawImage(img, xOffset, yOffset, newWidth, newHeight)
    }

    img.src = photo
  }, [])

  return <canvas ref={canvasRef} height={height} width={width} />
}

export default Canvas
