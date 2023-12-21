import { memo, Ref, SVGProps, useEffect, useState } from 'react'

type Direction = 'asc' | 'desc'

interface Props extends SVGProps<SVGSVGElement> {
  direction?: Direction
}

const SvgComponent = (props: Props, ref: Ref<SVGSVGElement>) => {
  const [direction, setDirection] = useState<Direction | undefined>(props.direction)

  useEffect(() => {
    setDirection(props.direction)
  }, [props.direction])

  const handleClick = () => {
    setDirection(direction === 'asc' ? 'desc' : 'asc')
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="none"
      ref={ref}
      {...props}
      onClick={handleClick}
      style={{ transform: direction === 'desc' ? 'rotate(270deg)' : undefined }}
    >
      <g clipPath="url(#a)">
        <path
          fill="#fff"
          d="M12.77 7.257a.5.5 0 0 1-.82.385l-3.68-3.24V11.5a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5V4.402l-3.68 3.24a.5.5 0 0 1-.705-.075.5.5 0 0 1 .075-.73l4-3.5a.5.5 0 0 1 .635 0l4 3.5a.5.5 0 0 1 .18.415Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h16v12H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

const ArrowIcon = memo(SvgComponent)

export default ArrowIcon
