import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import DbOperations from '../../../shared/api/DbOperations'

const db = new DbOperations('products')

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            async queryFn() {
                try {
                    const products = await db.getAll()
                    return { data: products }
                } catch (error) {
                    return { error: { message: error.message } }
                }
            },
            providesTags: ['Product'],
        }),
        getProductById: builder.query({
            async queryFn(id) {
                try {
                    const product = await db.getById(id)
                    return { data: product }
                } catch (error) {
                    return { error: { message: error.message } }
                }
            },
            providesTags: ['Product'],
        }),
        addProduct: builder.mutation({
            async queryFn(product) {
                try {
                    await db.add({
                        ...product,
                        createdAt: Date.now()
                    })
                    return { data: true }
                } catch (error) {
                    return { error: { message: error.message } }
                }
            },
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation({
            async queryFn({ id, data }) {
                try {
                    await db.update(id, data)
                    return { data: true }
                } catch (error) {
                    return { error: { message: error.message } }
                }
            },
            invalidatesTags: ['Product'],
        }),
        deleteProduct: builder.mutation({
            async queryFn(id) {
                try {
                    await db.delete(id)
                    return { data: true }
                } catch (error) {
                    return { error: { message: error.message } }
                }
            },
            invalidatesTags: ['Product'],
        }),
    }),
})

export const {
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi
