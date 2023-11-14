import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { IOrder } from '../types/types'

export const orderAPI = createApi({
    reducerPath: 'orderAPI',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_API_URL}),
    tagTypes: ['Order'],
    endpoints: (build) => ({
        fetchAllOrders: build.query<IOrder[], any>({
            query: (userId) => ({
                url: `api/order`,
                params: {
                    userId: userId
                }
            }),
            providesTags: result => ['Order']
        }),
        // fetchAverageRating: build.query<string, any>({
        //     query: (deviceId) => ({
        //         url: `api/review/rating`,
        //         params: {
        //             deviceId: deviceId
        //         }
        //     }),
        //     providesTags: result => ['Order']
        // }),
        createOrder: build.mutation<IOrder, IOrder>({
            query: (order) => ({
                url: `api/order`,
                method: 'POST',
                body: order
            }),
            invalidatesTags: ['Order']
        }),
        // deleteReview: build.mutation({
        //     query: (id) => ({
        //         url: `api/review/${id}`,
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: ['Order']
        // })
    })
})