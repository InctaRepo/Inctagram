import { SwiperArrowIcon } from '../../assets/icons/SwiperArrowIcon'

type Direction = 'left' | 'right'

interface Props {
  onClick?: () => void
  direction?: Direction
  name: string
}

export const SliderBtn = ({ onClick, direction, name }: Props) => {
  return (
    <div
      className={name}
      style={{
        width: '36px',
        height: '36px',
        borderRadius: '2px',
        backgroundColor: '#171717',
        opacity: '50%',
        textAlign: 'center',
        verticalAlign: 'middle',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        visibility: onClick === null ? 'hidden' : 'visible',
        cursor: 'pointer',
        position: 'absolute',
        top: '50%',
        right: direction === 'right' ? '15px' : undefined,
        left: direction === 'left' ? '15px' : undefined,
        zIndex: direction === 'left' ? '1' : undefined,
      }}
      onClick={onClick}
    >
      <SwiperArrowIcon direction={direction} />
    </div>
  )
}
