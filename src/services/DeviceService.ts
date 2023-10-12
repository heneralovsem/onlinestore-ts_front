import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import { IDevice } from '../types/types'

export const deviceAPI = createApi({
    reducerPath: 'deviceAPI',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_API_URL}),
    tagTypes: ['Device'],
    endpoints: (build) => ({
        fetchAllDevices: build.query({
            query: () => ({
                url: `api/device`
            }),
            providesTags: result => ['Device']
        }),
        fetchOneDevice: build.query({
            query: (id) => ({
                url: `api/device/${id}`
            }),
            providesTags: result => [`Device`]
        }),
        createDevice: build.mutation({
            query: (device) => ({
                url: `api/device`,
                method: 'POST',
                body: device
            }),
            invalidatesTags: ['Device']
        })
    })
})