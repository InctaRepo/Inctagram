import { SVGProps, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={17} height={16} fill="none" {...props}>
    <g fill="#fff" clipPath="url(#a)">
      <path d="M12.5 2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Zm-8 1.33h8a.67.67 0 0 1 .67.67v5.57l-2.14-1.82a1.85 1.85 0 0 0-2.34 0L3.83 11.8V4a.67.67 0 0 1 .67-.67Zm8 9.34H4.87l4.67-3.9a.52.52 0 0 1 .62 0l3 2.56V12a.67.67 0 0 1-.66.67Z" />
      <path d="M5.83 6.67a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.5 0h16v16H.5z" />
      </clipPath>
    </defs>
  </svg>
)
const ChangeCoverIcon = memo(SvgComponent)

export default ChangeCoverIcon
