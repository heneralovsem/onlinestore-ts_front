import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import { IType } from '../types/types'

export const typesAPI = createApi({
    reducerPath: 'typesAPI',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_API_URL}),
    tagTypes: ['Type'],
    endpoints: (build) => ({
        fetchAllTypes: build.query<IType[], string>({
            query: () => ({
                url: `api/type`
            }),
            providesTags: result => ['Type']
        }),
        createType: build.mutation({
            query: (type) => ({
                url: `api/type`,
                method: 'POST',
                body: type
            }),
            invalidatesTags: ['Type']
        })
    })
})