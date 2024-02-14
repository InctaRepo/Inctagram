export const googleOnclickHandler = () => {
  window.location.assign(`${process.env.NEXT_PUBLIC_API_URL}oauth/google`)
}

export const gitOnclickHandler = () => {
  window.location.assign(`${process.env.NEXT_PUBLIC_API_URL}oauth/github`)
}
