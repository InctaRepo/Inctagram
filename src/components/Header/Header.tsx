import { useState } from 'react'

import Image from 'next/image'

import s from './header.module.scss'

import bell from '@/src/assets/icons/bell.png'
import { LangSelect } from '@/src/components/ui/lang-select/lang-select'

type OptionType = {
  value: string | number
  label: string | number
}

const options = [
  { label: 'Russian', value: 'option1' },
  { label: 'English', value: 'option2' },
]

const Dropdown = ({
  options,
  onChange,
}: {
  options: OptionType[]
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}) => {
  return (
    <select onChange={onChange}>
      {options.map((option: OptionType, index: number) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export const Header = () => {
  const [selectedValue, setSelectedValue] = useState<any>()

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value)
  }

  return (
    <div className={s.main}>
      <h2 className={s.insta}>Instagram</h2>
      <div className={s.img}>
        <Image src={bell} alt="icon" />
      </div>
      <div className={s.dropDown}>
        <LangSelect />
        {/*<Dropdown options={options} onChange={handleDropdownChange} />*/}
        {/*<p>Selected Value: {selectedValue}</p>*/}
      </div>
    </div>
  )
}
