import { ChangeEvent } from 'react'

import { useRouter } from 'next/router'

export const LangSelect = () => {
  const { locale, push, pathname, query, asPath, locales } = useRouter()

  const changeLangHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const locale = event.currentTarget.value

    push({ pathname, query }, asPath, { locale })
  }

  return (
    <div>
      <select onChange={changeLangHandler} defaultValue={locale} style={{ background: 'black' }}>
        {locales?.map(l => {
          return (
            <option value={l} key={l}>
              {l}
            </option>
          )
        })}
      </select>
    </div>
  )
}
