import { useEffect, useState } from 'react'

import s from '@/entities/profile/settings/generalInformation/ui/generalInformationForm/autocompleteInput/autocompleteInput.module.scss'
import { ControlledTextField } from '@/shared/ui/controlled'

type AutocompleteInputProps = {
  control: any
  options: any[]
  inputLabel: string
  cityInputReset: Boolean
}

export const AutocompleteInput = ({
  control,
  options,
  inputLabel,
  cityInputReset,
}: AutocompleteInputProps) => {
  const [autocompleteOptions, setAutocompleteOptions] = useState<string[]>([])
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null)
  const [selectedValue, setSelectedValue] = useState('')

  useEffect(() => {
    if (cityInputReset) {
      setSelectedValue('')
    }
  }, [cityInputReset])

  const handleAutocompletetOptions = (value: string) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }

    const timerId = setTimeout(() => {
      setAutocompleteOptions(
        options.map(option => {
          if (option.name.toLowerCase().includes(value.toLowerCase())) {
            return option.name
          }
        })
      )
    }, 300)

    setDebounceTimer(timerId)
  }

  const handleOptionClick = (option: string) => {
    setSelectedValue(option)
    setAutocompleteOptions([])
  }

  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }
    }
  }, [debounceTimer])

  return (
    <div>
      <ControlledTextField
        name="city"
        control={control}
        label={inputLabel}
        handleAutocompletetOptions={handleAutocompletetOptions}
        selectedValue={selectedValue}
      />
      {autocompleteOptions.length > 0 && (
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
