import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import { IUser } from '../types/types'

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_API_URL}),
    tagTypes: ['User'],
    endpoints: (build) => ({
        checkUser: build.query<IUser, string>({
            query: (user) => ({
                url: `api/user/auth`,
            }),
            providesTags: result => ['User']
        }),
        registrateUser: build.mutation<IUser, IUser>({
            query: (user) => ({
                url: `api/user/registration`,
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        loginUser: build.mutation<IUser, IUser>({
            query: (user) => ({
                url:`api/user/login`,
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        })
    })
})

