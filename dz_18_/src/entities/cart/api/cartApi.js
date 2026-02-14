import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import DbOperations from '../../../shared/api/DbOperations'

const cartDb = new DbOperations('carts') 

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        getCart: builder.query({
            async queryFn(userId) {
                try {
                    const cart = await cartDb.getCartByUserId(userId)
                    return { data: cart }
                } catch (error) {
                    return { error: { message: error.message } }
                }
            },
            providesTags: (result, error, userId) => [{ type: 'Cart', id: userId }],
        }),

        addToCart: builder.mutation({
            async queryFn({ userId, productId, productData }) {
                try {
                    await cartDb.updateCartProduct(userId, productId, {
                        ...productData,
                        quantity: 1,
                        addedAt: Date.now()
                    })
                    return { data: { productId, productData } }
                } catch (error) {
                    return { error: { message: error.message } }
                }
            },
            invalidatesTags: (result, error, { userId }) => [{ type: 'Cart', id: userId }],
        }),

        updateQuantity: builder.mutation({
            async queryFn({ userId, productId, quantity }) {
                try {
                    const cart = await cartDb.getCartByUserId(userId)
                    if (cart[productId]) {
                        await cartDb.updateCartProduct(userId, productId, {
                            ...cart[productId],
                            quantity
                        })
                    }
                    return { data: { productId, quantity } }
                } catch (error) {
                    return { error: { message: error.message } }
                }
            },
            invalidatesTags: (result, error, { userId }) => [{ type: 'Cart', id: userId }],
        }),

        removeFromCart: builder.mutation({
            async queryFn({ userId, productId }) {
                try {
                    await cartDb.removeCartProduct(userId, productId)
                    return { data: { productId } }
                } catch (error) {
                    return { error: { message: error.message } }
                }
            },
            invalidatesTags: (result, error, { userId }) => [{ type: 'Cart', id: userId }],
        }),

        clearCart: builder.mutation({
            async queryFn(userId) {
                try {
                    await cartDb.setCartByUserId(userId, {})
                    return { data: true }
                } catch (error) {
                    return { error: { message: error.message } }
                }
            },
            invalidatesTags: (result, error, userId) => [{ type: 'Cart', id: userId }],
        }),
    }),
})

export const {
    useGetCartQuery,
    useAddToCartMutation,
    useUpdateQuantityMutation,
    useRemoveFromCartMutation,
    useClearCartMutation,
} = cartApi