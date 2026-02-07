import { baseApi } from '@/shared/api/baseApi'
import { apiRoutes } from '@/shared/config/routes/apiRoutes'

export const createCommentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createComment: build.mutation({
            query: (data) => ({
                url: apiRoutes.comments,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result) => [
                { type: 'Comment', id: result.postId },
            ],
        }),
    }),
})

export const { useCreateCommentMutation } = createCommentApi
