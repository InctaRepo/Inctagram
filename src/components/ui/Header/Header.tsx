

import { useState } from 'react';
import Image from 'next/image';
import s from './style.module.scss';

import bell from '@/src/assets/icons/bell.png';
import RussiaImage from '@/src/assets/icons/Russia.png'; // Import the Russia image separately
type StaticImageData = /*unresolved*/ any


//vorna xndiry




interface Option {
  value: string | number;
  label: string;


  img: StaticImageData; 
}

const options: Option[] = [
  { label: 'Russian', value: 'option1', img: RussiaImage }, // Use RussiaImage here
  { label: 'English', value: 'option2', img: RussiaImage },

  // Add more options as needed
];

const Dropdown = ({ options, onChange }: { options: Option[]; onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void }) => {
  return (

    <select className={s.drop} onChange={onChange}>
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
