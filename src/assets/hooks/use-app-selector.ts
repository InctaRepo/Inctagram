import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { RootState } from '@/src/services/store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
