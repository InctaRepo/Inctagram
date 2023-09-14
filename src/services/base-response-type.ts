export type BaseResponseType<D = {}> = {
  extensions: {
    key: string
    message: string
  }[]
  data: D
  resultCode: number
}
