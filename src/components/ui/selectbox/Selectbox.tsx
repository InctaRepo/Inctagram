import React, { useState} from 'react';
import './selectbox.css';

interface SelectProps { 
    status?: 'default' | 'active' | 'hover' | 'focus' | 'disabled';   
}

export const Selectbox = ({
    status,
}: SelectProps) => {
    const mode = `storybook-select--${status}`;

    const [selectedOption, setSelectedOption] = useState<String>();
    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedOption(value);
      };

    return (
        <div className="selectbox" >
            <label className='label'>Select-box</label>
      <select onChange={selectChange} className={mode}>
        <option className='optionline' value="selectbox">Select-box</option>
        <option className='optionline' value="selectbox">Select-box</option>
        <option className='optionline' value="selectbox">Select-box</option>
      </select>
      {selectedOption && <h2 >{selectedOption}</h2>}
        </div>
    );
};