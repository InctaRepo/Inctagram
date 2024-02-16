export const authByGitHub = () => {
  window.location.assign(`${process.env.NEXT_PUBLIC_API_URL}oauth/github`)
}
