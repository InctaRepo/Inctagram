import React from 'react'

export const SliderSettings = {
  dots: true,
  swipe: false,
  arrows: true,
  dotsClass: 'slick-dots slick-thumb',
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
}

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props

  return (
    <div
      className={className}
      style={{ ...style, display: 'block', right: 15 }}
      onClick={onClick}
    />
  )
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props

  return (
    <div
      className={className}
      style={{ ...style, display: 'block', left: 15, zIndex: 1 }}
      onClick={onClick}
    />
  )
}
