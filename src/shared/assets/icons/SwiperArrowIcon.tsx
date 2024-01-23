import { forwardRef, memo, Ref, SVGProps, useEffect, useState } from 'react'

type Direction = 'left' | 'right'

interface Props extends SVGProps<SVGSVGElement> {
  onClick?: () => void
  direction?: Direction
}

const SvgComponent = forwardRef(
  ({ onClick, direction: directionProp }: Props, ref: Ref<SVGSVGElement>) => {
    const [direction, setDirection] = useState<Direction | undefined>(directionProp)

    useEffect(() => {
      setDirection(directionProp)
    }, [directionProp])

    return (
      <svg
        onClick={onClick}
        style={{
          width: '24px',
          height: '24px',
          overflow: 'hidden',
          fill: 'white',
          transform: direction === 'left' ? 'rotate(180deg)' : 'rotate(0deg)',
        }}
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
      >
        <g>
          <path
            stroke="#ffffff"
            strokeWidth="50"
            d="M682.666667 533.333333a21.333333 21.333333 0 0 1-15.146667-6.186666l-298.666667-298.666667a21.333333 21.333333 0 0 1 30.293334-30.293333l298.666666 298.666666a21.333333 21.333333 0 0 1 0 30.293334A21.333333 21.333333 0 0 1 682.666667 533.333333z"
            fill="#ffffff"
          />
          <path
            stroke="#ffffff"
            strokeWidth="50"
            d="M384 832a21.333333 21.333333 0 0 1-15.146667-6.186667 21.333333 21.333333 0 0 1 0-30.293333l298.666667-298.666667a21.333333 21.333333 0 0 1 30.293333 30.293334l-298.666666 298.666666A21.333333 21.333333 0 0 1 384 832z"
            fill="#ffffff"
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
)

export const SwiperArrowIcon = memo(({ onClick, direction }: Props) => {
  return (
    <div
      style={{
        width: '36px',
        height: '36px',
        borderRadius: '2px',
        backgroundColor: '#171717',
        opacity: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        position: 'absolute',
        top: '50%',
        right: direction === 'right' ? '15px' : undefined,
        left: direction === 'left' ? '15px' : undefined,
        zIndex: direction === 'left' ? '1' : undefined,
      }}
      onClick={onClick}
    >
      <SvgComponent direction={direction} />
    </div>
  )
})
