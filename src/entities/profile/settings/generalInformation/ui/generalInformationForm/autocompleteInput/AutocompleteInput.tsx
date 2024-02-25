import { useEffect, useState } from 'react'

import { Control } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'

import s from '@/entities/profile/settings/generalInformation/ui/generalInformationForm/autocompleteInput/autocompleteInput.module.scss'
import { ProfileSettingSchema } from '@/shared/schemas/profileSettingSchema'
import { ControlledTextField } from '@/shared/ui/controlled'

type Option = {
  id: number
  name: string
}

type AutocompleteInputProps = {
  control: Control<ProfileSettingSchema, any>
  options: Option[]
  inputLabel: string
  cityInputReset: Boolean
}

export const AutocompleteInput = ({
  control,
  options,
  inputLabel,
  cityInputReset,
  ...restProps
}: AutocompleteInputProps) => {
  const [autocompleteOptions, setAutocompleteOptions] = useState<(string | undefined)[]>([])
  const [selectedValue, setSelectedValue] = useState('')
  const [selectMenuActive, setSelectMenuActive] = useState(false)

  useEffect(() => {
    setAutocompleteOptions([])
    setSelectedValue('')
  }, [options])

  const handleAutocompleteOptions = useDebouncedCallback((value: string) => {
    setAutocompleteOptions(
      options.map((option: Option) => {
        if (option.name.toLowerCase().includes(value.toLowerCase())) {
          return option.name
        }
      })
    )
    setSelectMenuActive(true)
  }, 300)

  const handleOptionClick = (option: string) => {
    setSelectedValue(option)
    setAutocompleteOptions([])
  }

  return (
    <div>
      <ControlledTextField
        name="city"
        control={control}
        label={inputLabel}
        handleAutocompleteOptions={handleAutocompleteOptions}
        selectedValue={selectedValue}
        {...restProps}
      />
      {selectMenuActive && (
        <ul className={s.optionsList}>
          {autocompleteOptions.map(
            (option, index) =>
              option && (
                <li className={s.option} key={index} onClick={() => handleOptionClick(option)}>
                  {option}
                </li>
              )
          )}
        </ul>
      )}
    </div>
  )
}
