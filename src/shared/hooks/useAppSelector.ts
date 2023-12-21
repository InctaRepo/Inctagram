import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { AppRootState } from '@/src/store/'

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector
