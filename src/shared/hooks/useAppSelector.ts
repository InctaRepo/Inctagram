import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { AppRootState } from '@/store/'

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector
