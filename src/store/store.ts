import {configureStore, ThunkDispatch} from '@reduxjs/toolkit'
import {AnyAction, combineReducers} from 'redux'
import {authApi} from '@/src/api/authApi/authApi';


const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(authApi.middleware)
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>