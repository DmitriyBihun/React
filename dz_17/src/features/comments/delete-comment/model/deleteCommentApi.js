import { baseApi } from '@/shared/api/baseApi'
import { apiRoutes } from '@/shared/config/routes/apiRoutes'

export const deleteCommentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        deleteComment: build.mutation({
            query: ({ id }) => ({
                url: `${apiRoutes.comments}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Comment', id: arg.postId },
            ],
        }),
    }),
})

export const { useDeleteCommentMutation } = deleteCommentApi
