export type ResponseType<D = {}> = {
  extensions: {
    key: string
    message: string
  }[]
  data: D
  resultCode: number
}
