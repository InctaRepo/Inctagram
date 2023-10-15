import { SVGProps, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="#fff" {...props}>
    <g clipPath="url(#a)">
      <path fill={props.color} d="M5.73 11.06 8.78 8 5.73 4.94 6.67 4l4 4-4 4-.94-.94Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)
const KeyboardArrowRight = memo(SvgComponent)

export default KeyboardArrowRight
