import s from './header.module.scss'

import MaskIcon from '@/src/assets/icons/mask-icon'
import { Typography } from '@/src/components/ui/typography'

const options = [
  { label: 'Russian', value: 'option1' },
  { label: 'English', value: 'option2' },
]

export const Header = () => {
  return (
      <div className={s.wrapper}>
        <Typography variant="large" className={s.text}>
          Inсtagram
        </Typography>
        <div className={s.options_container}>
          <MaskIcon />
<!--           <SelectBox options={options} /> -->  
          <!--          Hydration error -->  
        </div>
    </div>
  )
}
