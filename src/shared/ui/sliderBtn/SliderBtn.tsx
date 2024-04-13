import { SwiperArrowIcon } from '@/shared/assets/icons/SwiperArrowIcon'

type Direction = 'left' | 'right'

interface Props {
  direction?: Direction
  onClick?: () => void
}

export const SliderBtn = ({ direction, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      style={{
        alignItems: 'center',
        backgroundColor: '#171717',
        borderRadius: '2px',
        cursor: 'pointer',
        display: 'flex',
        height: '36px',
        justifyContent: 'center',
        left: direction === 'left' ? '15px' : undefined,
        opacity: '50%',
        position: 'absolute',
        right: direction === 'right' ? '15px' : undefined,
        textAlign: 'center',
        top: '50%',
        verticalAlign: 'middle',
        visibility: onClick === null ? 'hidden' : 'visible',
        width: '36px',
        zIndex: direction === 'left' ? '1' : undefined,
      }}
    >
      <SwiperArrowIcon direction={direction} />
    </div>
  )
}
