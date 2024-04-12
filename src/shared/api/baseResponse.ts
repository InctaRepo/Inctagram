export type BaseResponse<D = {}> = {
  data: D
  extensions: {
    key: string
    message: Message[] | string
  }[]
  resultCode: number
}
type Message = {
  field: string
  message: string
}
export type Images = {
  size: number
  url: string
  variant: string
}
