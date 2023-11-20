import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { IReview } from '../types/types'

export const reviewAPI = createApi({
    reducerPath: 'reviewAPI',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_API_URL}),
    tagTypes: ['Review'],
    endpoints: (build) => ({
        fetchAllReviews: build.query<IReview[], any>({
            query: (deviceId) => ({
                url: `api/review`,
                params: {
                    deviceId: deviceId
                }
            }),
            providesTags: result => ['Review']
        }),
        fetchAverageRating: build.query<number, any>({
            query: (deviceId) => ({
                url: `api/review/rating`,
                params: {
                    deviceId: deviceId
                }
            }),
            providesTags: result => ['Review']
        }),
        createReview: build.mutation<IReview, IReview>({
            query: (review) => ({
                url: `api/review`,
                method: 'POST',
                body: review
            }),
            invalidatesTags: ['Review']
        }),
        deleteReview: build.mutation({
            query: (id) => ({
                url: `api/review/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Review']
        })
    })
})