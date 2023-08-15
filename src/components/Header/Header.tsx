import { useState } from 'react'

import Image from 'next/image'

import s from './header.module.scss'

import bell from '@/src/assets/icons/bell.png'

interface Option {
  value: string | number
  label: string
}

const options = [
  { label: 'Russian', value: 'option1' },
  { label: 'English', value: 'option2' },
  { label: 'Armenian', value: 'option3' },
  // Add more options as needed
]

const Dropdown = ({
  options,
  onChange,
}: {
  options: Option[]
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}) => {
  return (
    <select onChange={onChange}>
      {options.map((option: Option, index: number) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export const Header = () => {
  const [selectedValue, setSelectedValue] = useState('')

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
        <Dropdown options={options} onChange={handleDropdownChange} />
        {/* <p>Selected Value: {selectedValue}</p> */}
      </div>
    </div>
  )
}
