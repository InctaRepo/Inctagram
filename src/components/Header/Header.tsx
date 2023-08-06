'use client'

import { useState } from 'react';
import bell from "/public/assets/bell.png"

import Image from 'next/image'

import s from './style.module.css';

interface Option {
  value: string | number;
  label: string;
}

const options = [
  { label: 'Russian', value: 'option1' },
  { label: 'English', value: 'option2' },
  { label: 'Armenian', value: 'option3' },
  // Add more options as needed
];

const Dropdown = ({ options, onChange }: { options: Option[]; onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void }) => {
  return (
    <select onChange={onChange}>
      {options.map((option: Option, index: number) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

const Header = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <header className={s.main}>


      <h2 className={s.insta}>Instagram</h2>

      <div className={s.img}>

        <Image src={bell} alt="icon" />

      </div>


      <div className={s.dropDown}>

        <Dropdown options={options} onChange={handleDropdownChange} />
        {/* <p>Selected Value: {selectedValue}</p> */}

      </div>


    </header>
  );
};

export default Header;
