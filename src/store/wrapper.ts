import { createWrapper } from 'next-redux-wrapper'

import { AppStore, store } from '@/store'

export const makeStore = () => store

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false })
