import { useDispatch } from 'react-redux'

import { AppDispatch } from '@/src/services/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
