import { SVGProps, memo } from 'react'

export const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        fill={props.color ? props.color : '#fff'}
        d="m9 8 2.8-2.9a.7.7 0 0 0-1-1L8 7.2 5.1 4a.7.7 0 0 0-1 1l3 2.9-3 2.9a.7.7 0 0 0 .6 1.1.7.7 0 0 0 .4-.2L8 9l2.9 3a.7.7 0 1 0 1-1L8.8 8Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)
const Icon = memo(CloseIcon)

export default Icon

// transform: scale(2)
