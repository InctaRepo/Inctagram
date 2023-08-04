import React, { useState } from 'react';
import './selectbox.css';
import * as Select from '@radix-ui/react-select';

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
    <Select.Root>
      <Select.Trigger className="selectbox">
        <Select.Group>
          <Select.Label className='label'>Select-box</Select.Label>
        </Select.Group>
        <Select.Group>
          <Select.Label className={mode}><h1>Select-box</h1></Select.Label>
        </Select.Group>
      </Select.Trigger>

      <Select.Portal >
        <Select.Content>
          <Select.Viewport>
            <Select.Group className="options">
              <Select.Item value="select-box" className="optionline">
                <h1 className="line">Select-box</h1>
              </Select.Item>
              <Select.Item value="select-box" className="optionline">
                <h1 className="line">Select-box</h1>
              </Select.Item>
              <Select.Item value="select-box" className="optionline">
                <h1 className="line">Select-box</h1>
              </Select.Item>
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>

      {selectedOption && <h2 >{selectedOption}</h2>}

    </Select.Root>
  );
};