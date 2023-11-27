export type BaseResponse<D = {}> = {
  extensions: {
    key: string
    message: string | Message[]
  }[]
  data: D
  resultCode: number
}
type Message = {
  message: string
  field: string
}
