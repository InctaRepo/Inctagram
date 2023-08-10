import {createApi} from '@reduxjs/toolkit/query/react'
import {RegisterArgsType} from '@/src/api/authApi/authApi.types';
import {fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://inctagram-social.vercel.app/',
	}),
	endpoints: builder => ({
		registration: builder.mutation<any, RegisterArgsType>({
			query: (formData) => ({
				url: 'auth/signup',
				method: 'POST',
				body: formData
			})
		}),
	})
})

export const {
	useRegistrationMutation
} = authApi
