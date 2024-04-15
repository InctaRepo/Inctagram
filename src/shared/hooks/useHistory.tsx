import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

interface HValidation {
  back(): void

  history: string[]

  setHistory(data: string[]): void
}

const HistoryContext = createContext<HValidation>({} as HValidation)

export const HistoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { asPath, pathname, push } = useRouter()
  const [history, setHistory] = useState<string[]>([])

  function back() {
    for (let i = history.length - 2; i >= 0; i--) {
      const route = history[i]

      if (!route.includes('#') && route !== pathname) {
        push(route)

        // if you want to pop history on back
        const newHistory = history.slice(0, i)

        setHistory(newHistory)

        break
      }
    }
  }

  useEffect(() => {
    setHistory(previous => [...previous, asPath])
  }, [asPath])

  return (
    <HistoryContext.Provider
      value={{
        back,
        history,
        setHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  )
}

export function useHistory(): HValidation {
  return useContext(HistoryContext)
}
