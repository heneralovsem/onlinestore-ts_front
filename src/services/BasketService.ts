import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import { IBasketDevice } from '../types/types'

export const basketAPI = createApi({
    reducerPath: 'basketAPI',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_API_URL}),
    tagTypes: ['Basket'],
    endpoints: (build) => ({
        fetchAllBasketDevices: build.query({
            query: (basketId) => ({
                url: `api/basket/devices`,
                params: {
                    basketId: basketId
                }
            }),
            providesTags: result => ['Basket']
        }),
        fetchTotalPrice: build.query<number, any>({
            query: (basketId) => ({
                url: `api/basket/devices/price`,
                params: {
                    basketId: basketId
                }
            }),
            providesTags: result => ['Basket']
        }),
        fetchBasket: build.query({
            query: () => ({
                url: `api/basket`
            }),
            providesTags: result => ['Basket']
        }),
        createBasketDevice: build.mutation({
            query: (device) => ({
                url: `api/basket/devices`,
                method: 'POST',
                body: device
            }),
            invalidatesTags: ['Basket']
        }),
        deleteOneBasketDevice: build.mutation({
            query: (id) => ({
                url: `api/basket/devices/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Basket']
        }),
        
        deleteAllBasketDevices: build.mutation({
            query: (basketId) => ({
                url: `api/basket/devices/selected/${basketId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Basket']
        })
    })
})