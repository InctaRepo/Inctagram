import { AppStore, store } from '@/store'
import { createWrapper } from 'next-redux-wrapper'

export const makeStore = () => store

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false })
