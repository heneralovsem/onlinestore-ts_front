import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IDevice } from '../types/types'

export const deviceAPI = createApi({
    reducerPath: 'deviceAPI',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_API_URL}),
    tagTypes: ['Device'],
    endpoints: (build) => ({
        fetchAllDevices: build.query({
            query: (args) => ({
                url: `api/device`,
                params: {
                    typeId: args.typeId,
                    brandId: args.brandId,
                    limit: args.limit,
                    page: args.page,
                    sorting: args.sorting
                }
            }),
            providesTags: result => ['Device']
        }),
        fetchOneDevice: build.query<IDevice, any>({
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
        }),
        updateDeviceRating: build.mutation({
            query: (device) => ({
                url: `api/device/${device.id}`,
                method: 'PUT',
                body: device
            }),
            invalidatesTags: ['Device']
        }),
        deleteOneDevice: build.mutation({
            query: (id) => ({
                url: `api/device/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Device']
        }),
    })
})