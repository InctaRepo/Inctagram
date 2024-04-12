import { Ref, SVGProps, forwardRef, memo, useEffect, useState } from 'react'

type Direction = 'left' | 'right'

interface Props extends SVGProps<SVGSVGElement> {
  direction?: Direction
  onClick?: () => void
}

const SvgComponent = forwardRef(
  ({ direction: directionProp, onClick }: Props, ref: Ref<SVGSVGElement>) => {
    const [direction, setDirection] = useState<Direction | undefined>(directionProp)

    useEffect(() => {
      setDirection(directionProp)
    }, [directionProp])

    return (
      <svg
        onClick={onClick}
        ref={ref}
        style={{
          fill: 'white',
          height: '24px',
          overflow: 'hidden',
          transform: direction === 'left' ? 'rotate(180deg)' : 'rotate(0deg)',
          width: '24px',
        }}
        version={'1.1'}
        viewBox={'0 0 1024 1024'}
        xmlns={'http://www.w3.org/2000/svg'}
      >
        <g>
          <path
            d={
              'M682.666667 533.333333a21.333333 21.333333 0 0 1-15.146667-6.186666l-298.666667-298.666667a21.333333 21.333333 0 0 1 30.293334-30.293333l298.666666 298.666666a21.333333 21.333333 0 0 1 0 30.293334A21.333333 21.333333 0 0 1 682.666667 533.333333z'
            }
            fill={'#ffffff'}
            stroke={'#ffffff'}
            strokeWidth={'50'}
          />
          <path
            d={
              'M384 832a21.333333 21.333333 0 0 1-15.146667-6.186667 21.333333 21.333333 0 0 1 0-30.293333l298.666667-298.666667a21.333333 21.333333 0 0 1 30.293333 30.293334l-298.666666 298.666666A21.333333 21.333333 0 0 1 384 832z'
            }
            fill={'#ffffff'}
            stroke={'#ffffff'}
            strokeWidth={'50'}
          />
        </g>
        <defs>
          <clipPath id={'a'}>
            <path d={'M0 0h16v12H0z'} fill={'#fff'} />
          </clipPath>
        </defs>
      </svg>
    )
  }
)

export const SwiperArrowIcon = memo(SvgComponent)
