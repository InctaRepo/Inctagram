import { useEffect, useRef, useState } from 'react'

import { Control } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'

import {
  AutocompleteOption,
  useLazyGetAutocompleteQuery,
} from '@/entities/profile/service/autocompleteApi'
import s from '@/entities/profile/settings/generalInformation/ui/generalInformationForm/autocompleteInput/autocompleteInput.module.scss'
import { ProfileSettingSchema } from '@/shared/schemas/profileSettingSchema'
import { ControlledTextField } from '@/ui/controlled'

type Props = {
  control: Control<ProfileSettingSchema, any>
  inputLabel?: string
}

export const AutocompleteInput = ({ control, inputLabel, ...restProps }: Props) => {
  const [selectedValue, setSelectedValue] = useState('')
  const [selectMenuActive, setSelectMenuActive] = useState(false)
  const [autocompleteOptions, setAutocompleteOptions] = useState<AutocompleteOption[]>([])
  const [getAutocomplete, { data }] = useLazyGetAutocompleteQuery()
  const dropdownRef = useRef<HTMLUListElement>(null)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSelectMenuActive(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const options =
      data?.results.map((option: AutocompleteOption) => {
        return {
          city: option.city,
          country: option.country,
        }
      }) || []

    setAutocompleteOptions([...options])
  }, [data])

  const handleAutocompleteOptions = useDebouncedCallback((value: string) => {
    getAutocomplete(value)
    setSelectMenuActive(true)
  }, 300)

  const handleOptionClick = (city: string, country: string) => {
    setSelectedValue(`${city},${country}`)
    setAutocompleteOptions([])
    setSelectMenuActive(false)
  }

  const handleKeyDown = (event: unknown) => {
    const e = event as KeyboardEvent

    if (e.key === 'ArrowDown') {
      setHighlightedIndex(prevIndex =>
        prevIndex < autocompleteOptions.length - 1 ? prevIndex + 1 : prevIndex
      )
      e.preventDefault() // Prevent cursor from moving
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : 0))
      e.preventDefault() // Prevent cursor from moving
    } else if (e.key === 'Enter' && highlightedIndex !== -1) {
      const selectedOption = autocompleteOptions[highlightedIndex]

      handleOptionClick(selectedOption.city, selectedOption.country)
      e.preventDefault() // Prevent form submission
    }
  }

  return (
    <div onKeyDown={e => handleKeyDown(e)}>
      <ControlledTextField
        name="city"
        control={control}
        label={inputLabel}
        handleAutocompleteOptions={handleAutocompleteOptions}
        selectedValue={selectedValue}
        {...restProps}
      />
      {selectMenuActive && (
        <ul className={s.optionsList} ref={dropdownRef}>
          {autocompleteOptions.map(
            (option: AutocompleteOption, index) =>
              option && (
                <li
                  className={`${s.option} ${highlightedIndex === index ? s.highlighted : ''}`}
                  key={index}
                  onClick={() => handleOptionClick(option.city, option.country)}
                >
                  {`${option.city} , ${option.country}`}
                </li>
              )
          )}
        </ul>
      )}
    </div>
  )
}
