import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import { IBrand } from '../types/types'

export const brandsAPI = createApi({
    reducerPath: 'brandsAPI',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_API_URL}),
    tagTypes: ['Brand'],
    endpoints: (build) => ({
        fetchAllBrands: build.query<IBrand[], string>({
            query: () => ({
                url: `api/brand`
            }),
            providesTags: result => ['Brand']
        }),
        createBrand: build.mutation({
            query: (brand) => ({
                url: `api/brand`,
                method: 'POST',
                body: brand
            }),
            invalidatesTags: ['Brand']
        }),
        deleteBrand: build.mutation({
            query: (id) => ({
                url: `api/brand/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Brand']
        })
    })
})