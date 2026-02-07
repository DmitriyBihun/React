import { baseApi } from '@/shared/api/baseApi'
import { apiRoutes } from '@/shared/config/routes/apiRoutes'

export const postApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query({
      query: ({ page, limit }) => ({
        url: apiRoutes.posts,
        params: { page, limit },
      }),
      providesTags: ['Post'],
    }),
    getPostById: build.query({
      query: (id) => `${apiRoutes.posts}/${id}`,
      providesTags: ['Post'],
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostByIdQuery
} = postApi
