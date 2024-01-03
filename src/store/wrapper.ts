import { createWrapper } from 'next-redux-wrapper'

import { store } from '@/src/store/store'
import { AppStore } from '@/src/store/types'

export const makeStore = () => store

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false })
