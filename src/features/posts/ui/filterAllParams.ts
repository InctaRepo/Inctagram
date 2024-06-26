export const filterAllParams = (searchParams: Record<string, string>) => {
  const params: Record<string, string> = searchParams

  for (const el in params) {
    if (params[el] === '' || params[el] === '0') {
      delete params[el]
    }
  }

  return params
}
