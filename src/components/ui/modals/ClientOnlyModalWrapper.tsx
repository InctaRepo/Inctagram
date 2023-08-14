import { ReactNode, useEffect, useState } from 'react'

type PropsType = {
  children: ReactNode
}

/**
 * use for Modal if u have render problems and if the page can be only client side render
 */

export const ClientOnlyModalWrapper = ({ children }: PropsType) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return <>{children}</>
}
