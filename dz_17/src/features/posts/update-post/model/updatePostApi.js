import { baseApi } from '@/shared/api/baseApi'
import { apiRoutes } from '@/shared/config/routes/apiRoutes'

export const updatePostApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        updatePost: build.mutation({
            query: ({ id, data }) => ({
                url: `${apiRoutes.posts}/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Post'],
        }),
    }),
})

export const { useUpdatePostMutation } = updatePostApi
