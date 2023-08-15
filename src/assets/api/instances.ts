import axios from 'axios'

/**
 * instance for NextJS API
 */
export const instance = axios.create({
  baseURL: 'https://inctagram-social.vercel.app/',
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  //TODO not working env ?
})
