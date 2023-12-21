import { memo, SVGProps } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      fill={props.fill}
      d="M18 4h-1V3a1 1 0 0 0-2 0v1H9V3a1 1 0 0 0-2 0v1H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3ZM8 17a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm8 0h-4a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2Zm3-6H5V7a1 1 0 0 1 1-1h1v1a1 1 0 0 0 2 0V6h6v1a1 1 0 0 0 2 0V6h1a1 1 0 0 1 1 1v4Z"
    />
  </svg>
)
const DateIconFilled = memo(SvgComponent)

export default DateIconFilled
