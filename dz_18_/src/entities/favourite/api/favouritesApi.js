import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import DbOperations from '../../../shared/api/DbOperations'

const favouritesDb = new DbOperations('favourites')

export const favouritesApi = createApi({
    reducerPath: 'favouritesApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Favourites'],
    endpoints: (builder) => ({
        getFavourites: builder.query({
            async queryFn(userId) {
                try {
                    const favourites = await favouritesDb.getFavouritesByUserId(userId)
                    return { data: favourites }
                } catch (error) {
                    return { error: { message: error.message } }
                }
            },
            providesTags: (result, error, userId) => [{ type: 'Favourites', id: userId }],
        }),

        addToFavourites: builder.mutation({
            async queryFn({ userId, productId, productData }) {
                try {
                    await favouritesDb.updateFavouriteProduct(userId, productId, {
                        ...productData,
                        addedAt: Date.now()
                    })
                    return { data: { productId, productData } }
                } catch (error) {
                    return { error: { message: error.message } }
                }
            },
            invalidatesTags: (result, error, { userId }) => [{ type: 'Favourites', id: userId }],
        }),

        removeFromFavourites: builder.mutation({
            async queryFn({ userId, productId }) {
                try {
                    await favouritesDb.removeFavouriteProduct(userId, productId)
                    return { data: { productId } }
                } catch (error) {
                    return { error: { message: error.message } }
                }
            },
            invalidatesTags: (result, error, { userId }) => [{ type: 'Favourites', id: userId }],
        }),
    }),
})

export const {
    useGetFavouritesQuery,
    useAddToFavouritesMutation,
    useRemoveFromFavouritesMutation,
} = favouritesApi