import { AxiosError } from 'axios'

export type ResErrorType = {
  data: {
    message: [{ message: string }]
  }
}

export const errorHandler = (error: any) => {
  if (error) {
    const resError = error as AxiosError

    if ('response' in resError) {
      const res = resError.response as ResErrorType

      return res.data.message[0].message
    }
  }

  return 'Some error occured'
}
