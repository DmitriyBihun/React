import { baseApi } from '@/shared/api/baseApi'
import { apiRoutes } from '@/shared/config/routes/apiRoutes'

export const commentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getComments: build.query({
      query: () => ({
        url: apiRoutes.comments,
      }),
      providesTags: ['Comment'],
    }),
    getCommentsByPost: build.query({
      query: ({ postId }) => ({
        url: apiRoutes.getCommentsByPostId,
        params: { postId },
      }),
      providesTags: (result, error, arg) => [
        { type: 'Comment', id: arg.postId },
      ],
    })
  }),
})

export const {
  useGetCommentsByPostQuery,
} = commentApi
